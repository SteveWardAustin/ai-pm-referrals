import { supabase } from "@/lib/supabase";

export type IntroStyle = "steve_intros" | "contact_reaches_out";

export type ReferralSubmission = {
  submission_type: "referral";
  contact_name: string;
  contact_method: string;
  intro_style: IntroStyle;
  referred_by: string;
};

export type FitSuggestionSubmission = {
  submission_type: "fit_suggestion";
  fit_notes: string;
  recognized_companies: string;
  referred_by: string;
};

export type Submission = ReferralSubmission | FitSuggestionSubmission;

// Insert-only write against the `referral_submissions` table (see README for
// schema + RLS policy). Table isn't provisioned yet in every environment, so
// this fails soft: the UI still shows a thank-you, and we log for debugging.
export async function recordSubmission(submission: Submission) {
  if (!supabase) {
    console.warn(
      "Supabase is not configured (missing env vars) — skipping submission:",
      submission
    );
    return { ok: false as const };
  }

  const { error } = await supabase.from("referral_submissions").insert({
    ...submission,
    source: "landing_page",
  });

  if (error) {
    console.error("Failed to record submission:", error);
    return { ok: false as const };
  }

  return { ok: true as const };
}
