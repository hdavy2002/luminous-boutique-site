import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection not found | Aurelle" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.name} in Solid 18ct Gold | Aurelle`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.category.blurb} Hand-finished in Melbourne, priced in AUD with free insured delivery Australia-wide.` },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.blurb },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = products.filter((p) => p.category === category.slug);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow text-muted-foreground">Collection</p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95]">{category.name}</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{category.blurb}</p>
      </header>

      <nav className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/shop"
          className="border border-border px-5 py-2 text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:border-foreground hover:text-foreground"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/shop/$category"
            params={{ category: c.slug }}
            className="border border-border px-5 py-2 text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:border-foreground hover:text-foreground"
            activeProps={{ className: "border-foreground text-foreground" }}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
