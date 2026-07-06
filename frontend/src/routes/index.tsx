import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  HandHeart,
  Sparkles,
  Users,
  HeartHandshake,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import hero from "@/assets/hero-children.jpg";
import shakti from "@/assets/shakti-women.jpg";
import udaan from "@/assets/udaan-celebration.jpg";
import g1 from "@/assets/gallery/g1.jpg";
import g4 from "@/assets/gallery/g4.jpg";
import g6 from "@/assets/gallery/g6.jpg";
import g8 from "@/assets/gallery/g8.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vikas Unity Foundation — Marriages, Education, Ration & Care" },
      {
        name: "description",
        content:
          "We uplift underprivileged lives by arranging marriages, supporting education, distributing ration kits and extending every possible help to those in need. Join us in transforming lives.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "4", label: "Core Initiatives" },
  { value: "20+", label: "Communities Reached" },
  { value: "500+", label: "Lives Uplifted" },
];

const verticals = [
  {
    icon: HeartHandshake,
    title: "Marriage Support",
    text: "Arranging weddings for underprivileged individuals who cannot afford to begin a new chapter with dignity.",
    color: "var(--brand-magenta)",
  },
  {
    icon: BookOpen,
    title: "Educational Help",
    text: "Books, fees, mentoring and study materials so learning never stops for the needy.",
    color: "var(--brand-blue)",
  },
  {
    icon: Package,
    title: "Ration Kits",
    text: "Monthly ration kits to families who struggle to put food on the table.",
    color: "var(--brand-orange)",
  },
  {
    icon: Sparkles,
    title: "Other Assistance",
    text: "Medical aid, clothing, shelter and every other help the vulnerable need.",
    color: "var(--brand-teal)",
  },
];

const projects = [
  {
    name: "Project VIVAH",
    tag: "Marriage Assistance",
    desc: "Arranging and sponsoring marriages for underprivileged individuals — covering rituals, attire and essentials so they can begin their new life with dignity and joy.",
    img: udaan,
  },
  {
    name: "Project VIDYA",
    tag: "Education",
    desc: "Comprehensive educational support to children and youth in underserved areas through books, fees, study materials and weekly mentoring.",
    img: g1,
  },
  {
    name: "Project ANNA",
    tag: "Ration Distribution",
    desc: "Distributing monthly ration kits of grains, pulses and essentials to needy families so no one sleeps hungry in the communities we serve.",
    img: g4,
  },
  {
    name: "Project SAHAY",
    tag: "Other Assistance",
    desc: "Medical aid, clothing drives, shelter support and any other help the vulnerable need — reaching the unreached with care and compassion.",
    img: shakti,
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 bg-gradient-hero-overlay"
            style={{
              background: "rgba(11, 37, 69, 0.88)",
            }}
          />
        </div>
        <div className="relative container-page py-24 md:py-36 text-white">
          <div className="max-w-3xl anim-rise">
            <h1 className="text-4xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Uplifting lives through{" "}
              <span className="text-[var(--brand-orange)]">
                unity & compassion
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              Vikas Unity Foundation works at the grassroots — arranging marriages, supporting
              education, distributing ration kits and extending every possible help to those in
              need.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-[var(--brand-blue)] hover:bg-white/90 font-semibold"
              >
                <Link to="/donate">
                  Donate Now <HandHeart className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white/5 backdrop-blur text-white border-white/30 hover:bg-white/15 hover:text-white"
              >
                <Link to="/projects">
                  Explore Projects <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* stats strip */}
        <div className="relative container-page pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 bg-white/95 backdrop-blur rounded-2xl p-4 md:p-6 shadow-elevated">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-2">
                <div className="text-2xl md:text-4xl font-bold text-gradient-brand">{s.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION/MISSION */}
      <section className="section-y">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Our Vision & Mission"
              title="Standing with those who need it the most."
              description="We believe every person deserves dignity — the joy of a wedding, the light of education, and food on the table. Our work is grounded in long-term, holistic support for the underprivileged."
            />
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: HeartHandshake,
                  t: "Marriages with dignity",
                  d: "Sponsoring weddings for those who cannot afford to begin a new life.",
                },
                {
                  icon: BookOpen,
                  t: "Education for every child",
                  d: "Books, fees and mentoring so learning never stops for the needy.",
                },
                {
                  icon: Package,
                  t: "Ration & essential supplies",
                  d: "Monthly ration kits and basic supplies where it matters most.",
                },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-4">
                  <div className="shrink-0 size-11 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-soft">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-brand opacity-15 blur-3xl rounded-[3rem]" />
            <div className="relative grid grid-cols-2 gap-3">
              <img
                src={g6}
                alt="Children at workshop"
                className="rounded-2xl aspect-[4/5] object-cover shadow-elevated"
              />
              <img
                src={g8}
                alt="Community engagement"
                className="rounded-2xl aspect-[4/5] object-cover shadow-elevated mt-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WORKING VERTICALS */}
      <section className="section-y bg-gradient-soft">
        <div className="container-page">
          <SectionHeader
            eyebrow="What we focus on"
            title="Our core initiatives"
            description="A holistic approach to uplifting the underprivileged — built around four pillars of care."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {verticals.map((v) => (
              <div
                key={v.title}
                className="group relative bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div
                  className="size-12 rounded-xl grid place-items-center text-white shadow-soft"
                  style={{
                    background: v.color,
                  }}
                >
                  <v.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeader
              align="left"
              eyebrow="Our Projects"
              title="Where impact happens"
              description="Four flagship initiatives reaching families, children and underserved communities."
            />
            <Button asChild variant="ghost" className="self-start rounded-full">
              <Link to="/projects">
                All projects <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <article
                key={p.name}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[var(--brand-orange)]">
                    {p.tag}
                  </div>
                  <h3 className="mt-1 text-xl font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section-y">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 md:p-16 text-white text-center shadow-elevated">
            <div className="absolute -top-20 -right-10 size-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 size-80 rounded-full bg-white/10 blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Be the reason a wedding happens. A child learns. A family eats.
              </h2>
              <p className="mt-4 text-white/90 text-lg">
                Every contribution funds marriages, education, ration kits, and essential help for
                those who need it most.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-[var(--brand-blue)] hover:bg-white/90 font-semibold"
                >
                  <Link to="/donate">Donate Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/contact">Become a Volunteer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
