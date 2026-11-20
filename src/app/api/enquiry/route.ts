function json(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...init?.headers },
  });
}

const MAX_BODY_BYTES = 8_192;

function rejectCrossOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin !== new URL(request.url).origin;
  } catch {
    return true;
  }
}

async function readBoundedBody(request: Request, maxBytes: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(combined);
}

function isHumanTimingValid(value: unknown) {
  if (typeof value !== "string" || !/^\d{13}$/.test(value)) return false;
  const elapsed = Date.now() - Number(value);
  return elapsed >= 1_500 && elapsed <= 24 * 60 * 60 * 1_000;
}

export async function POST(request: Request) {
  if (rejectCrossOrigin(request)) {
    return json({ message: "This request could not be verified." }, { status: 403 });
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ message: "The submitted form is too large." }, { status: 413 });
  }

  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) {
    return json({ message: "The online enquiry service is not connected yet. Please contact the school by phone or WhatsApp." }, { status: 503 });
  }

  let data: Record<string, unknown>;
  try {
    const raw = await readBoundedBody(request, MAX_BODY_BYTES);
    if (raw === null) return json({ message: "The submitted form is too large." }, { status: 413 });
    data = JSON.parse(raw) as Record<string, unknown>;
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid payload");
  } catch {
    return json({ message: "Invalid form submission." }, { status: 400 });
  }

  if (typeof data.website === "string" && data.website.trim()) {
    return json({ success: true });
  }
  if (!isHumanTimingValid(data.form_started_at)) {
    return json({ message: "Please wait a moment and try submitting again." }, { status: 400 });
  }

  const parent = typeof data.parent_name === "string" ? data.parent_name.trim() : "";
  const mobile = typeof data.mobile === "string" ? data.mobile.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const schoolClass = typeof data.class === "string" ? data.class.trim() : "";
  const rawTopic = data.enquiry_topic;
  const topic = typeof rawTopic === "string" ? rawTopic.trim() : "";
  const allowedTopics = new Set(["academics", "student-life", "transport", "residential", "fees", "campus", "other"]);
  const type = data.enquiry_type === "campus_visit" ? "campus_visit" : "admission";
  const date = typeof data.preferred_date === "string" ? data.preferred_date : "";
  const time = typeof data.preferred_time === "string" ? data.preferred_time : "";
  const allowedClasses = new Set(["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => "Class " + (i + 1))]);

  if ((data.enquiry_type !== undefined && !["admission", "campus_visit"].includes(String(data.enquiry_type))) || parent.length < 2 || parent.length > 100 || !/^[0-9+() -]{8,18}$/.test(mobile) || !allowedClasses.has(schoolClass) || data.contact_consent !== "yes" || (rawTopic !== undefined && rawTopic !== "" && (typeof rawTopic !== "string" || !allowedTopics.has(topic)))) {
    return json({ message: "Please check the required fields and try again." }, { status: 400 });
  }
  if (email && (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (type === "campus_visit") {
    const parsedDate = new Date(date + "T00:00:00");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date || parsedDate.getTime() < new Date(new Date().toDateString()).getTime() || !["Morning", "Afternoon"].includes(time)) {
      return json({ message: "Please select a valid preferred visit date and time." }, { status: 400 });
    }
  }

  const payload = new FormData();
  payload.set("access_key", key);
  payload.set("subject", type === "campus_visit" ? "New Tagore Public School campus visit request" : "New Tagore Public School admission enquiry");
  payload.set("from_name", "Tagore Public School Website");
  payload.set("parent_name", parent);
  payload.set("mobile", mobile);
  payload.set("email", email);
  payload.set("class", schoolClass);
  if (topic) payload.set("enquiry_topic", topic);
  if (type === "campus_visit") {
    payload.set("preferred_date", date);
    payload.set("preferred_time", time);
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: payload, cache: "no-store", signal: AbortSignal.timeout(8_000) });
    const result = await response.json();
    if (!response.ok || !result.success) return json({ message: "We could not deliver your request. Please try again or contact the school directly." }, { status: 502 });
    return json({ success: true });
  } catch {
    return json({ message: "The enquiry service is temporarily unavailable. Please contact the school directly." }, { status: 502 });
  }
}
