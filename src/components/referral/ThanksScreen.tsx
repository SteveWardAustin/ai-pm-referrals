export default function ThanksScreen({
  variant,
  onReset,
}: {
  variant: "referral" | "fit";
  onReset: () => void;
}) {
  const message =
    variant === "referral"
      ? "Got it — thank you. This genuinely helps."
      : "Thanks so much — every bit of this helps.";

  return (
    <div className="flex flex-col items-center gap-5 py-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold">{message}</h2>
      <p className="max-w-sm text-foreground/70">
        I really appreciate you taking a minute for this — thanks for being
        in my corner.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 text-sm text-foreground/50 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground/80"
      >
        Submit another
      </button>
    </div>
  );
}
