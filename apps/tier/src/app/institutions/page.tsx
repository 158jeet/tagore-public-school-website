import { InstitutionDirectory } from "@/components/institution-directory";

export const metadata = {
  title: "Our Institutions",
  description: "Explore schools, competitive learning, higher education and student life within the Tagore Group.",
  alternates: { canonical: "/institutions" },
};

export default function Institutions() {
  return (
    <main>
      <section className="hero">
        <div className="shell" style={{ padding: "90px 0" }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>The Tagore ecosystem</div>
          <h1 className="serif" style={{ fontSize: "clamp(42px,6vw,68px)", maxWidth: 800 }}>Different institutions. A clearer path for every learner.</h1>
          <p className="lead">Choose an institution to explore its role and find the appropriate next step. Detailed claims, fees and admission criteria will be published only after institutional verification.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <InstitutionDirectory />
        </div>
      </section>
    </main>
  );
}
