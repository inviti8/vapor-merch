# Business Tasks — First Site Launch

Tracks everything needed to go from zero → first sale of **Perni Cious Remedies**.
Organized by domain. Items marked **[site]** apply only to this one brand; items marked
**[company]** serve every future brand under `sites/*`. Cost + time estimates are ballpark.

---

## 1. Legal & Business Entity **[company]**

Do this FIRST — it unlocks the bank account, sales tax permit, and Stripe live mode.

- [ ] **Choose LLC state.** Home state is simplest unless you have a reason otherwise. Wyoming / Delaware cost more and only pay off at significant scale. *(15 min research)*
- [ ] **Form LLC.** DIY via your state's Secretary of State website, or use [Northwest Registered Agent](https://www.northwestregisteredagent.com/) (~$39 + state fee). *($50–$300, 1–5 business days)*
- [ ] **Parent company name decision.** Is the LLC "Perni Cious Remedies LLC" or an umbrella like "Vapor Merch LLC" / "[Your Name] Studio LLC"? Recommend umbrella — every future brand files as a DBA under it, one LLC fee instead of N. *(decide before filing)*
- [ ] **Get EIN.** Free at [IRS.gov EIN assistant](https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online). Takes 10 minutes; issued immediately. *($0)*
- [ ] **Register DBA** ("Perni Cious Remedies" as a trade name of the umbrella LLC). State or county filing. *($10–$100)*
- [ ] **Open business bank account.** [Mercury](https://mercury.com) (free, online-only, great for ecom) or [Relay](https://relayfi.com). Avoid brick-and-mortar banks for this. *(1–3 business days)*
- [ ] **Business credit card.** Not urgent — [Chase Ink Unlimited](https://creditcards.chase.com/business-credit-cards/ink-business-unlimited) or [Amex Blue Business Plus](https://www.americanexpress.com/us/credit-cards/business/business-credit-cards/) once LLC is set up. Useful for ad spend and supplier orders.
- [ ] **Sales tax permit** for home state. Free, done at state revenue department website. Required before first sale in home state. *(30 min, instant–2 weeks)*
- [ ] **General liability insurance.** [Thimble](https://www.thimble.com/) or [Hiscox](https://www.hiscox.com/). $300–$800/yr for decorative-goods ecom. Recommended before first wholesale order. *(30 min)*

---

## 2. Domain & Hosting **[site]**

- [ ] **Check domain availability:** `pernicious.co` (target) → `pernicious-remedies.co` (fallback) → `pernicious.shop` → `perniciousremedies.com`. Check all at once at [Cloudflare Registrar](https://domains.cloudflare.com/) or [Porkbun](https://porkbun.com).
- [ ] **Buy primary domain** + 1–2 redirects. Cloudflare Registrar sells at cost (~$10/yr), no markup. *($20–$40/yr total)*
- [ ] **Cloudflare account** (free tier — sign up at [dash.cloudflare.com](https://dash.cloudflare.com/)).
- [ ] **Cloudflare Pages project.** Connect GitHub repo → `vapor-merch`, set root directory to `sites/pernicious-remedies`, build command `npm run build`, output `dist`. *($0)*
- [ ] **Connect custom domain** in Pages → Custom Domains. DNS propagates in minutes with Cloudflare.
- [ ] **Environment variables** set in Pages dashboard: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PUBLIC_SITE_URL=https://pernicious.co`, `RESEND_API_KEY`, `ORDER_NOTIFICATION_EMAIL`.

---

## 3. Payment Rails (Stripe) **[site]**

- [ ] **Create Stripe account.** [dashboard.stripe.com/register](https://dashboard.stripe.com/register). Business entity = your LLC.
- [ ] **Complete activation** — provide EIN, bank account, ID. Required before going live. *(15 min + 1–2 days for verification)*
- [ ] **Enable Apple Pay + Google Pay** in Stripe settings (on by default for Checkout — just verify).
- [ ] **Enable "Link"** (Stripe's one-click checkout) — off by default, toggle on.
- [ ] **Create products in Stripe dashboard** — one product per SKU, one price per product. Copy each `price_...` ID into the corresponding `.mdx` frontmatter `stripePriceId` field. *(5 min per SKU)*
- [ ] **Configure webhook endpoint** (production): `https://pernicious.co/api/webhook`, subscribe to `checkout.session.completed`. Copy the signing secret into Cloudflare env vars.
- [ ] **Install Stripe CLI** locally for dev: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli). Run `stripe listen --forward-to http://localhost:4321/api/webhook` during local dev.
- [ ] **Stripe Radar** (fraud detection) — on by default, verify settings.
- [ ] **Don't enable Stripe Tax yet** — wait until revenue hits ~$50k or you have nexus in multiple states.

---

## 4. Email Infrastructure **[site]**

- [ ] **Buttondown account** at [buttondown.email](https://buttondown.email). Free up to 100 subscribers, then $9/mo to 1k. Connect your primary domain for sender authentication.
- [ ] **Replace newsletter form action** in `sites/pernicious-remedies/src/components/Footer.astro` — currently `/api/subscribe` placeholder. Point at Buttondown's embed form endpoint or build a small `/api/subscribe.ts` that forwards to Buttondown's API.
- [ ] **Welcome email draft** — set up Buttondown automation: on subscribe → send "Welcome to the Pharmacopoeia" with 10%-off code.
- [ ] **Resend account** at [resend.com](https://resend.com) for transactional email (order confirmations). Free tier: 100/day, 3k/mo.
- [ ] **Verify sending domain** in Resend — adds DKIM/SPF records via Cloudflare DNS. *(10 min, propagates in minutes)*
- [ ] **Wire order-notification email** in `src/pages/api/webhook.ts` — currently logs; replace with `resend.emails.send(...)` to `ORDER_NOTIFICATION_EMAIL`.
- [ ] **Set up email addresses:** `hello@`, `orders@`, `wholesale@`, `privacy@pernicious.co`. Cloudflare Email Routing (free) forwards all of these to your personal inbox.

---

## 5. Analytics & Forms **[site]**

- [ ] **Plausible account** at [plausible.io](https://plausible.io). $9/mo. Add script tag to `src/layouts/Base.astro`.
- [ ] **Formspree account** at [formspree.io](https://formspree.io) for the wholesale inquiry form. Free tier = 50 submissions/mo. Replace `REPLACE_ME` in `src/pages/wholesale.astro`.
- [ ] *(Optional)* Sentry or similar for error tracking — skip until launched and you hit a real bug in production.

---

## 6. Product Sourcing & Physical Setup **[site]**

- [ ] **Order bottle sample pack** — 12× of each candidate bottle style (4oz amber, 8oz amber, 4oz clear dropper, 8oz cobalt blue, plus cork stoppers). Test UV print adhesion on each. Budget: ~$75. Vendors: [SKS Bottle](https://www.sks-bottle.com/), [Burch Bottle](https://www.burchbottle.com/), [Specialty Bottle](https://www.specialtybottle.com/).
- [ ] **UV adhesion primer** for glass — check eufyMake's recommended primer for best label durability.
- [ ] **Cylindrical rotary jig** for the E1 — [3djigsolutions](https://3djigsolutions.com/) carries E1-compatible jigs. Required to print around curved bottles. *(~$60–$120)*
- [ ] **Test print workflow** on sample bottles — do adhesion, cure, and scratch tests. Confirm ink bonds after 24h cure.
- [ ] **Production bottle order** — after testing, order 50 units per confirmed SKU (6 SKUs × 50 = 300 bottles). Budget: ~$250–$500.
- [ ] **Packaging materials.** Shopping list:
  - Kraft paper tissue (100 sheets) — ~$15
  - Small corrugated shipping boxes (6×6×6 and 12×6×6, 50 each) — ~$60
  - Bubble wrap or dunnage paper — ~$25
  - Branded hang tags (UV-printed on hardboard in-house — free)
  - Branded stickers for seals (UV-printed on vinyl in-house — free)
  - Thank-you cards (UV-printed on cardstock in-house — free)
- [ ] **Shipping labels** — [Pirate Ship](https://pirateship.com) account (free). USPS + UPS rates at the cheapest commercial tier. Connect later via API if volume grows.
- [ ] **Home studio corner** — dedicated photography + packing space. Backdrop (dark stone or wood surface), single-source lamp, tripod, tape measure for consistent product photos.
- [ ] **Scale** — postal scale for accurate ship weight in Stripe shipping rates. ~$20.

---

## 7. Brand Assets (you're producing these) **[site]**

- [ ] **Primary wordmark SVG** → `public/images/brand/logo.svg`
- [ ] **Icon mark SVG** (stripped-down version for favicon, social, small contexts) → `public/images/brand/mark.svg`
- [ ] **Favicon** → `public/favicon.svg` (referenced in `Base.astro`)
- [ ] **Character illustration** (19th-century doctor/nurse with umbrella) — 3–5 poses for use across site, journal, thank-you page, email header
- [ ] **OG share card** (1200×630 JPG) → `public/og/default.jpg` — referenced in `Base.astro`
- [ ] **Bottle illustration set** — decorative line drawings of each SKU (useful for thumbnails, labels that echo the bottles themselves)
- [ ] **Wax seal motif** (already stubbed as CSS-only `.wax-seal` in `global.css` — can replace with actual SVG if preferred)

---

## 8. Product Photography **[site]**

- [ ] **Shot list per SKU:**
  - 1× hero (3:4 portrait, shelf-ready on moody surface)
  - 2–3× detail (label close-up, cork, side view)
  - 1× in-context (on a bookshelf, on a bar, in a curio cabinet)
  - 1× scale reference (human hand holding)
- [ ] **Batch shoot all 6–8 SKUs in one day** — saves 4–5 hours vs. shooting one at a time. Same light setup.
- [ ] **Edit in Lightroom / Photoshop / Affinity Photo** — consistent color grade across all products.
- [ ] **Export** — 1800px wide JPG, quality 82, ~250–500KB each. Drop at `public/images/products/<slug>-hero.jpg` etc.
- [ ] **OG card** composited separately — include wordmark + hero bottle.

---

## 9. Product Catalog (per SKU) **[site]**

Current launch SKUs from `PERNI_CIOUS_REMEDIES.md` §5. For each one:

- [ ] Create Stripe product + price, copy `price_...` ID
- [ ] Write lore copy (50–150 words, Victorian-sarcastic voice)
- [ ] Shoot photography
- [ ] Create MDX file in `sites/pernicious-remedies/src/content/products/`
- [ ] Determine pack weight in oz (for shipping calc)

### Launch SKU tracker

| # | SKU | Stripe ✓ | Copy ✓ | Photo ✓ | MDX ✓ |
|---|---|---|---|---|---|
| 1 | Dr. Finchley's Nerve Restorative — $24 | [ ] | [x] | [ ] | [x] |
| 2 | Madame Périgord's Sleepless Remedy — $18 | [ ] | [x] | [ ] | [x] |
| 3 | Brimstone Bitters — $22 | [ ] | [ ] | [ ] | [ ] |
| 4 | The Widow's Tonic — $28 | [ ] | [ ] | [ ] | [ ] |
| 5 | Anxiety, Bottled. — $18 | [ ] | [ ] | [ ] | [ ] |
| 6 | Unsolicited Opinions Suppressant — $24 | [ ] | [ ] | [ ] | [ ] |
| 7 | Monday Morning Antidote — $16 | [ ] | [ ] | [ ] | [ ] |
| 8 | The Curate's Patience — $24 | [ ] | [ ] | [ ] | [ ] |
| 9 | Bundle: The Starter Cabinet (3 pack) — $60 | [ ] | [ ] | [ ] | [ ] |
| 10 | Bundle: The Full Pharmacopoeia (6 pack) — $120 | [ ] | [ ] | [ ] | [ ] |

---

## 10. Code TODOs from Scaffold **[site]**

Direct cleanup items in the codebase. Grep for `REPLACE_ME` and `TODO` to confirm all found.

- [ ] `sites/pernicious-remedies/src/pages/wholesale.astro` — replace `https://formspree.io/f/REPLACE_ME` with real Formspree endpoint
- [ ] `sites/pernicious-remedies/src/components/Footer.astro` — newsletter form `action="/api/subscribe"` → build `/api/subscribe.ts` that posts to Buttondown
- [ ] `sites/pernicious-remedies/src/content/products/*.mdx` — replace every `price_REPLACE_ME_*` with real Stripe price IDs
- [ ] `sites/pernicious-remedies/src/pages/api/webhook.ts` — `TODO: send yourself an email via Resend` — implement
- [ ] `sites/pernicious-remedies/src/pages/legal/terms.astro` — replace placeholder text with real terms (use [Termly](https://termly.io/) free generator)
- [ ] `sites/pernicious-remedies/src/pages/legal/privacy.astro` — same
- [ ] `sites/pernicious-remedies/src/layouts/Base.astro` — add Plausible script tag in `<head>` once you have the tracking domain set up
- [ ] `sites/pernicious-remedies/public/favicon.svg` — drop in
- [ ] `sites/pernicious-remedies/public/og/default.jpg` — drop in

---

## 11. Legal / Compliance Content **[company, some site]**

- [ ] **Terms of Service** — draft via [Termly](https://termly.io/) or adapt [Shopify's free policy generator](https://www.shopify.com/tools/policy-generator). Review once. Replace placeholder on `/legal/terms`.
- [ ] **Privacy Policy** — same source. Must cover Stripe, Buttondown, Plausible, Cloudflare.
- [ ] **Return/Refund Policy** — 14-day return on unopened/undamaged; buyer pays return shipping. Already covered in FAQ copy, formalize on its own `/legal/returns` if preferred.
- [ ] **CA Prop 65 warning** — consult a lawyer if shipping glass decor into California (most decorative glassware triggers a Prop 65 warning for lead). Simple warning on every listing is the cheap safe option.
- [ ] **Label audit** — confirm NO bottle label uses `cures / treats / prevents / Rx / prescription / medicine / FDA-approved / pharmaceutical`.
- [ ] **Every bottle ships with** a hang tag that says "Decorative Only — Not For Consumption" in readable type. Required to match your online `/legal/not-for-consumption` statement.

---

## 12. Social Media Accounts **[site]**

Reserve the handles even if you don't post immediately:

- [ ] Instagram `@pernicious.remedies` or `@pernicious_remedies` (check availability)
- [ ] Pinterest `@perniciousremedies`
- [ ] TikTok `@perniciousremedies` (optional — useful for reels if it fits your bandwidth)
- [ ] Threads / Bluesky — reserve but deprioritize
- [ ] **Email signature** on order confirmations → "follow on Instagram @..."

---

## 13. Launch Channels **[site]**

### Primary — the `.com`

- [ ] Site deployed on Cloudflare Pages at custom domain
- [ ] All 8 SKUs + 2 bundles live
- [ ] Real Stripe (live mode) processing orders

### Secondary — Etsy mirror shop

- [ ] Etsy seller account + shop set up (free to open, $0.20 per listing)
- [ ] Mirror your 3–4 top SKUs only (not full catalog — drive repeat buyers to `.com`)
- [ ] Include "See full collection at pernicious.co" in every listing description

### Tertiary — Amazon Handmade

- [ ] Apply only after 90 days of Etsy sales validate the product. Handmade approval takes 2–6 weeks. Requires business info + process photos. Lower fees than Amazon Custom, no need for Custom approval.

### Wholesale

- [ ] Line sheet PDF (one-pager showing all SKUs, wholesale pricing ~50% off MSRP, MOQ 12 mixed units)
- [ ] Outreach list: Spirit Halloween corporate, AREA15 gift shops, local oddities/curio shops, goth/alt boutiques, speakeasy bars
- [ ] Cold-email template

---

## 14. Soft Launch QA (week before public launch)

- [ ] Place a real test order with live Stripe — card, Apple Pay, Google Pay each
- [ ] Check order confirmation email arrives
- [ ] Check webhook hits notification email
- [ ] Refund the test order via Stripe dashboard (confirms refund flow)
- [ ] Mobile: iOS Safari, Android Chrome — nav, cart, checkout all work
- [ ] Desktop: Chrome, Firefox, Safari — same
- [ ] Lighthouse audit: target 90+ on Performance, 95+ on Accessibility
- [ ] All placeholder copy replaced (Terms, Privacy, Formspree, Buttondown)
- [ ] All images present (no broken `<img>` tags)
- [ ] 404 page works
- [ ] Cart persists across tabs and after reload
- [ ] Send the site to 3 friends for brutal feedback

---

## 15. Public Launch Day

- [ ] Instagram + Pinterest post with product beauty shots
- [ ] Newsletter sent to Buttondown list (expected size: friends and family, maybe 20–50 people)
- [ ] Reddit posts: r/witchesvspatriarchy, r/goth, r/cottagecore, r/OddlySpecific, r/halloween (post genuinely, don't spam; read each sub's rules on self-promotion)
- [ ] Monitor Stripe dashboard, respond to any checkout failures immediately
- [ ] Pack and ship same-day whatever comes in

---

## 16. First 30 Days After Launch — Kill / Scale Criteria

- **Revenue < $500 after 30 days** → product mix is wrong. Don't reorder inventory. Investigate: photography, copy, pricing, keyword targeting. Consider pivoting 2 of the 8 SKUs.
- **Revenue $500–$2,000** → mediocre but alive. Keep current SKUs, experiment with one new SKU per week, add $5/day ad spend on top performer.
- **Revenue > $2,000** → scale the winner. Reorder top 3 SKUs at 2× quantity. Begin wholesale outreach. Consider adding Line B (motivational sarcasm) as next collection.

---

## 17. Running Cost Snapshot (monthly, steady state)

| Item | Cost |
|---|---|
| Domain (amortized) | $1 |
| Cloudflare Pages | $0 |
| Stripe | 2.9% + $0.30 per order |
| Buttondown | $9 |
| Plausible | $9 |
| Resend (low volume) | $0 |
| Pirate Ship | $0 |
| Formspree | $0 |
| **Fixed total** | **~$19/mo** |
| + liability insurance (annual) | ~$40/mo amortized |
| + LLC annual report (varies by state) | ~$5–$25/mo amortized |
| **All-in fixed** | **~$60–$90/mo** |

---

## 18. Time-to-Launch Estimate

| Phase | Part-time (10h/wk) | Full-time |
|---|---|---|
| LLC + bank + Stripe activation | 2 weeks (mostly waiting) | 2 weeks (mostly waiting) |
| Code TODOs + policy content | 1 week | 2 days |
| Brand assets + photography | 2 weeks | 3 days |
| Inventory + packaging prep | 2 weeks (supplier lead time) | 2 weeks (supplier lead time) |
| Soft launch + QA | 1 week | 2 days |
| **Total to public launch** | **~6–8 weeks** | **~3–4 weeks** |

Wall-clock bottleneck is ALWAYS the LLC/bank/Stripe activation + supplier shipping for bottle inventory — those are days/weeks of *waiting* regardless of your hours. Start them first.
