import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";

import { formatAUD } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal } = useCart();

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[60] bg-foreground/25 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-[61] flex h-dvh w-full max-w-[440px] flex-col bg-background transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="eyebrow text-muted-foreground">Your bag</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close bag">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-display text-3xl">Nothing in here yet.</p>
            <p className="text-sm text-muted-foreground">
              Start with a fine chain — everything else layers from there.
            </p>
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="mt-2 border-b border-foreground pb-1 text-sm tracking-wide"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((line) => (
                <div key={line.key} className="flex gap-4 py-5">
                  <Link
                    to="/product/$slug"
                    params={{ slug: line.slug }}
                    onClick={() => setOpen(false)}
                    className="shrink-0"
                  >
                    <img
                      src={line.image}
                      alt={line.name}
                      loading="lazy"
                      className="h-24 w-20 rounded-sm bg-sand object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm">{line.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{line.variantLabel}</p>
                      </div>
                      <p className="text-sm whitespace-nowrap">{formatAUD(line.price * line.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          className="px-2 py-1"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(line.key, line.qty - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs">{line.qty}</span>
                        <button
                          type="button"
                          className="px-2 py-1"
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

            <div className="border-t border-border px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl">{formatAUD(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Free insured shipping Australia-wide. Taxes included.
              </p>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="mt-5 flex w-full items-center justify-center bg-foreground px-6 py-4 text-sm tracking-[0.14em] text-background uppercase transition-opacity hover:opacity-90"
              >
                Checkout
              </Link>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="mt-3 block text-center text-xs tracking-wide text-muted-foreground underline underline-offset-4"
              >
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
