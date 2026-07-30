"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import { getReferralBlurb } from "@/lib/content";
import { recordSubmission, type IntroStyle } from "@/lib/submissions";

export default function AskScreen({
  referredBy,
  onBack,
  onSubmitted,
  onNoOneComesToMind,
}: {
  referredBy: string;
  onBack: () => void;
  onSubmitted: () => void;
  onNoOneComesToMind: () => void;
}) {
  const [contactName, setContactName] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [introStyle, setIntroStyle] = useState<IntroStyle>("steve_intros");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = contactName.trim().length > 0 && contactMethod.trim().length > 0;
  const referralBlurb = getReferralBlurb(contactName);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    await recordSubmission({
      submission_type: "referral",
      contact_name: contactName.trim(),
      contact_method: contactMethod.trim(),
      intro_style: introStyle,
      referred_by: referredBy,
    });
    setIsSubmitting(false);
    onSubmitted();
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1 text-base text-foreground/50 transition-colors hover:text-foreground/80"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </button>

      <div>
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
          Know one person I should talk to?
        </h2>
        <p className="mt-2 text-lg text-foreground/70">
          One name is all it takes — I&apos;ll take it from there.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contactName" className="text-base font-medium text-foreground/80">
            Their name
          </label>
          <input
            id="contactName"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Jane Smith"
            required
            className="rounded-xl border border-foreground/15 bg-white px-4 py-3 text-lg outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <p className="text-sm text-foreground/50">
            Tip: scrolling your LinkedIn connections for 30 seconds often jogs a name loose.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contactMethod" className="text-base font-medium text-foreground/80">
            Email, LinkedIn, or phone — whatever&apos;s easiest
          </label>
          <input
            id="contactMethod"
            type="text"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            placeholder="jane@company.com"
            required
            className="rounded-xl border border-foreground/15 bg-white px-4 py-3 text-lg outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-base font-medium text-foreground/80">How should this go?</span>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-foreground/5 p-1">
            {(
              [
                { value: "steve_intros", label: "I'll intro you" },
                { value: "contact_reaches_out", label: "You reach out, mention me" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setIntroStyle(option.value)}
                aria-pressed={introStyle === option.value}
                className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                  introStyle === option.value
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground/90"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-accent/20 bg-accent/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-base font-medium text-foreground/80">
              Want to make it easy? Copy this intro email — CC us both:
            </span>
            <CopyButton text={referralBlurb} className="shrink-0" />
          </div>
          <p className="whitespace-pre-line text-base leading-relaxed text-foreground/70">
            {referralBlurb}
          </p>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-lg font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform active:scale-[0.98] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
        >
          {isSubmitting ? "Sending…" : "Send this referral"}
        </button>
        <p className="text-center text-sm text-foreground/50">
          Any intro, big or small, is hugely appreciated.
        </p>
      </form>

      <button
        type="button"
        onClick={onNoOneComesToMind}
        className="text-base text-foreground/50 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground/80"
      >
        No one comes to mind →
      </button>
    </div>
  );
}
