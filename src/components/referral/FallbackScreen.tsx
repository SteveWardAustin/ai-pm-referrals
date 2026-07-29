"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import { CAL_COM_URL, FORWARD_BLURB, TARGET_COMPANIES } from "@/lib/content";
import { recordSubmission } from "@/lib/submissions";

export default function FallbackScreen({
  referredBy,
  onBack,
  onSubmitted,
}: {
  referredBy: string;
  onBack: () => void;
  onSubmitted: () => void;
}) {
  const [checkedCompanies, setCheckedCompanies] = useState<Set<string>>(new Set());
  const [fitNotes, setFitNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageUrl] = useState(() =>
    typeof window !== "undefined" ? window.location.href : ""
  );

  function toggleCompany(company: string) {
    setCheckedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(company)) next.delete(company);
      else next.add(company);
      return next;
    });
  }

  const canSubmit = fitNotes.trim().length > 0 || checkedCompanies.size > 0;

  async function handleSubmit() {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    await recordSubmission({
      submission_type: "fit_suggestion",
      fit_notes: fitNotes.trim(),
      recognized_companies: Array.from(checkedCompanies).join(", "),
      referred_by: referredBy,
    });
    setIsSubmitting(false);
    onSubmitted();
  }

  return (
    <div className="flex flex-col gap-7">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-foreground/80"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Actually, someone came to mind
      </button>

      <div>
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
          No worries — a few other ways to help
        </h2>
      </div>

      <section className="flex flex-col gap-2.5">
        <h3 className="text-sm font-semibold text-foreground/80">
          Recognize anyone from these companies?
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TARGET_COMPANIES.map((company) => (
            <label
              key={company}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition-colors ${
                checkedCompanies.has(company)
                  ? "border-accent/40 bg-accent/10 text-foreground"
                  : "border-foreground/10 text-foreground/70 hover:border-foreground/20"
              }`}
            >
              <input
                type="checkbox"
                checked={checkedCompanies.has(company)}
                onChange={() => toggleCompany(company)}
                className="h-4 w-4 accent-accent"
              />
              {company}
            </label>
          ))}
        </div>
        {checkedCompanies.size > 0 && (
          <p className="text-sm text-accent">
            If a name comes to mind for one of these, drop it below.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-2.5 rounded-xl border border-foreground/10 bg-white/60 p-4">
        <h3 className="text-sm font-semibold text-foreground/80">
          Prefer to just talk it through?
        </h3>
        <a
          href={CAL_COM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-transform active:scale-[0.98] hover:brightness-110"
        >
          Book 15 min to brainstorm
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L6.75 17.25M17.25 6.75H9m8.25 0v8.25" />
          </svg>
        </a>
      </section>

      <section className="flex flex-col gap-2.5 rounded-xl border border-foreground/10 bg-white/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground/80">
            Know someone who&apos;d want to see this?
          </h3>
          <CopyButton
            text={pageUrl ? `${FORWARD_BLURB}\n${pageUrl}` : FORWARD_BLURB}
            label="Copy message"
            className="shrink-0"
          />
        </div>
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/70">
          {FORWARD_BLURB}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="fitNotes" className="text-sm font-semibold text-foreground/80">
          Where do you see me fitting?
        </label>
        <textarea
          id="fitNotes"
          value={fitNotes}
          onChange={(e) => setFitNotes(e.target.value)}
          rows={3}
          placeholder="A role, a team, a type of company — anything you're picturing."
          className="rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </section>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform active:scale-[0.98] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
      >
        {isSubmitting ? "Sending…" : "Send this to Steve"}
      </button>
    </div>
  );
}
