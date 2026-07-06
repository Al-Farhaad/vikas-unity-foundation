import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { api, getImageUrl } from "@/lib/api";

import hero from "@/assets/hero-children.jpg";
import shakti from "@/assets/shakti-women.jpg";
import udaan from "@/assets/udaan-celebration.jpg";
import g1 from "@/assets/gallery/g1.jpg";
import g4 from "@/assets/gallery/g4.jpg";
import g6 from "@/assets/gallery/g6.jpg";
import g8 from "@/assets/gallery/g8.jpg";

interface GalleryImage {
  id: string;
  image_url: string;
  image_filename: string;
  order: number;
}

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  images: GalleryImage[];
  project_id?: string;
  project_name?: string;
  event_id?: string;
  event_title?: string;
  created_at: string;
}

const MOCK_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Non-formal education unit",
    description: "Daily evening classes for children in slum clusters under Project VIDYA.",
    image_url: g1,
    project_name: "VIDYA",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "g2",
    title: "Ration kits for families",
    description: "Monthly food kits distributed to families struggling with sustenance under Project ANNA.",
    image_url: g4,
    project_name: "ANNA",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "g3",
    title: "Skill development for women",
    description: "Empowering marginalized women through tailoring and stitching classes under Project SAHAY.",
    image_url: g6,
    project_name: "SAHAY",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "g4",
    title: "Primary school kit distribution",
    description: "Providing notebooks, bags, and uniforms to local government school students under Project VIDYA.",
    image_url: g8,
    project_name: "VIDYA",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "g5",
    title: "Women community gathering",
    description: "Interactive sessions to address local community issues and sanitization awareness under Project SAHAY.",
    image_url: shakti,
    project_name: "SAHAY",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "g6",
    title: "Sponsoring weddings for needy couples",
    description: "Mass marriage ceremony organized with full wedding rituals and gifts under Project VIVAH.",
    image_url: udaan,
    project_name: "VIVAH",
    images: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "g7",
    title: "Bright smiles at educational center",
    description: "Supporting the future generation with care, mentoring and hope under Project VIDYA.",
    image_url: hero,
    project_name: "VIDYA",
    images: [],
    created_at: new Date().toISOString(),
  }
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Vikas Unity Foundation" },
      {
        name: "description",
        content:
          "Moments from the field — families, children, and communities Vikas Unity Foundation works with across VIVAH, VIDYA, ANNA and SAHAY.",
      },
      { property: "og:title", content: "Gallery — Vikas Unity Foundation" },
      {
        property: "og:description",
        content:
          "Moments from our work in marriages, education, ration distribution and community care.",
      },
    ],
  }),
  loader: async () => {
    let items = [];
    try {
      items = (await api.getGallery()) ?? [];
    } catch (err) {
      console.warn("Could not load gallery from API:", err);
    }
    
    // If the API returns no items, use MOCK_GALLERY
    const displayItems = items.length > 0 ? items : MOCK_GALLERY;
    return { items: displayItems };
  },
  component: GalleryPage,
});

const cats = ["All", "VIVAH", "VIDYA", "ANNA", "SAHAY"] as const;

function GalleryPage() {
  const { items } = Route.useLoaderData();
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);

  // Flatten all images from all gallery items
  const allImages = items.flatMap((item: GalleryItem, itemIdx: number) => {
    const imgs =
      item.images && item.images.length > 0
        ? item.images.map((img: GalleryImage) => ({
            src: getImageUrl(img.image_url),
            title: item.title,
            description: item.description,
            projectName: item.project_name || "",
          }))
        : item.image_url
          ? [
              {
                src: getImageUrl(item.image_url),
                title: item.title,
                description: item.description,
                projectName: item.project_name || "",
              },
            ]
          : [];
    return imgs;
  });

  // Filter images by project name
  const visible = allImages
    .map((img: any, idx: number) => {
      // Create some visual variety with spans
      let span = "";
      if (idx % 7 === 0) span = "md:col-span-2 md:row-span-2";
      else if (idx % 7 === 3) span = "md:row-span-2";

      // Determine category based on project name (case-insensitive and check for partial match)
      const projectNameUpper = (img.projectName || "").toUpperCase();
      const titleUpper = (img.title || "").toUpperCase();

      const cat =
        projectNameUpper.includes("VIVAH") ||
        titleUpper.includes("VIVAH") ||
        titleUpper.includes("MARRIAGE") ||
        titleUpper.includes("WEDDING")
          ? "VIVAH"
          : projectNameUpper.includes("VIDYA") ||
              titleUpper.includes("VIDYA") ||
              projectNameUpper.includes("EDUCATION") ||
              titleUpper.includes("EDUCATION")
            ? "VIDYA"
            : projectNameUpper.includes("ANNA") ||
                titleUpper.includes("ANNA") ||
                titleUpper.includes("RATION") ||
                titleUpper.includes("FOOD")
              ? "ANNA"
              : projectNameUpper.includes("SAHAY") ||
                  titleUpper.includes("SAHAY") ||
                  titleUpper.includes("HELP") ||
                  titleUpper.includes("OTHER")
                ? "SAHAY"
                : "All";

      return {
        src: img.src,
        cat,
        title: img.title,
        span,
      };
    })
    .filter((i: any) => filter === "All" || i.cat === filter);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the field"
        description="Faces, smiles and milestones from across our projects."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  filter === c
                    ? "bg-gradient-brand text-white border-transparent shadow-soft"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
            {visible.map((it: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setOpen(it.src ?? null)}
                className={`group relative overflow-hidden rounded-2xl ${it.span} bg-muted shadow-soft hover:shadow-elevated transition-all`}
              >
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <div className="text-[10px] font-bold tracking-wider uppercase text-[var(--brand-orange)]">
                    {it.cat}
                  </div>
                  <div className="text-white text-sm font-semibold">{it.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm grid place-items-center p-4 anim-rise"
          onClick={() => setOpen(null)}
        >
          <img
            src={open}
            alt=""
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-elevated"
          />
        </div>
      )}
    </>
  );
}
