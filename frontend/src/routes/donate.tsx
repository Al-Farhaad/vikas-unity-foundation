import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Heart, HeartHandshake, BookOpen, Package, Check, Copy, Smartphone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import scannerImg from "@/assets/scanner.jpeg";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Vikas Unity Foundation" },
      {
        name: "description",
        content:
          "Support Vikas Unity Foundation. Your donation funds marriages, education, ration kits and essential help for the needy.",
      },
      { property: "og:title", content: "Donate to Vikas Unity Foundation" },
      {
        property: "og:description",
        content:
          "Fund marriages, education, ration kits and essential help for India's underserved communities.",
      },
    ],
  }),
  component: DonatePage,
});

const tiers = [
  { amt: 500, label: "Books for a child's education", icon: BookOpen, color: "var(--brand-blue)" },
  { amt: 1500, label: "Ration kit for a family", icon: Package, color: "var(--brand-orange)" },
  {
    amt: 3000,
    label: "Sponsor a wedding ceremony",
    icon: HeartHandshake,
    color: "var(--brand-magenta)",
  },
  { amt: 5000, label: "Essential help for the needy", icon: Heart, color: "var(--brand-teal)" },
];

function DonatePage() {
  const [copied, setCopied] = useState(false);
  const upiId = "vikasunityfoundation@icici";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Fuel a future. Fund a smile."
        description="Every rupee goes directly to marriages, education, ration kits and essential help for the underprivileged."
      />
      <section className="section-y bg-background">
        <div className="container-page max-w-4xl">
          {/* Main Donation Container */}
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* QR Code Scanner Card on Top */}
            <div className="relative group w-full max-w-md p-6 rounded-3xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all duration-300">
              <div className="absolute inset-0 bg-muted/20 rounded-3xl opacity-50 pointer-events-none" />
              
              <div className="relative flex flex-col items-center">
                {/* Scanner Frame */}
                <div className="relative p-4 bg-white rounded-2xl shadow-inner border border-border max-w-[280px] mx-auto transition-transform group-hover:scale-[1.02] duration-300">
                  <img
                    src={scannerImg}
                    alt="UPI QR Code Scanner"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                  {/* Decorative Scan Line Overlay */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--brand-orange)] animate-pulse" style={{ animationDuration: '2s' }} />
                </div>

                <div className="mt-6 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] text-xs font-semibold uppercase tracking-wider">
                    <Smartphone className="size-3.5" /> Scan to Pay
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Donate via UPI QR Code
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Open GPay, PhonePe, Paytm, or any BHIM UPI app to scan and pay directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Below Texts / Info on How to Donate */}
            <div className="w-full max-w-2xl space-y-6">
              
              {/* UPI Copy Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-muted/40 max-w-md mx-auto">
                <div className="text-left">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">UPI ID for Manual Transfer</div>
                  <div className="font-mono text-sm font-semibold text-foreground">{upiId}</div>
                </div>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto gap-2 rounded-xl text-xs font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-green-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" /> Copy ID
                    </>
                  )}
                </Button>
              </div>

              {/* Instructions and Thank You Message */}
              <div className="space-y-4 px-4">
                <h4 className="text-xl font-bold tracking-tight">How your donation works</h4>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
                  Vikas Unity Foundation is run by passionate volunteers. 100% of your contributions go directly into field works like purchasing ration kits, supporting wedding arrangements, and school books.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-green-500" /> 100% Direct Program Funding
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-green-500" /> Transparent Operations
                  </span>
                </div>
              </div>

              {/* Share Screenshot Call-to-action */}
              <div className="p-6 rounded-2xl bg-gradient-brand text-white max-w-lg mx-auto text-left shadow-soft space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <Heart className="size-5 fill-white/20" /> Share your transaction
                </h4>
                <p className="text-sm text-white/90 leading-relaxed">
                  After completing your transaction via QR code, please send us a screenshot of the payment receipt so we can issue your acknowledgment and keep you updated on the impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link to="/contact" className="flex-1">
                    <Button className="w-full bg-white text-[var(--brand-blue)] hover:bg-white/90 rounded-xl font-semibold text-sm">
                      Submit via Contact Form
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl font-semibold text-sm">
                      Share on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Suggested Impacts Tiers Section Below */}
          <div className="mt-20 pt-16 border-t border-border space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Suggested Donation Tiers</h3>
              <p className="text-sm text-muted-foreground">
                Here are the core expenses we cover through public donations. You can scan the QR code above with any of these amounts:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((t) => (
                <div
                  key={t.amt}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 hover:border-foreground/15 transition-colors"
                >
                  <div
                    className="size-10 rounded-lg grid place-items-center text-white"
                    style={{ background: t.color }}
                  >
                    <t.icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">₹{t.amt.toLocaleString()}</div>
                    <div className="text-sm font-semibold mt-1" style={{ color: t.color }}>{t.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
