import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ur", label: "اردو" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

const GT_COOKIE = "googtrans";
const GT_CODES = LANGS.map((l) => l.code).join(",");

function getCookie(name: string): string | null {
  const match = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setCookie(name: string, value: string) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "path=/",
    "max-age=31536000",
    "SameSite=Lax",
  ];
  document.cookie = parts.join("; ");
}

function currentLang(): string {
  const gt = getCookie(GT_COOKIE);
  if (gt) {
    const seg = gt.split("/");
    return seg[seg.length - 1] || "en";
  }
  return "en";
}

function triggerTranslation(lang: string): boolean {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (combo && lang) {
    combo.value = lang;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  return false;
}

export function LanguageSelector({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState<string>("en");
  const [loaded, setLoaded] = useState(false);
  const initGuard = useRef(false);

  useEffect(() => {
    setLang(currentLang());

    if (initGuard.current) return;
    initGuard.current = true;

    const w = window as unknown as {
      googleTranslateElementInit?: () => void;
      google?: {
        translate: {
          TranslateElement: new (opts: Record<string, unknown>, el: string) => void;
        };
      };
    };
    w.googleTranslateElementInit = () => {
      try {
        new w.google!.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: GT_CODES,
            autoDisplay: false,
          },
          "google_translate_element",
        );
      } catch {
        /* noop */
      }
      setLoaded(true);
    };

    if (!document.getElementById("gt_script")) {
      const s = document.createElement("script");
      s.id = "gt_script";
      s.type = "text/javascript";
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      s.onload = () => setLoaded(true);
      document.body.appendChild(s);
    } else {
      setLoaded(true);
    }
  }, []);

  const handleChange = (next: string) => {
    setLang(next);
    setCookie(GT_COOKIE, `/en/${next}`);
    if (!triggerTranslation(next)) {
      window.location.reload();
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div id="google_translate_element" className="hidden" aria-hidden />
      <Globe className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
      <select
        value={lang}
        onChange={(e) => handleChange(e.target.value)}
        disabled={!loaded}
        aria-label="Select language"
        className="appearance-none h-9 pl-8 pr-7 rounded-full text-sm font-medium bg-card border border-border text-foreground hover:border-foreground/20 transition-colors cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/40"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} lang={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 size-3 text-muted-foreground"
        viewBox="0 0 10 6"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 1l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
