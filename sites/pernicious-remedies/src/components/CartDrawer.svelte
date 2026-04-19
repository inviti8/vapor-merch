<script lang="ts">
  import { onMount } from 'svelte';
  import { cart, removeFromCart, updateQuantity, cartSubtotal } from '~/lib/cart';

  let open = $state(false);
  let items = $state([]);
  let loading = $state(false);

  onMount(() => {
    const unsub = cart.subscribe((v) => (items = v));
    const handler = () => (open = true);
    window.addEventListener('cart:open', handler);
    return () => {
      unsub();
      window.removeEventListener('cart:open', handler);
    };
  });

  const subtotal = $derived(cartSubtotal(items));

  async function checkout() {
    if (items.length === 0) return;
    loading = true;
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            stripePriceId: i.stripePriceId,
            quantity: i.quantity,
          })),
        }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      alert('Checkout unavailable at the moment. Please try again.');
      loading = false;
    }
  }
</script>

{#if open}
  <div
    class="fixed inset-0 bg-black/70 z-50"
    onclick={() => (open = false)}
    role="presentation"
  ></div>
  <aside
    class="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[color:var(--color-ink-soft)] z-50 border-l border-[color:var(--color-gilt-aged)]/40 flex flex-col"
    aria-label="Shopping cart"
  >
    <div class="flex items-center justify-between p-6 border-b border-[color:var(--color-gilt-aged)]/30">
      <h2 class="font-[family-name:var(--font-display)] text-2xl">The Satchel</h2>
      <button onclick={() => (open = false)} class="text-[color:var(--color-bone-dim)] hover:text-[color:var(--color-bone)]" aria-label="Close cart">&times;</button>
    </div>

    <div class="flex-1 overflow-y-auto p-6 space-y-4">
      {#if items.length === 0}
        <p class="italic text-[color:var(--color-bone-dim)]">The satchel is empty. A troubling lightness.</p>
      {:else}
        {#each items as item (item.slug)}
          <div class="flex gap-4 pb-4 border-b border-[color:var(--color-gilt-aged)]/20">
            <img src={item.image} alt={item.name} class="w-16 h-20 object-cover" />
            <div class="flex-1">
              <p class="font-[family-name:var(--font-display)] text-lg leading-tight">{item.name}</p>
              <p class="text-sm text-[color:var(--color-gilt)] mt-1">${item.priceUsd.toFixed(2)}</p>
              <div class="flex items-center gap-2 mt-2 text-sm">
                <button onclick={() => updateQuantity(item.slug, item.quantity - 1)} class="px-2 border border-[color:var(--color-gilt-aged)]/40">−</button>
                <span>{item.quantity}</span>
                <button onclick={() => updateQuantity(item.slug, item.quantity + 1)} class="px-2 border border-[color:var(--color-gilt-aged)]/40">+</button>
                <button onclick={() => removeFromCart(item.slug)} class="ml-auto text-xs text-[color:var(--color-oxblood)] hover:text-[color:var(--color-bone)]">Remove</button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>

    {#if items.length > 0}
      <div class="p-6 border-t border-[color:var(--color-gilt-aged)]/30 space-y-3">
        <div class="flex justify-between text-sm">
          <span class="eyebrow">Subtotal</span>
          <span class="price">${subtotal.toFixed(2)}</span>
        </div>
        <p class="text-xs text-[color:var(--color-bone-dim)]">Tax and shipping calculated at checkout.</p>
        <button onclick={checkout} disabled={loading} class="btn btn-primary w-full">
          {loading ? 'Summoning…' : 'Proceed to Checkout'}
        </button>
      </div>
    {/if}
  </aside>
{/if}
