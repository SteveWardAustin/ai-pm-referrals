const HIGHLIGHTS = [
  "20 years of PM leadership at Dell, Boeing & Honeywell",
  "UT Austin McCombs — 7-month AI/ML program grad",
  "Targeting AI Product Manager roles · Austin or remote",
];

export default function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Job search, in progress
      </p>

      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
        Hi, I&apos;m Steve Ward.
      </h1>

      <p className="text-lg leading-relaxed text-foreground/80">
        For 20 years I&apos;ve led product and program teams at{" "}
        <span className="font-semibold text-foreground">Dell</span>,{" "}
        <span className="font-semibold text-foreground">Boeing</span>, and{" "}
        <span className="font-semibold text-foreground">Honeywell</span> —
        shipping complex, technical programs at scale. Now I&apos;m moving
        into AI project leadership: I just completed UT Austin McCombs&apos;
        7-month AI/ML program, and I&apos;m looking for my next role as an AI
        Product Manager in Austin or remote.
      </p>

      <ul className="flex flex-col gap-2">
        {HIGHLIGHTS.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/70">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

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
