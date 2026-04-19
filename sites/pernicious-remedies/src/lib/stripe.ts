import Stripe from 'stripe';

let _client: Stripe | null = null;

export function getStripe(secretKey: string): Stripe {
  if (_client) return _client;
  _client = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' });
  return _client;
}

export interface LineItem {
  stripePriceId: string;
  quantity: number;
}

export async function createCheckoutSession(opts: {
  secretKey: string;
  items: LineItem[];
  siteUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe(opts.secretKey);
  return stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: opts.items.map((i) => ({
      price: i.stripePriceId,
      quantity: i.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    phone_number_collection: { enabled: false },
    allow_promotion_codes: true,
    success_url: `${opts.siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${opts.siteUrl}/cart`,
    automatic_tax: { enabled: false },
  });
}
