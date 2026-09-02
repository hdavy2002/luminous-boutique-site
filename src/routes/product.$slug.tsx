import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { formatAUD, getProduct, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece not found | Aurelle" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — 18ct Gold | Aurelle`;
    const description = `${product.tagline} ${product.description.slice(0, 110)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]!.id);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;
  const price = product.price + variant.priceDelta;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-8 pb-16 md:px-8 md:pb-24">
      <nav className="text-xs text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          to="/shop/$category"
          params={{ category: product.category }}
          className="capitalize hover:text-foreground"
        >
          {product.category}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-sm bg-sand">
            <img
              key={active}
              src={product.gallery[active]}
              alt={`${product.name} — view ${active + 1}`}
              width={1200}
              height={1504}
              className="aspect-[4/5] w-full object-cover rise"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "w-20 overflow-hidden rounded-sm border bg-sand transition-colors md:w-24",
                  i === active ? "border-foreground" : "border-transparent hover:border-border",
                )}
              >
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-muted-foreground">{product.tagline}</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1]">{product.name}</h1>
            <p className="mt-4 text-lg">{formatAUD(price)}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="eyebrow text-muted-foreground">{product.variantLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      "border px-4 py-2.5 text-xs tracking-wide transition-colors",
                      v.id === variantId
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                    )}
                  >
                    {v.label}
                    {v.priceDelta > 0 && ` +${formatAUD(v.priceDelta)}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-stretch gap-3">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  className="px-3 py-3"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button
                  type="button"
                  className="px-3 py-3"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  add(
                    {
                      slug: product.slug,
                      name: product.name,
                      variantId: variant.id,
                      variantLabel: variant.label,
                      image: product.image,
                      price,
                    },
                    qty,
                  );
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="flex flex-1 items-center justify-center gap-2 bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-90"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to bag
                  </>
                ) : (
                  "Add to bag"
                )}
              </button>
            </div>

            <dl className="mt-10 divide-y divide-border border-t border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3.5 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 space-y-2 text-xs text-muted-foreground">
              <li>Free insured shipping Australia-wide, dispatched in 2–3 business days.</li>
              <li>30-day returns and a lifetime craftsmanship guarantee.</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-[clamp(1.8rem,4vw,2.6rem)]">Wears well with</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-7">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
