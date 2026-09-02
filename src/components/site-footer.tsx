import { Link } from "@tanstack/react-router";

import { categories } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-shell">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-2xl tracking-[0.28em] uppercase">Aurelle</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Solid gold fine jewellery, designed and hand-finished in Melbourne. Made for a lifetime
              of wear, not a season.
            </p>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">Shop</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/shop/$category"
                    params={{ category: c.slug }}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">Care</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>Free insured shipping Australia-wide</li>
              <li>30-day returns, no questions</li>
              <li>Lifetime craftsmanship guarantee</li>
              <li>Complimentary resizing &amp; cleaning</li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-muted-foreground">Studio</h3>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Level 2, 118 Gertrude Street
              <br />
              Fitzroy VIC 3065
              <br />
              By appointment, Tue–Sat
            </p>
            <p className="mt-4 text-sm text-muted-foreground">hello@aurelle.com.au</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Aurelle Fine Jewellery. All prices in AUD, GST included.</p>
          <p>Made on Wurundjeri Country.</p>
        </div>
      </div>
    </footer>
  );
}
