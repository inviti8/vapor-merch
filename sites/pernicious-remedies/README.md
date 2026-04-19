# Perni Cious Remedies

Gothic apothecary e-commerce site. Astro + Stripe Checkout + Cloudflare Pages.

## Stack

- **Astro 5** (static-first, server-rendered API routes)
- **Tailwind CSS v4** (CSS-based config in `src/styles/global.css`)
- **Svelte 5** (cart drawer island)
- **Stripe Checkout** (hosted payment page)
- **Cloudflare Pages** (hosting + serverless API)
- Nanostores (`@nanostores/persistent`) for cart state with `localStorage`

## Getting started

```bash
cd pernicious-remedies
cp .env.example .env    # fill in your Stripe test keys
npm install
npm run dev             # http://localhost:4321
```

## Stripe setup (first-time)

1. Create a Stripe account: https://dashboard.stripe.com/register
2. Dashboard → Developers → API keys → copy **test** secret key into `.env`
3. Dashboard → Products → create one product per SKU. For each, create a Price, copy the `price_...` ID into the MDX frontmatter `stripePriceId`.
4. For local webhook testing, install the Stripe CLI and run:
   ```
   stripe listen --forward-to http://localhost:4321/api/webhook
   ```
   Copy the printed `whsec_...` into `.env` as `STRIPE_WEBHOOK_SECRET`.
5. Go live: switch to **live** keys once ready, configure a webhook endpoint at `https://pernicious.co/api/webhook` selecting the `checkout.session.completed` event.

## Deployment (Cloudflare Pages)

1. Push repo to GitHub.
2. Cloudflare Dashboard → Pages → Connect to Git → select repo.
3. Build command: `npm run build`
4. Build output: `dist`
5. Env vars (Cloudflare dashboard → project → Settings → Env vars):
   - `STRIPE_SECRET_KEY` (live key once you're ready)
   - `STRIPE_WEBHOOK_SECRET`
   - `PUBLIC_SITE_URL=https://pernicious.co`
6. Connect your custom domain in Cloudflare Pages → Custom domains.

## Adding a product

1. Create Stripe product + price, copy the `price_...` ID.
2. Drop images into `public/images/products/`.
3. Create `src/content/products/your-slug.mdx` — use `dr-finchleys-nerve-restorative.mdx` as a template.
4. The product appears on `/shop` and at `/shop/your-slug`.

## Adding a journal entry

Drop an MDX file into `src/content/journal/`. Set `draft: true` to hide from the index.

## Domain

Primary target: `pernicious.co`. Fallback: `pernicious-remedies.co`.

Check availability at:
- https://domains.cloudflare.com/ (at-cost pricing, no markup — recommended)
- https://porkbun.com (best renewal rates)
- https://www.namecheap.com/domains/domain-name-search/

## Before launch

- [ ] Replace placeholder Terms, Privacy content
- [ ] Replace Formspree URL in `/wholesale` form
- [ ] Add Plausible/Fathom analytics script to `Base.astro`
- [ ] Product photography (the aesthetic is 60% of the sale)
- [ ] Logo and wordmark SVGs in `public/images/brand/`
- [ ] Favicon at `public/favicon.svg`
- [ ] OG share card at `public/og/default.jpg` (1200×630)
- [ ] Switch Stripe keys from test to live
- [ ] Configure webhook endpoint in Stripe dashboard
- [ ] Turn on Stripe Tax when revenue warrants (~$50k+ revenue)
- [ ] File LLC, open business bank account (Mercury or Relay)
- [ ] Sales tax permit for home state
- [ ] Connect Buttondown for newsletter (replace `/api/subscribe` form action in `Footer.astro`)

## Directory layout

```
src/
├── components/     Astro + Svelte islands
├── content/
│   ├── products/   MDX — one per SKU
│   ├── collections/
│   └── journal/
├── layouts/        Base.astro wraps every page
├── lib/            cart.ts (nanostores), stripe.ts
├── pages/
│   ├── api/        checkout.ts, webhook.ts (server-rendered)
│   ├── shop/       index.astro + [slug].astro (product detail)
│   ├── collections/
│   ├── journal/
│   └── legal/
└── styles/global.css   Tailwind import + design tokens
```

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

## License

Proprietary. All curses reserved.
