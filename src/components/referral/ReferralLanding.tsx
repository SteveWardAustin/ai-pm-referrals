"use client";

import { useState } from "react";
import IntroScreen from "@/components/referral/IntroScreen";
import AskScreen from "@/components/referral/AskScreen";
import FallbackScreen from "@/components/referral/FallbackScreen";
import ThanksScreen from "@/components/referral/ThanksScreen";
import { getReferredByFromUrl } from "@/lib/referredBy";

type Screen = "intro" | "ask" | "fallback" | "thanks";

export default function ReferralLanding() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [thanksVariant, setThanksVariant] = useState<"referral" | "fit">("referral");
  const [referredBy] = useState(getReferredByFromUrl);

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-gradient-to-br from-orange-500 via-amber-400 to-blue-600 px-4 py-10 sm:py-16">
      <div className="w-full max-w-lg rounded-3xl border border-white/40 bg-white/80 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur-md sm:p-10">
        {screen === "intro" && <IntroScreen onNext={() => setScreen("ask")} />}

        {screen === "ask" && (
          <AskScreen
            referredBy={referredBy}
            onBack={() => setScreen("intro")}
            onNoOneComesToMind={() => setScreen("fallback")}
            onSubmitted={() => {
              setThanksVariant("referral");
              setScreen("thanks");
            }}
          />
        )}

        {screen === "fallback" && (
          <FallbackScreen
            referredBy={referredBy}
            onBack={() => setScreen("ask")}
            onSubmitted={() => {
              setThanksVariant("fit");
              setScreen("thanks");
            }}
          />
        )}

        {screen === "thanks" && (
          <ThanksScreen
            variant={thanksVariant}
            onReset={() => setScreen("ask")}
          />
        )}
      </div>
    </main>
  );
}
