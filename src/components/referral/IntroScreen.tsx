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
      <div className="relative -mx-6 -mt-6 h-48 overflow-hidden rounded-t-3xl sm:-mx-10 sm:-mt-10 sm:h-64">
        <Image
          src="/steve-sailing.jpg"
          alt="Steve Ward sailing"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 512px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Austin, TX
        </span>
      </div>

      <p className="text-base font-semibold uppercase tracking-wide text-accent">
        Steve&apos;s job search, in progress
      </p>

      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
        Know someone I should meet? 💡
      </h1>

      <p className="text-xl leading-relaxed text-foreground/80">
        I&apos;m looking for a new job in AI, where I can use my years of
        project mgmt experience along with strong AI technical skills.
      </p>

      <ul className="flex flex-col gap-2">
        {HIGHLIGHTS.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-base text-foreground/70">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {TARGET_ROLES.map((role) => (
          <span
            key={role}
            className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
          >
            {role}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-lg font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform active:scale-[0.98] hover:brightness-110"
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
