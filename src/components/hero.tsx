import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import necklaceImg from "@/assets/product-necklace.jpg";
import ringImg from "@/assets/product-ring.jpg";
import earringsImg from "@/assets/product-earrings.jpg";
import braceletImg from "@/assets/product-bracelet.jpg";

const marquee = [
  "Solid 18ct gold",
  "Hand-finished in Melbourne",
  "Lab-grown diamonds",
  "Lifetime guarantee",
  "Free insured delivery",
];

export function Hero() {
  const [y, setY] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    const onMove = (e: MouseEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(${pointer.x * depth * 14}px, ${y * depth * -0.16 + pointer.y * depth * 10}px, 0)`,
  });

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute top-[12%] left-[6%] h-64 w-64 rounded-full bg-sand drift-slow"
          style={layer(0.5)}
        />
        <div
          className="absolute right-[8%] bottom-[14%] h-80 w-80 rounded-full bg-shell drift-slow"
          style={{ ...layer(0.35), animationDelay: "2s" }}
        />
        <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pt-16 pb-20 md:px-8 lg:min-h-[88vh] lg:grid-cols-12 lg:gap-6 lg:pt-14 lg:pb-24">
        {/* Copy */}
        <div className="relative z-20 lg:col-span-5">
          <p className="eyebrow rise text-muted-foreground">Melbourne · Est. 2016</p>
          <h1
            className="rise mt-5 text-[clamp(3rem,10vw,7rem)] leading-[0.92] tracking-[-0.03em]"
            style={{ animationDelay: "120ms" }}
          >
            Gold that
            <br />
            <span className="italic">keeps</span> going.
          </h1>
          <p
            className="rise mt-7 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            Fine jewellery cast in solid recycled 18ct gold and finished by hand in Fitzroy. No
            plating, no seasons, no fuss — just pieces you'll wear until they're heirlooms.
          </p>
          <div
            className="rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "340ms" }}
          >
            <Link
              to="/shop"
              className="bg-foreground px-8 py-4 text-xs tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-90"
            >
              Shop the collection
            </Link>
            <Link
              to="/about"
              className="border-b border-foreground pb-1 text-xs tracking-[0.18em] uppercase"
            >
              Inside the studio
            </Link>
          </div>
        </div>

        {/* Layered imagery */}
        <div className="relative z-10 h-[440px] sm:h-[560px] lg:col-span-7 lg:h-[640px]">
          <figure
            className="absolute top-[6%] left-[4%] w-[46%] overflow-hidden rounded-sm bg-sand sheen float-slow"
            style={{ ...layer(0.8), ["--tilt" as string]: "-1.5deg" }}
          >
            <img
              src={necklaceImg}
              alt="Solstice solitaire pendant in 18ct gold"
              width={1200}
              height={1504}
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>

          <figure
            className="absolute top-[24%] right-[3%] w-[42%] overflow-hidden rounded-sm bg-shell float-slow"
            style={{ ...layer(1.35), animationDelay: "1.2s", ["--tilt" as string]: "2deg" }}
          >
            <img
              src={ringImg}
              alt="Bondi signet ring with champagne sapphire"
              width={1200}
              height={1504}
              className="aspect-[3/4] w-full object-cover"
            />
          </figure>

          <figure
            className="absolute bottom-[2%] left-[22%] w-[30%] overflow-hidden rounded-sm bg-sand float-slow"
            style={{ ...layer(1.9), animationDelay: "0.6s", ["--tilt" as string]: "-3deg" }}
          >
            <img
              src={earringsImg}
              alt="Long water drop diamond earrings"
              width={1200}
              height={1504}
              className="aspect-square w-full object-cover"
            />
          </figure>

          <figure
            className="absolute top-[52%] left-[-2%] hidden w-[24%] overflow-hidden rounded-sm bg-shell float-slow sm:block"
            style={{ ...layer(2.4), animationDelay: "2.4s", ["--tilt" as string]: "3deg" }}
          >
            <img
              src={braceletImg}
              alt="Harbour link bracelet in brushed gold"
              width={1200}
              height={1504}
              className="aspect-square w-full object-cover"
            />
          </figure>

          <span
            className="absolute top-[16%] right-[46%] font-display text-[0.7rem] tracking-[0.3em] text-muted-foreground uppercase"
            style={layer(2.8)}
          >
            18ct
          </span>
          <span
            className="absolute right-[10%] bottom-[10%] font-display text-[0.7rem] tracking-[0.3em] text-muted-foreground uppercase"
            style={layer(2.2)}
          >
            Hand-set
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-border py-3">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((item, i) => (
            <span key={i} className="eyebrow text-muted-foreground">
              {item} <span className="ml-10 text-gold">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
