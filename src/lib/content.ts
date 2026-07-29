// Everything Steve is likely to want to tweak lives here.

export const CAL_COM_URL = "https://cal.com/stevewardaustin/15-min-brainstorm";

// TODO: swap these for the companies you're actually targeting.
export const TARGET_COMPANIES = [
  "Target Company 1",
  "Target Company 2",
  "Target Company 3",
  "Target Company 4",
  "Target Company 5",
  "Target Company 6",
];

export function getReferralBlurb(contactName: string): string {
  const name = contactName.trim() || "[Name]";
  return `${name} — meet my friend Steve Ward. Steve — meet ${name}.

Steve's moving into AI Project Management after 20 years leading PM/program work at Dell, Boeing, and Honeywell. He just finished UT Austin McCombs' AI/ML program and is targeting AI PM roles in Austin or remote.

Worth a quick chat? I'll let you two take it from here!`;
}

export const FORWARD_BLURB = `A friend of mine, Steve Ward, is looking for his next AI Project Manager role (20 yrs PM experience at Dell/Boeing/Honeywell, just completed UT Austin McCombs' AI/ML program). Thought of you / your network — take a look:`;
