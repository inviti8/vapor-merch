# Perni Cious Remedies — Site Plan

Apothecary-angle brand selling stylized tincture and pill bottles. Companion to UV_PRINT_PRODUCTS.md §4f and NOVELTY_BOTTLES.md. Compiled 2026-04-18.

---

## 1. Brand Identity

### Name
**Perni Cious Remedies** — stylized split of "Pernicious Remedies."
- Definition of *pernicious*: "having a harmful effect, especially in a gradual or subtle way" — ideal satirical apothecary framing
- Wordmark treatment: the split between "Perni" and "Cious" becomes part of the logo — as if the letters have come apart across decades of "aging"
- Tagline candidates:
  - *"Remedies of Dubious Provenance — Est. Whenever."*
  - *"Slow Cures for Modern Complaints."*
  - *"Bottled with Questionable Intent."*
  - *"Subtle Harm, Tasteful Packaging."*

### Visual direction — gothic apothecary

- **Palette:**
  - `--bone`: `#ECE5D3` (aged paper)
  - `--ink`: `#14110F` (near-black, not pure)
  - `--oxblood`: `#5C1A1B` (wax seal red)
  - `--apothecary-amber`: `#8B5A2B` (bottle glass)
  - `--verdigris`: `#3E5C52` (copper patina, muted green)
  - `--gilt`: `#B8892C` (aged gold accent, never shiny)
- **Typography:**
  - Display: **Cormorant Garamond** (free, Google Fonts) — thin serif, ornamental variants available
  - Alt display: **UnifrakturMaguntia** for blackletter accents (sparingly — section headers only)
  - Body: **Lora** or **Crimson Pro** — readable long-form serif
  - Mono/label: **IM Fell English** — period-accurate for product label detail text
- **Motifs:** moth/butterfly illustrations, botanical line drawings, anatomical hearts, apothecary scales, wax seals, torn paper edges, engraved borders
- **Photography:** bottles on dark stone, dried flowers, candles, vintage books, hands in moody single-source lighting. 60% of the sale *is* the photography.

### Copy voice

Tongue-in-cheek Victorian. Earnest surface, ridiculous content.

> **Dr. Finchley's Nerve Restorative**
> *A gentle compound of unverified botanicals, formulated in 1897 by a gentleman of no medical credentials. Recommended for melancholy, unsolicited opinions, and Monday mornings. Results uncommon. Side effects probable. Not for consumption. Not for decision-making. Not for courts of law.*

---

## 2. Site Architecture

### Page inventory

| Route | Purpose | Priority |
|---|---|---|
| `/` | Home — hero, featured collections, brand voice sample | P0 |
| `/shop` | All products grid, filterable by "ailment" / collection / size | P0 |
| `/shop/[slug]` | Product detail page with lore, specs, photography | P0 |
| `/collections/[slug]` | Curated bundles (e.g., "The Introvert's Set", "Halloween Apothecary") | P0 |
| `/cart` | Cart + go-to-checkout | P0 |
| `/about` | Brand story — fake apothecary "history" + real "we UV-print these" footnote | P0 |
| `/journal` (blog) | Remedy entries, seasonal releases, behind-the-scenes | P1 |
| `/wholesale` | Form for oddity shops, Halloween retailers, bars/speakeasies | P1 |
| `/faq` | Shipping, returns, "is this real medicine" (no), care instructions | P0 |
| `/legal/terms`, `/legal/privacy`, `/legal/not-for-consumption` | Required | P0 |
| `/404` | On-brand "This remedy has been lost to time" | P1 |

### Primary user flows

1. **Browse → PDP → Add to cart → Checkout** (the money path)
2. **Home → Collection → Bundle → Checkout** (AOV booster)
3. **Wholesale inquiry** (form → email)
4. **Email capture** (persistent "receive monthly remedies" signup — 10% off first order)

---

## 3. Tech Stack Recommendation

### Recommended: Astro + Stripe Checkout + Cloudflare Pages

**Why Astro for this project:**
- Static-first = fastest possible site (matters for bottle photography)
- Content-collection model is perfect for a 10–50 SKU catalog in MDX
- Zero JS by default — ship interactivity only where needed (cart widget)
- Full styling freedom — you own every pixel, which is critical for a heavily stylized gothic aesthetic
- Can mix React/Svelte/Vue components on the same page if needed later
- Excellent SEO out of the box

