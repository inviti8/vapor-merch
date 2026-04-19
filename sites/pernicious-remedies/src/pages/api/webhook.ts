import type { APIRoute } from 'astro';
import { getStripe } from '~/lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any)?.runtime?.env ?? import.meta.env;
  const secretKey = env.STRIPE_SECRET_KEY;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return new Response('Stripe not configured', { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return new Response('Missing signature', { status: 400 });

  const body = await request.text();
  const stripe = getStripe(secretKey);

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('Order received:', session.id, session.amount_total, session.customer_email);
      // TODO: send yourself an email via Resend, write to D1, etc.
      break;
    }
    default:
      console.log('Unhandled event type:', event.type);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'content-type': 'application/json' },
  });
};
