import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

export const metadata = {
  title: "Campus, Library and Student Life",
  description: "Explore the campus, learning spaces, college facilities, hostel life and co-curricular activities described on the existing Tagore Group website.",
  alternates: { canonical: "/campus" },
};

const gallery = [
  { src: "https://www.tieredu.org/images/bg1.jpg", alt: "Aerial view of the Tagore Group campus at Gudha Gorji", caption: "The Gudha Gorji campus" },
  { src: "https://www.tieredu.org/pg/images/slide11.jpg", alt: "Library and reading space at Tagore PG College", caption: "Library and independent study" },
  { src: "https://www.tieredu.org/pg/images/Slide2.jpg", alt: "Computer learning space at Tagore PG College", caption: "Computer learning" },
  { src: "https://www.tieredu.org/pg/images/slide4.jpg", alt: "NCC activity at Tagore PG College", caption: "NCC and service activities" },
  { src: "https://www.tieredu.org/images/bg/hostel5.jpg", alt: "Hostel building and grounds", caption: "Residential facilities" },
  { src: "https://www.tieredu.org/images/bg/hostel6.jpg", alt: "Students studying in a hostel study room", caption: "Supervised study" },
  { src: "https://www.tieredu.org/images/services/1.jpg", alt: "Students taking part in cricket practice", caption: "Sports and co-curricular life" },
];

const activities = ["Cricket", "Basketball", "Volleyball", "Badminton", "Table tennis", "Kabaddi", "Kho-kho", "Taekwondo", "Athletics", "Singing", "Dance", "Drama", "Debate"];

export default function CampusPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Campus life", path: "/campus" }]} />
      <section className="hero">
        <div className="shell about-hero-grid">
          <div>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Campus · learning · student life</div>
            <h1 className="serif" style={{ fontSize: "clamp(42px,6vw,68px)", maxWidth: 850, lineHeight: 1.1 }}>Spaces to learn, practise, participate and belong.</h1>
            <p className="lead" style={{ maxWidth: 720 }}>The existing Tagore Group and PG College websites describe a campus experience shaped by academic spaces, practical learning, a library, residential support, sports and cultural activities. This page brings that legacy material together for the management team to review.</p>
          </div>
          <Image src="https://www.tieredu.org/images/bg/main-10.jpg" alt="Panoramic view of the Tagore Group campus" width={1100} height={700} unoptimized style={{ width: "100%", height: "auto", borderRadius: 24, border: "1px solid #c79b4570" }} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="intro">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Learning environment</div>
            <h2>Academic spaces and practical learning.</h2>
            <p>The legacy campus pages refer to classrooms, science laboratories, a library, computer learning, workshops, CCTV and Wi-Fi. The PG College pages also describe learning resources and practical opportunities alongside regular academic study. These are historical source descriptions; the current availability, condition and institution-specific allocation of each facility must be confirmed.</p>
          </div>
          <div className="cards">
            <article className="card"><span className="number">01</span><h3>Library and reading</h3><p>The legacy library page describes books, periodicals, a reading room and digital-library resources for independent study.</p></article>
            <article className="card"><span className="number">02</span><h3>Computer and laboratory learning</h3><p>Existing campus material refers to computer education, practical laboratories and workshops. Current equipment, access and schedules need confirmation.</p></article>
            <article className="card"><span className="number">03</span><h3>Campus infrastructure</h3><p>The old campus profile mentions connectivity and CCTV alongside classrooms and shared facilities. Current coverage and safety procedures must be verified with the institution.</p></article>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#edf0f1" }}>
        <div className="shell">
          <div className="intro">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>College and higher education</div>
            <h2>Academic study with wider opportunities.</h2>
            <p>The legacy Tagore PG College website lists B.Sc., B.A. and B.Com. courses and describes NCC, sports, cultural programmes, scholarships and a placement cell. The current course catalogue, university affiliation, eligibility, intake, scholarship terms and placement outcomes must be checked against current college records before publication.</p>
            <a href="https://www.tieredu.org/pg/course.php" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 14, fontSize: 12, fontWeight: 700, color: "var(--navy)" }}>Review the original PG College course page ↗</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="intro">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Sports and cultural activities</div>
            <h2>Participation, teamwork and expression.</h2>
            <p>The legacy activities page names the following sports and cultural activities. This is a historical list, not a promise that every activity is currently offered or coached at every institution.</p>
          </div>
          <div className="cards">
            {activities.map((activity, index) => <article className="card" key={activity}><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{activity}</h3><p>Listed on the existing Tagore Group activities page; confirm current availability, coaches, facilities and schedules.</p></article>)}
          </div>
          <a href="https://www.tieredu.org/act.php" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 22, fontSize: 12, fontWeight: 700, color: "var(--navy)" }}>Review the original activities page ↗</a>
        </div>
      </section>

      <section className="section" style={{ background: "#edf0f1" }}>
        <div className="shell">
          <div className="intro">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Residential life</div>
            <h2>Hostel routines, supervision and student support.</h2>
            <p>The legacy hostel page describes separate boys’ and girls’ accommodation, triple- and quadruple-occupancy rooms, attached washrooms and balconies in many rooms, centrally air-cooled accommodation, house-in-charge supervision, extra academic classes, and medical and counselling support. Every facility, staffing arrangement, safeguarding process and emergency protocol must be reconfirmed with the current hostel team.</p>
            <Link href="/institutions/tagore-hostel" style={{ display: "inline-block", marginTop: 14, fontSize: 12, fontWeight: 700, color: "var(--navy)" }}>Review the Tagore Hostel profile ↗</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="intro">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Legacy photo gallery</div>
            <h2>A visual starting point for the team’s review.</h2>
            <p>These images are linked from the existing Tagore Group and PG College websites. Photos showing identifiable students or staff require documented permission and a safeguarding review before production use. Current campus identity and image rights must also be confirmed.</p>
          </div>
          <div className="legacy-gallery">
            {gallery.map((item) => <figure key={item.src}><Image src={item.src} alt={item.alt} width={1000} height={650} unoptimized/><figcaption>{item.caption}</figcaption></figure>)}
          </div>
          <p style={{ marginTop: 24, fontSize: 11, lineHeight: 1.8, color: "var(--muted)" }}>Sources: <a href="https://www.tieredu.org/campus.php" target="_blank" rel="noreferrer">Campus</a>, <a href="https://www.tieredu.org/library.php" target="_blank" rel="noreferrer">Library</a>, <a href="https://www.tieredu.org/hostal.php" target="_blank" rel="noreferrer">Hostel</a>, <a href="https://www.tieredu.org/act.php" target="_blank" rel="noreferrer">Activities</a> and <a href="https://www.tieredu.org/pg/" target="_blank" rel="noreferrer">PG College</a>. Historical campus-area and group-size claims have intentionally been excluded because the legacy pages conflict.</p>
        </div>
      </section>
    </main>
  );
}
