import { createFileRoute, Link } from "@tanstack/react-router";

import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/data/products";
import necklaceImg from "@/assets/product-necklace.jpg";
import earringsImg from "@/assets/product-earrings.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelle | Solid 18ct Gold Fine Jewellery, Made in Melbourne" },
      {
        name: "description",
        content:
          "Australian fine jewellery cast in solid recycled 18ct gold and hand-finished in Fitzroy. Necklaces, rings, earrings and bracelets in AUD with free insured delivery.",
      },
      { property: "og:title", content: "Aurelle | Solid 18ct Gold Fine Jewellery" },
      {
        property: "og:description",
        content:
          "Hand-finished fine jewellery from a Melbourne studio. Solid gold, traceable stones, lifetime guarantee.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.editorial);
  const rest = products.filter((p) => !p.editorial).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.02]">
            Start with one piece. Build the rest slowly.
          </h2>
          <Link
            to="/shop"
            className="border-b border-foreground pb-1 text-xs tracking-[0.18em] uppercase"
          >
            Shop all
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-7">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="group"
            >
              <div className="overflow-hidden rounded-sm bg-sand">
                <img
                  src={[necklaceImg, products[1]!.image, earringsImg, products[3]!.image][i]}
                  alt={c.name}
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-xl">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial feature */}
      <section className="border-y border-border bg-shell">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative">
            <img
              src={featured[0]!.image}
              alt={featured[0]!.name}
              loading="lazy"
              width={1200}
              height={1504}
              className="aspect-[4/5] w-full rounded-sm bg-sand object-cover"
            />
            <img
              src={featured[1]!.image}
              alt={featured[1]!.name}
              loading="lazy"
              className="absolute -right-3 -bottom-10 hidden w-[38%] rounded-sm bg-sand object-cover shadow-none float-slow sm:block"
            />
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">The Solstice edit</p>
            <h2 className="mt-5 text-[clamp(2.2rem,6vw,4rem)] leading-[0.98]">
              A stone, a chain, and nothing else in the way.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Our most-worn pieces share the same brief: no ornament, no noise, just proportion. Set
              by hand, checked twice, and finished with a polish that takes three days.
            </p>
            <div className="mt-9 grid max-w-md grid-cols-2 gap-6 border-t border-border pt-6">
              <div>
                <p className="font-display text-3xl">18ct</p>
                <p className="mt-1 text-xs text-muted-foreground">Solid recycled gold</p>
              </div>
              <div>
                <p className="font-display text-3xl">Lifetime</p>
                <p className="mt-1 text-xs text-muted-foreground">Craftsmanship guarantee</p>
              </div>
            </div>
            <Link
              to="/product/$slug"
              params={{ slug: featured[0]!.slug }}
              className="mt-9 inline-block bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-90"
            >
              View the pendant
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2rem,5vw,3.4rem)]">New in the studio</h2>
          <Link
            to="/shop"
            className="border-b border-foreground pb-1 text-xs tracking-[0.18em] uppercase"
          >
            See everything
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-7">
          {rest.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Promise strip */}
      <section className="mx-auto max-w-[1400px] px-5 pb-8 md:px-8">
        <div className="grid gap-8 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Free insured delivery", "Australia-wide, tracked and signed for."],
            ["30-day returns", "Change your mind, post it back on us."],
            ["Complimentary resizing", "First resize is always free."],
            ["Made in Melbourne", "Cast, set and polished in Fitzroy."],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="text-base">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
