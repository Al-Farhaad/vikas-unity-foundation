import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CheckCircle2 } from "lucide-react";
import g1 from "@/assets/gallery/g1.jpg";
import g4 from "@/assets/gallery/g4.jpg";
import shakti from "@/assets/shakti-women.jpg";
import udaan from "@/assets/udaan-celebration.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Vikas Unity Foundation" },
      {
        name: "description",
        content:
          "Explore Vikas Unity Foundation's flagship initiatives: VIVAH (marriage assistance), VIDYA (education), ANNA (ration kits) and SAHAY (other help for the needy).",
      },
      { property: "og:title", content: "Our Projects — Vikas Unity Foundation" },
      {
        property: "og:description",
        content:
          "Marriage assistance, education support, ration distribution and holistic help for the needy.",
      },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    name: "Project VIVAH",
    tag: "Marriage Assistance",
    color: "var(--brand-magenta)",
    img: udaan,
    objective:
      "To arrange and sponsor marriages for underprivileged individuals who cannot afford the cost of beginning a new life with dignity.",
    activities: [
      "Identifying couples and families unable to bear marriage expenses.",
      "Sponsoring venue, rituals, attire and essential ceremony items.",
      "Providing basic household items to help couples start their new home.",
      "Partnering with priests, venues and vendors for concessional services.",
      "Counselling families on Legal registration and documentation.",
      "Celebrating each wedding as a community event of joy and blessing.",
    ],
  },
  {
    name: "Project VIDYA",
    tag: "Education",
    color: "var(--brand-blue)",
    img: g1,
    objective:
      "To provide comprehensive educational support to children and youth in underserved areas.",
    activities: [
      "Sponsoring school fees, books, uniforms and stationery.",
      "Setting up independent educational units in targeted areas.",
      "Providing study materials and digital learning resources.",
      "Organising weekly educational workshops and mentoring.",
      "Awareness campaigns for parents about education.",
      "Regular monitoring and evaluation through local mentors.",
    ],
  },
  {
    name: "Project ANNA",
    tag: "Ration Distribution",
    color: "var(--brand-orange)",
    img: g4,
    objective:
      "To ensure no one sleeps hungry by distributing monthly ration kits to needy families and individuals.",
    activities: [
      "Identifying families struggling to afford daily food.",
      "Preparing ration kits of grains, pulses, oil and essentials.",
      "Monthly door-to-door distribution in bastis and villages.",
      "Special drives during festivals and disaster relief.",
      "Partnering with donors and suppliers for bulk procurement.",
      "Maintaining beneficiary records for transparent follow-up.",
    ],
  },
  {
    name: "Project SAHAY",
    tag: "Other Assistance",
    color: "var(--brand-teal)",
    img: shakti,
    objective:
      "To extend every other possible help to the needy — medical aid, clothing, shelter and emergency support.",
    activities: [
      "Mobile medical camps and medicine support for the sick.",
      "Clothing and blanket drives for the homeless and poor.",
      "Shelter and rehabilitation support for the destitute.",
      "Emergency relief during accidents, illness and calamities.",
      "Guidance to access government schemes and entitlements.",
      "Volunteer-led helpdesk for any genuine request for help.",
    ],
  },
];

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Four pillars. One mission."
        description="Each initiative is a deliberate act of care designed with the community, for the community — from weddings to food, education to emergency help."
      />
      <section className="section-y">
        <div className="container-page space-y-20">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative">
                <div
                  className="absolute -inset-5 rounded-[2rem] opacity-25 blur-3xl"
                  style={{ background: p.color }}
                />
                <img
                  src={p.img}
                  alt={p.name}
                  className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-elevated"
                />
              </div>
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-white"
                  style={{ background: p.color }}
                >
                  {p.tag}
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold">{p.name}</h2>
                <p className="mt-3 text-muted-foreground text-lg">{p.objective}</p>
                <ul className="mt-6 space-y-3">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-3 text-sm">
                      <CheckCircle2 className="size-5 shrink-0 mt-0.5" style={{ color: p.color }} />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
