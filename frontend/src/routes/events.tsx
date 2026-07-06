import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, getImageUrl } from "@/lib/api";

import hero from "@/assets/hero-children.jpg";
import shakti from "@/assets/shakti-women.jpg";
import udaan from "@/assets/udaan-celebration.jpg";
import g1 from "@/assets/gallery/g1.jpg";
import g4 from "@/assets/gallery/g4.jpg";
import g6 from "@/assets/gallery/g6.jpg";
import g8 from "@/assets/gallery/g8.jpg";

const MOCK_EVENTS = [
  {
    id: "e1",
    title: "Mass Marriage Ceremony (Project VIVAH)",
    date: "2026-10-15",
    location: "Community Hall, Sector 4, Dwarka",
    description: "Sponsoring and celebrating marriages of 10 underprivileged couples. We will provide household essentials, bridal attire, and a traditional wedding feast to help them start their new lives with dignity.",
    image_url: udaan,
  },
  {
    id: "e2",
    title: "Back to School Kit Distribution (Project VIDYA)",
    date: "2026-11-20",
    location: "Vikas Primary Education Centre, Slum Basti, Area 3",
    description: "Distributing school bags, notebooks, uniforms, and geometry boxes to 150+ students to ensure they have the tools to continue learning.",
    image_url: g1,
  },
  {
    id: "e3",
    title: "Monthly Anna Ration Drive (Project ANNA)",
    date: "2026-09-10",
    location: "Foundation Warehouse, Main Market Road",
    description: "Monthly kit distribution containing wheat flour, rice, pulses, cooking oil, and salt to 100+ low-income families in the local community.",
    image_url: g4,
  },
  {
    id: "e4",
    title: "Winter Blanket & Medical Camp (Project SAHAY)",
    date: "2026-01-12",
    location: "Rain Basera Shelter Home, Outer Ring Road",
    description: "Distributed over 300 blankets and conducted a free health check-up camp with distribution of essential medicines for shelter residents.",
    image_url: shakti,
  },
  {
    id: "e5",
    title: "Women Empowerment & Skill Workshop (Project SAHAY)",
    date: "2026-03-08",
    location: "Community Center, West Enclave",
    description: "A vocational workshop on tailoring and paper bag making for women from marginalized communities to promote self-reliance.",
    image_url: g6,
  },
  {
    id: "e6",
    title: "Annual Day & Children's Celebration (Project VIDYA)",
    date: "2026-05-25",
    location: "Municipal School Ground",
    description: "A day filled with sports, cultural performances, and prizes for the students attending our non-formal education centers.",
    image_url: g8,
  }
];

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Vikas Unity Foundation" },
      {
        name: "description",
        content:
          "Upcoming and recent events by Vikas Unity Foundation — marriage ceremonies, education drives, ration kit distributions and community help camps.",
      },
      { property: "og:title", content: "Events — Vikas Unity Foundation" },
      {
        property: "og:description",
        content:
          "Join our marriage ceremonies, education drives, ration distributions and community camps.",
      },
    ],
  }),
  loader: async () => {
    let events: any[] = [];
    try {
      events = (await api.getEvents()) ?? [];
    } catch (err) {
      console.warn("Could not load events from API:", err);
    }
    
    // If the API returns no events, use MOCK_EVENTS
    const displayEvents = events.length > 0 ? events : MOCK_EVENTS;
    
    const now = new Date();
    const upcoming = displayEvents.filter((event) => new Date(event.date) >= now);
    const past = displayEvents.filter((event) => new Date(event.date) < now);
    return { upcoming, past };
  },
  component: EventsPage,
});

function EventsPage() {
  const { upcoming, past } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Where we're showing up"
        description="Be part of upcoming marriage ceremonies, education drives and ration distributions — or relive moments from past events."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[var(--brand-orange)]">
                Coming up
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Upcoming Events</h2>
            </div>
            <Link to="/donate">
              <Button>
                Donate to Support
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground col-span-full text-center py-10">
                No upcoming events scheduled right now. Please check back soon.
              </p>
            ) : null}
            {upcoming.map((event) => (
              <div
                key={event.id}
                className="group relative bg-card rounded-3xl border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-gradient-brand">
                  {event.image_url ? (
                    <>
                      <img
                        src={getImageUrl(event.image_url) as string}
                        alt={event.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="size-16 text-white/60" />
                      </div>
                    </>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-[var(--brand-orange)] shadow-sm">
                    Upcoming
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-[var(--brand-blue)] transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-4 text-[var(--brand-orange)]" />
                      {new Date(event.date).toLocaleDateString(undefined, { dateStyle: "long" })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-[var(--brand-orange)]" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
