import type { APIRoute } from 'astro';
import { createCheckoutSession } from '~/lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400 });
    }

    // In Cloudflare Pages, env vars come through locals.runtime.env.
    // In local `astro dev`, they come through import.meta.env (from .env).
    const env = (locals as any)?.runtime?.env ?? import.meta.env;
    const secretKey = env.STRIPE_SECRET_KEY;
    const siteUrl = env.PUBLIC_SITE_URL ?? new URL(request.url).origin;

    if (!secretKey) {
      return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 500 });
    }

    const session = await createCheckoutSession({
      secretKey,
      items: body.items,
      siteUrl,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return new Response(JSON.stringify({ error: err.message ?? 'Unknown error' }), {
      status: 500,
    });
  }
};
