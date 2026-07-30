import Image from "next/image";
import { TARGET_ROLES } from "@/lib/content";

const HIGHLIGHTS = [
  "20 years of PM leadership at Dell, Boeing & Honeywell",
  "UT Austin McCombs — 7-month AI/ML program grad",
  "Targeting Austin or remote roles",
];

export default function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <Image
        src="/steve-headshot.jpg"
        alt="Steve Ward"
        width={96}
        height={96}
        priority
        className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-lg shadow-accent/10"
      />

      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Steve&apos;s job search, in progress
      </p>

      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
        Know someone I should meet? 💡
      </h1>

      <p className="text-lg leading-relaxed text-foreground/80">
        I&apos;m looking for a new job in AI, where I can use my years of
        project mgmt experience along with strong AI technical skills.
      </p>

      <ul className="flex flex-col gap-2">
        {HIGHLIGHTS.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/70">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {TARGET_ROLES.map((role) => (
          <span
            key={role}
            className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
          >
            {role}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform active:scale-[0.98] hover:brightness-110"
      >
        Help me find my next role
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}
