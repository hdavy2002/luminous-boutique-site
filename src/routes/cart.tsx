import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";

import { formatAUD } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | Aurelle Fine Jewellery" },
      {
        name: "description",
        content:
          "Review the pieces in your Aurelle bag. AUD pricing with GST included and free insured delivery Australia-wide.",
      },
      { property: "og:title", content: "Your Bag | Aurelle" },
      { property: "og:description", content: "Review your Aurelle fine jewellery selection." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <h1 className="text-[clamp(2.5rem,7vw,4rem)] leading-[0.95]">Your bag</h1>

      {lines.length === 0 ? (
        <div className="mt-10 border-t border-border pt-10">
          <p className="text-sm text-muted-foreground">There's nothing in your bag yet.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-background uppercase"
          >
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-border border-t border-border">
            {lines.map((line) => (
              <div key={line.key} className="flex gap-5 py-6">
                <Link to="/product/$slug" params={{ slug: line.slug }} className="shrink-0">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    className="h-36 w-28 rounded-sm bg-sand object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        to="/product/$slug"
                        params={{ slug: line.slug }}
                        className="text-base"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">{line.variantLabel}</p>
                    </div>
                    <p className="text-sm whitespace-nowrap">
                      {formatAUD(line.price * line.qty)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        className="px-3 py-2"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(line.key, line.qty - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs">{line.qty}</span>
                      <button
                        type="button"
                        className="px-3 py-2"
                        aria-label="Increase quantity"
                        onClick={() => setQty(line.key, line.qty + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      className="text-xs text-muted-foreground underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit border border-border bg-shell p-7 lg:sticky lg:top-28">
            <h2 className="eyebrow text-muted-foreground">Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatAUD(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insured delivery</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span>Total (incl. GST)</span>
                <span className="font-display text-xl">{formatAUD(subtotal)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-7 flex w-full items-center justify-center bg-foreground px-6 py-4 text-xs tracking-[0.18em] text-background uppercase"
            >
              Continue to checkout
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              All prices in Australian dollars. Duties are covered for international orders.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