**Why Stripe Checkout for payments:**
- **Simplest possible integration** — ~20 lines of code, hosted checkout page handles cards, Apple Pay, Google Pay, Link
- No PCI compliance burden (Stripe hosts the card form)
- Fees: **2.9% + $0.30** per transaction (standard US rate)
- Supports subscriptions later if you add a "Remedy of the Month" club
- Apple Pay / Google Pay enabled with one line

**Why Cloudflare Pages for hosting:**
- Free tier genuinely adequate for launch
- Global CDN included
- `.com` domain connects in minutes
- Unlimited bandwidth (unlike Vercel free tier's 100GB)

### Full stack summary

| Layer | Tool | Cost |
|---|---|---|
| Framework | **Astro 5.x** | Free |
| Styling | **Tailwind CSS v4** (JIT) + custom CSS variables for palette | Free |
| Components (light JS) | React or Svelte islands (pick one) | Free |
| Content / Products | MDX files in `src/content/products/*.mdx` (or Sanity if catalog grows >50 SKUs) | Free / $0–$99/mo |
| Images | Astro `<Image>` + local optimization; Cloudflare Images if scaling | Free / $5/mo |
| Cart state | **Nanostores** (tiny, framework-agnostic) + `localStorage` persistence | Free |
| Checkout | **Stripe Checkout** (hosted) via serverless function | 2.9% + $0.30/txn |
| Email | **Resend** (transactional) + **Buttondown** or **Klaviyo** (marketing) | $0–$20/mo |
| Hosting | **Cloudflare Pages** | Free |
| Domain | Cloudflare Registrar or Porkbun | ~$10/yr |
| Analytics | **Plausible** or **Fathom** (privacy-first, GDPR-safe) | $9/mo |
| Forms (wholesale/contact) | **Formspree** or Cloudflare Workers | Free tier |
| Search (if needed) | **Pagefind** (static search, works with Astro) | Free |

### Stack we considered but aren't picking (and why)

- **Shopify (full)** — easiest to launch but restricted styling via Liquid. Would fight the theme constantly to achieve gothic aesthetic.
- **Shopify Headless + Next.js** — powerful but adds Shopify's $39/mo cost and extra complexity we don't need at <50 SKUs.
- **WooCommerce** — WordPress bloat, security overhead, not modern DX.
- **Next.js alone** — fine choice, but Astro is better-suited to mostly-static content sites like this.
- **Squarespace / Wix** — fast but styling ceiling is low. Aesthetic compromises.

### Migration path (when to change stacks)

- **< 50 SKUs, < $5k/mo revenue:** stay on Astro + MDX
- **50–200 SKUs, $5k–$25k/mo:** add Sanity CMS for product management
- **200+ SKUs OR wholesale complexity:** move to Shopify Headless (Astro stays as the frontend), gain inventory/order/tax automation
- **International expansion:** consider Shopify Markets for multi-currency

---

## 4. Payment Rails — Simplest Integration

### Stripe Checkout flow

1. User clicks "Purchase" on product or cart page
2. Astro serverless function (on Cloudflare Worker) creates a Stripe Checkout session with line items
3. User is redirected to Stripe's hosted page (`checkout.stripe.com`)
4. Stripe collects payment + shipping address
5. On success → redirect to `/thank-you?session_id=...`
6. Stripe webhook → Cloudflare Worker → write order to a simple store (Cloudflare D1, Airtable, or just email yourself)
7. Fulfillment: email contains order details, you print + ship manually (or integrate later with Shippo / Pirate Ship)

### Minimal payment-rails code surface

- 1 Cloudflare Worker endpoint: `/api/checkout` (creates Stripe session)
- 1 Cloudflare Worker endpoint: `/api/webhook` (receives order confirmations)
- 1 success page: `/thank-you.astro`
- Total code: ~150 lines
- Setup time: **one evening**

### What Stripe handles for you (don't build these)

- PCI-compliant card entry
- 3D Secure / SCA for EU cards
- Fraud detection (Stripe Radar, included)
- Apple Pay / Google Pay
- Multi-currency (enable as needed)
- Tax calculation (Stripe Tax — $0.05/txn, enable when you have $50k+ in sales)
- Refunds (via Stripe dashboard)
- Receipts (auto-sent by Stripe)

### Shipping

Start manual. Buy [Pirate Ship](https://pirateship.com) labels (cheapest US rates, free to use). Integrate [Shippo](https://goshippo.com) when volume justifies automation (~50+ orders/month).

### Sales tax

- **US under $100k revenue + one state:** collect sales tax manually for your home state only
- **Growing:** enable [Stripe Tax](https://stripe.com/tax) — handles nexus tracking automatically
- **Big:** [TaxJar](https://www.taxjar.com/) or [Avalara](https://www.avalara.com/) (overkill for now)

---

## 5. Product Catalog Structure

Start with 8–12 SKUs across 3 collections. Each product needs:

```yaml
# src/content/products/dr-finchleys-nerve-restorative.mdx
slug: dr-finchleys-nerve-restorative
name: "Dr. Finchley's Nerve Restorative"
vintage_date: "Est. 1897"
collection: victorian-apothecary
price_usd: 24
bottle_size: "8 oz amber apothecary"
closure: "cork stopper"
contents: "empty — decorative"
stripe_price_id: "price_1ABC..." # from Stripe dashboard
primary_image: "/images/products/finchley-hero.jpg"
gallery: [...]
weight_oz: 10
in_stock: true
tags: ["nerves", "victorian", "amber", "best-seller"]
---

## The Lore

A gentle compound of unverified botanicals, hand-mixed by a gentleman of
no medical credentials...

## Specifications

- 8 oz amber glass apothecary bottle
- Cork stopper
- UV-printed label, fade-resistant
- Empty — decorative only
- Ships within 3 business days
```

### Launch collection ("Cabinet of Curious Remedies")

Suggested first SKUs:

1. **Dr. Flinchley's Nerve Restorative** — 8oz amber, cork — $24
2. **Madame Périgord's Sarcastic Remedy** — 4oz amber dropper — $18
3. **Truthful Bitters** — 8oz clear with cork — $22
4. **Tempis Fugit Tonic** — 8oz cobalt blue, cork — $28
5. **Anxiety, Bottled.** — 4oz amber straight-sided jar — $18
6. **Unsolicited Opinions Suppressant** — 8oz amber, cork — $24
7. **Monday Mourning Antidote** — 4oz clear dropper — $16
8. **Tablets for Patience Deficiency** — 8oz amber, cork — $24

Collections:
- **Victorian Apothecary** (items 1–4)
- **Modern Complaints** (items 5–8)
- **The Starter Cabinet** — bundle of 3, $60 (save $12)
- **The Full Pharmacopoeia** — bundle of 6, $120 (save $24)

---

## 6. Development Timeline

| Week | Deliverable |
|---|---|
| 1 | Domain registered, Cloudflare Pages + Astro scaffold live, placeholder home page deployed |
| 2 | Design system built (palette, typography, reusable components); home page + product page templates; one SKU live end-to-end without payment |
| 3 | Stripe Checkout integration; webhook handler; order email notifications; 8 SKUs with full lore + photography |
| 4 | Collections pages, cart, bundles, FAQ, legal pages; mobile polish; accessibility pass (focus states, alt text, contrast) |
| 5 | SEO pass, email capture integration, 404 page, journal/blog scaffold; soft launch to friends/family for QA |
| 6 | Public launch: Etsy shop mirror of top SKUs, Reddit seeding, initial ad budget $10/day |

**Total build time: ~6 weeks part-time** (estimate 8–12 hrs/week; compressible to 3 weeks full-time).

---

## 7. Cost Breakdown (Year 1)

### Fixed monthly

| Line item | Cost |
|---|---|
| Hosting (Cloudflare Pages) | $0 |
| Domain | $0.85/mo ($10/yr) |
| Email marketing (Buttondown, <500 subs) | $9 |
| Transactional email (Resend, <3k/mo) | $0 |
| Analytics (Plausible) | $9 |
| Stripe (no monthly fee) | $0 |
| **Total fixed** | **~$19/mo** |

### Variable

- Stripe fees: 2.9% + $0.30 per order
- Shipping labels (Pirate Ship): at cost, no markup
- Packaging materials: ~$1–$3 per order

### One-time launch spend

| Line item | Cost |
|---|---|
| Domain(s) × 3 (umbrella + 2 redirects) | $30 |
| LLC registration (state-dependent) | $50–$300 |
| Product photography (DIY with backdrop + lighting) | $150 |
| Initial bottle inventory (50 units × 6 SKUs) | ~$300–$500 |
| Labels, corks, adhesion primer, packaging | ~$100 |
| Logo + wordmark design (DIY or Fiverr) | $0–$150 |
| **Total launch capital** | **~$650–$1,250** |

### Break-even

At average order value of $35 and 86% gross margin:
- Gross profit per order ≈ $30
- Break-even on launch capital: ~25–40 orders
- Break-even on monthly fixed costs: ~1 order

---

## 8. Legal / Compliance Checklist

- [ ] Form LLC (usually $50–$300, state-dependent). Use [Northwest Registered Agent](https://www.northwestregisteredagent.com/) or DIY via state website.
- [ ] Register EIN (free, IRS.gov, 10 minutes)
- [ ] Open business bank account (Mercury or Relay — free)
- [ ] Sales tax permit for home state
- [ ] Every product page: "Not for consumption" disclosure
- [ ] Every bottle: physical "Not for consumption" label text (required to match online listing)
- [ ] Terms of Service, Privacy Policy, Refund Policy (use [Termly](https://termly.io/) or [Shopify's free generator](https://www.shopify.com/tools/policy-generator))
- [ ] CA Prop 65 warning if shipping to California (most decorative glassware triggers this)
- [ ] Never use: *cures, treats, prevents, Rx, prescription, medicine, FDA-approved, pharmaceutical*
- [ ] Liability insurance ($300–$800/yr via [Thimble](https://www.thimble.com/) or [Hiscox](https://www.hiscox.com/))

---

## 9. Marketing — First 90 Days

- **Etsy mirror shop** — list top 3–4 SKUs on Etsy. Etsy drives discovery; drive repeat to `.com`.
- **Instagram + Pinterest** — the aesthetic carries these platforms; post 3×/week moody bottle photography
- **Reddit** — r/witchesvspatriarchy, r/goth, r/cottagecore, r/OddlySpecific, r/halloween (post items you made, don't spam)
- **Email list** — monthly "New Remedies" drop with seasonal SKUs
- **Halloween prep** — October is *the* month. Have seasonal SKUs stocked by August 15.
- **Wholesale outreach** — contact: Spirit Halloween, AREA15 gift shops, local oddities/curiosity stores, goth/alternative boutiques, speakeasy bars for bar decor

---

## 10. Open Questions (decide before coding starts)

- [ ] Final wordmark: will we commission or DIY? (Fiverr can get a decent one for $50–$100 if going custom)
- [ ] Single umbrella brand or sub-brand every product? (recommend umbrella "Perni Cious Remedies" with product names as "lines")
- [ ] Domain confirmation: `pernicious.co` / `pernicious-remedies.com` / `perniciousremedies.com` / `getpernicious.com` — check at Cloudflare Registrar
- [ ] Launch without blog/journal (P1), or include (adds ~1 week)?
- [ ] Apple Pay + Google Pay at launch? (recommend yes — 1-line Stripe config, 30% conversion lift)
- [ ] Ship internationally at launch, or US-only for simplicity? (recommend US-only for first 90 days)
- [ ] Email ESP: Buttondown (simple) vs. Klaviyo (powerful) — Buttondown is the right starting point

---

## 11. Repo Scaffold (when we're ready to build)

```
pernicious-remedies/
├── public/
│   ├── fonts/           # Cormorant Garamond, IM Fell English, UnifrakturMaguntia
│   ├── images/
│   │   ├── products/
│   │   ├── brand/       # logo variants, moth illustrations, seals
│   │   └── og/          # social share cards
│   └── favicon variants
├── src/
│   ├── content/
│   │   ├── products/    # MDX per product
│   │   ├── collections/ # MDX per collection
│   │   └── journal/     # blog entries (P1)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── ProductCard.astro
│   │   ├── CartDrawer.svelte   # or React, pick one
│   │   ├── WaxSeal.astro        # decorative
│   │   └── ...
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── shop/
│   │   ├── collections/
│   │   ├── journal/
│   │   ├── about.astro
│   │   ├── faq.astro
│   │   └── legal/
│   ├── functions/       # Cloudflare Worker endpoints
│   │   ├── checkout.ts
│   │   └── webhook.ts
│   ├── lib/
│   │   ├── cart.ts      # nanostores
│   │   └── stripe.ts
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.js
├── .env                 # STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
└── package.json
```

---

## Sources

- [Astro docs](https://docs.astro.build/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Stripe Checkout docs](https://stripe.com/docs/payments/checkout)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Registrar](https://domains.cloudflare.com/)
- [Porkbun](https://porkbun.com)
- [Buttondown (newsletter)](https://buttondown.email/)
- [Resend (transactional email)](https://resend.com/)
- [Plausible Analytics](https://plausible.io/)
- [Pirate Ship (shipping)](https://pirateship.com/)
- [Pagefind (static search)](https://pagefind.app/)
- [Nanostores](https://github.com/nanostores/nanostores)
- [Google Fonts — Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- [Google Fonts — IM Fell English](https://fonts.google.com/specimen/IM+Fell+English)
- [Google Fonts — UnifrakturMaguntia](https://fonts.google.com/specimen/UnifrakturMaguntia)
