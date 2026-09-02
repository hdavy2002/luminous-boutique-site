import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

import { categories } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/shop", label: "Shop all" },
  { to: "/shop/$category", params: { category: "necklaces" }, label: "Necklaces" },
  { to: "/shop/$category", params: { category: "rings" }, label: "Rings" },
  { to: "/shop/$category", params: { category: "earrings" }, label: "Earrings" },
  { to: "/shop/$category", params: { category: "bracelets" }, label: "Bracelets" },
  { to: "/about", label: "Our studio" },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/85 backdrop-blur-md transition-shadow",
        scrolled && "border-b border-border",
      )}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 md:px-8 lg:py-5">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenu(true)}
            className="p-1 text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.slice(0, 5).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.8rem] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="justify-self-center text-center">
          <span className="font-display text-2xl tracking-[0.28em] uppercase md:text-[1.6rem]">
            Aurelle
          </span>
          <span className="block text-[0.5rem] tracking-[0.4em] text-muted-foreground uppercase">
            Melbourne
          </span>
        </Link>

        <div className="flex items-center gap-5 justify-self-end">
          <Link
            to="/about"
            className="hidden text-[0.8rem] tracking-wide text-muted-foreground transition-colors hover:text-foreground lg:block"
          >
            Our studio
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 text-[0.8rem] tracking-wide"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            <span className="hidden sm:inline">Bag</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[0.6rem] text-background sm:-right-8">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-display text-xl tracking-[0.28em] uppercase">Aurelle</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenu(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-5 pt-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenu(false)}
                className="border-b border-border py-5 font-display text-3xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
