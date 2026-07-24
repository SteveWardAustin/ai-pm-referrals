# ai-pm-referrals

A single-page landing page for Steve Ward's job search, meant to be emailed
to professional contacts. It walks the visitor through one ask at a time:

1. **Intro** — a 20-second pitch with a single CTA.
2. **Ask** — "Know one person I should talk to?" with a name/contact form,
   an intro-style toggle, and a copyable intro blurb.
3. **Fallback** (only if "no one comes to mind" is tapped) — a company
   recognition checklist, a "book 15 min" link, a "forward this" share
   blurb, and a free-text "where do you see me fitting?" box.

Built with Next.js (App Router, TypeScript, Tailwind CSS v4) and
`@supabase/supabase-js` for insert-only submission storage.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase env vars set, the app still works end-to-end — submissions
are just logged to the console instead of saved (see below).

## Content to customize

Edit `src/lib/content.ts`:

- `CAL_COM_URL` — your real Cal.com booking link.
- `TARGET_COMPANIES` — the companies you're actually targeting (currently
  placeholders).
- `REFERRAL_BLURB` / `FORWARD_BLURB` — the copyable forward text.

## Supabase setup

1. Create a Supabase project.
2. Run this SQL to create the submissions table:

   ```sql
   create table referral_submissions (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     submission_type text not null check (submission_type in ('referral', 'fit_suggestion')),
     contact_name text,
     contact_method text,
     intro_style text check (intro_style in ('steve_intros', 'contact_reaches_out')),
     fit_notes text,
     recognized_companies text,
     source text default 'landing_page'
   );

   alter table referral_submissions enable row level security;

   create policy "Allow anonymous inserts"
     on referral_submissions
     for insert
     to anon
     with check (true);
   ```

   No select/update/delete policy is created, so the anon key can only ever
   write new rows — not read, edit, or delete existing ones.

3. Copy `.env.local.example` to `.env.local` and fill in your project's URL
   and anon (public) key:

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Restart the dev server (or redeploy) so the new env vars are picked up.

## Submission shape

- **Referral** (`submission_type: "referral"`): `contact_name`,
  `contact_method`, `intro_style` (`steve_intros` | `contact_reaches_out`).
- **Fit suggestion** (`submission_type: "fit_suggestion"`): `fit_notes`
  and/or `recognized_companies` (comma-separated list of checked
  companies), from the fallback screen.

## Deploy

Any Next.js host works (e.g. Vercel). Set the two `NEXT_PUBLIC_SUPABASE_*`
env vars in your hosting provider's project settings.
