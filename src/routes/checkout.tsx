import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";

import { formatAUD } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | Aurelle Fine Jewellery" },
      {
        name: "description",
        content:
          "Complete your Aurelle order with secure card payment. Australian dollars, GST included, free insured delivery Australia-wide.",
      },
      { property: "og:title", content: "Secure Checkout | Aurelle" },
      { property: "og:description", content: "Secure card payment in AUD, GST included." },
    ],
  }),
  component: CheckoutPage,
});

const inputClass =
  "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";

function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <h1 className="text-[clamp(2.5rem,7vw,4rem)] leading-[0.95]">Checkout</h1>
      <p className="mt-4 max-w-lg text-sm text-muted-foreground">
        Everything is priced in Australian dollars with GST included. Your order is insured from our
        Fitzroy studio to your door.
      </p>

      {lines.length === 0 ? (
        <div className="mt-10 border-t border-border pt-10">
          <p className="text-sm text-muted-foreground">Your bag is empty.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-background uppercase"
          >
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <form
            className="space-y-10"
            onSubmit={(e) => {
              e.preventDefault();
              setNotice(
                "Card payment isn't switched on yet — connect Stripe and this button will open a secure Stripe checkout for the full bag.",
              );
            }}
          >
            <section>
              <h2 className="eyebrow text-muted-foreground">Contact</h2>
              <div className="mt-4 grid gap-3">
                <input className={inputClass} type="email" required placeholder="Email address" />
                <input className={inputClass} type="tel" placeholder="Mobile (for delivery SMS)" />
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-muted-foreground">Delivery address</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input className={inputClass} required placeholder="First name" />
                <input className={inputClass} required placeholder="Surname" />
                <input
                  className={`${inputClass} sm:col-span-2`}
                  required
                  placeholder="Street address"
                />
                <input className={inputClass} placeholder="Apartment / unit (optional)" />
                <input className={inputClass} required placeholder="Suburb" />
                <select className={inputClass} required defaultValue="VIC">
                  <option value="ACT">ACT</option>
                  <option value="NSW">NSW</option>
                  <option value="NT">NT</option>
                  <option value="QLD">QLD</option>
                  <option value="SA">SA</option>
                  <option value="TAS">TAS</option>
                  <option value="VIC">VIC</option>
                  <option value="WA">WA</option>
                </select>
                <input className={inputClass} required placeholder="Postcode" inputMode="numeric" />
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-muted-foreground">Payment</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Card details are captured on Stripe's secure hosted checkout — we never see or store
                your card number.
              </p>
              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center gap-2 bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-90"
              >
                <Lock className="h-3.5 w-3.5" />
                Pay {formatAUD(subtotal)} securely
              </button>
              {notice && (
                <p className="mt-4 border border-border bg-shell p-4 text-xs leading-relaxed text-muted-foreground">
                  {notice}
                </p>
              )}
            </section>
          </form>

          <aside className="h-fit border border-border bg-shell p-7 lg:sticky lg:top-28">
            <h2 className="eyebrow text-muted-foreground">Your order</h2>
            <ul className="mt-6 space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    className="h-20 w-16 rounded-sm bg-sand object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{line.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {line.variantLabel} · Qty {line.qty}
                    </p>
                  </div>
                  <p className="text-sm whitespace-nowrap">{formatAUD(line.price * line.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
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
          </aside>
        </div>
      )}
    </div>
  );
}
