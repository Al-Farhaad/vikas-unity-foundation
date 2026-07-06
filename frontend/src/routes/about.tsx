import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Heart, Target, Eye } from "lucide-react";
import shakti from "@/assets/shakti-women.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vikas Unity Foundation" },
      {
        name: "description",
        content:
          "Learn about Vikas Unity Foundation's vision, mission and the people working to uplift the underprivileged through marriages, education, ration kits and essential help.",
      },
      { property: "og:title", content: "About Vikas Unity Foundation" },
      {
        property: "og:description",
        content: "Our vision, mission and the work behind Vikas Unity Foundation.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="People-first. Purpose-driven."
        description="Vikas Unity Foundation is a grassroots organisation working to uplift the underprivileged by arranging marriages, supporting education, distributing ration kits and extending every possible help to those in need."
      />

      <section className="section-y">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-[3rem]" />
            <img
              src={shakti}
              alt="Vikas Unity Foundation members with the community"
              className="relative rounded-3xl shadow-elevated w-full aspect-square object-cover"
            />
          </div>
          <div className="space-y-8">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                text: "A society where every underprivileged individual can marry with dignity, study with confidence, eat with security and live with hope.",
              },
              {
                icon: Target,
                title: "Our Mission",
                text: "To uplift the underprivileged by arranging marriages for those who cannot afford them; to support education for children and youth; to distribute ration kits to needy families; and to extend every other possible help — medical, clothing or shelter — to the vulnerable.",
              },
              {
                icon: Heart,
                title: "Our Values",
                text: "Compassion, dignity, transparency, and long-term commitment to the communities we serve.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-5">
                <div className="size-12 shrink-0 rounded-xl bg-gradient-brand text-white grid place-items-center shadow-soft">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
