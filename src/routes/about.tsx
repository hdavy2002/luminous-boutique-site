import { createFileRoute, Link } from "@tanstack/react-router";

import braceletImg from "@/assets/product-bracelet.jpg";
import ringImg from "@/assets/product-ring.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Inside the Fitzroy Studio | Aurelle Fine Jewellery" },
      {
        name: "description",
        content:
          "Aurelle is a Melbourne fine jewellery studio casting solid recycled 18ct gold. Meet the makers, the materials and the lifetime guarantee behind every piece.",
      },
      { property: "og:title", content: "Inside the Fitzroy Studio | Aurelle" },
      {
        property: "og:description",
        content: "A Melbourne fine jewellery studio working in solid recycled 18ct gold.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow text-muted-foreground">Our studio</p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95]">
          Two benches, one street in Fitzroy.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Aurelle started in 2016 with a single bench above a bakery on Gertrude Street. We cast our
          own gold, set our own stones and finish every piece by hand — which is why the range stays
          small and the wait is sometimes a few days longer than you'd like.
        </p>
      </header>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <img
          src={ringImg}
          alt="A signet ring being hand-polished at the bench"
          loading="lazy"
          width={1200}
          height={1504}
          className="aspect-[4/5] w-full rounded-sm bg-sand object-cover"
        />
        <div className="flex flex-col justify-center gap-8">
          {[
            {
              title: "Solid, always",
              body: "Never plated, never filled. Every piece is solid recycled 18ct gold, so it can be resized, re-polished and passed on.",
            },
            {
              title: "Stones we can trace",
              body: "Lab-grown diamonds and Australian sapphires with full documentation. We'll tell you exactly where a stone came from.",
            },
            {
              title: "Kept for life",
              body: "Free cleaning and re-polishing forever, plus a complimentary first resize. Bring it in or post it — we cover return freight.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h2 className="text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-20 grid gap-8 border-t border-border pt-14 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] leading-tight">
            Come in for a coffee and a try-on.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            The studio is open Tuesday to Saturday by appointment. Try the full collection on, talk
            through a custom commission, or just watch someone set a stone for an hour.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-block bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-background uppercase"
          >
            Shop the collection
          </Link>
        </div>
        <img
          src={braceletImg}
          alt="Brushed gold link bracelet resting on the workbench"
          loading="lazy"
          width={1200}
          height={1504}
          className="aspect-[5/4] w-full rounded-sm bg-sand object-cover"
        />
      </section>
    </div>
  );
}
