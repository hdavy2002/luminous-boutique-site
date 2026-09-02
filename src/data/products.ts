import necklaceImg from "@/assets/product-necklace.jpg";
import ringImg from "@/assets/product-ring.jpg";
import earringsImg from "@/assets/product-earrings.jpg";
import braceletImg from "@/assets/product-bracelet.jpg";

export type Variant = {
  id: string;
  label: string;
  priceDelta: number;
};

export type Product = {
  slug: string;
  name: string;
  category: "necklaces" | "rings" | "earrings" | "bracelets";
  price: number;
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  variantLabel: string;
  variants: Variant[];
  editorial?: boolean;
};

export const categories = [
  { slug: "necklaces", name: "Necklaces", blurb: "Chains, pendants and everyday heirlooms." },
  { slug: "rings", name: "Rings", blurb: "Sculptural bands cast in solid gold." },
  { slug: "earrings", name: "Earrings", blurb: "From quiet studs to long, moving light." },
  { slug: "bracelets", name: "Bracelets", blurb: "Weighted links made to be worn daily." },
] as const;

const metalVariants: Variant[] = [
  { id: "yellow", label: "18ct Yellow Gold", priceDelta: 0 },
  { id: "white", label: "18ct White Gold", priceDelta: 180 },
  { id: "rose", label: "18ct Rose Gold", priceDelta: 120 },
];

export const products: Product[] = [
  {
    slug: "solstice-solitaire-pendant",
    name: "Solstice Solitaire Pendant",
    category: "necklaces",
    price: 2480,
    image: necklaceImg,
    gallery: [necklaceImg, braceletImg, ringImg],
    tagline: "One stone. All the light in the room.",
    description:
      "A single brilliant-cut lab-grown diamond suspended on a fine belcher chain, hand-finished in our Melbourne studio. Made to sit just below the collarbone and never come off.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Stone", value: "0.40ct lab-grown diamond, F/VS" },
      { label: "Chain", value: "45cm fine belcher, adjustable to 42cm" },
      { label: "Made in", value: "Melbourne, Australia" },
      { label: "Warranty", value: "Lifetime craftsmanship guarantee" },
    ],
    variantLabel: "Metal",
    variants: metalVariants,
    editorial: true,
  },
  {
    slug: "bondi-signet-ring",
    name: "Bondi Signet",
    category: "rings",
    price: 3150,
    image: ringImg,
    gallery: [ringImg, necklaceImg, earringsImg],
    tagline: "A modern signet with a champagne heart.",
    description:
      "Substantial, softly domed and set with a champagne stone that catches late afternoon sun. Cast solid, never plated, and polished by hand over three days.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Stone", value: "1.10ct champagne sapphire" },
      { label: "Face", value: "13mm cushion" },
      { label: "Sizing", value: "Complimentary first resize" },
      { label: "Made in", value: "Melbourne, Australia" },
    ],
    variantLabel: "Ring size",
    variants: [
      { id: "l", label: "Size L", priceDelta: 0 },
      { id: "n", label: "Size N", priceDelta: 0 },
      { id: "p", label: "Size P", priceDelta: 0 },
      { id: "r", label: "Size R", priceDelta: 60 },
    ],
    editorial: true,
  },
  {
    slug: "long-water-drop-earrings",
    name: "Long Water Drops",
    category: "earrings",
    price: 1890,
    image: earringsImg,
    gallery: [earringsImg, necklaceImg, braceletImg],
    tagline: "Movement, from the first step onwards.",
    description:
      "Elongated open teardrops pavé-set along one edge so the light travels as you move. Weightless on the ear despite the length.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Stones", value: "86 lab-grown diamonds, 0.52ct total" },
      { label: "Drop", value: "42mm" },
      { label: "Fitting", value: "Butterfly backs, posts included" },
      { label: "Made in", value: "Melbourne, Australia" },
    ],
    variantLabel: "Metal",
    variants: metalVariants,
  },
  {
    slug: "harbour-link-bracelet",
    name: "Harbour Link Bracelet",
    category: "bracelets",
    price: 2260,
    image: braceletImg,
    gallery: [braceletImg, ringImg, necklaceImg],
    tagline: "Brushed gold with real weight to it.",
    description:
      "Elongated paperclip links in a soft brushed finish, finished with an engraved tag. Heavy enough to feel considered, light enough to forget you're wearing it.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Finish", value: "Hand-brushed matte" },
      { label: "Length", value: "18cm with 2cm extender" },
      { label: "Engraving", value: "Two initials, complimentary" },
      { label: "Made in", value: "Melbourne, Australia" },
    ],
    variantLabel: "Length",
    variants: [
      { id: "17", label: "17cm", priceDelta: 0 },
      { id: "18", label: "18cm", priceDelta: 0 },
      { id: "19", label: "19cm", priceDelta: 90 },
    ],
  },
  {
    slug: "meridian-fine-chain",
    name: "Meridian Fine Chain",
    category: "necklaces",
    price: 1120,
    image: necklaceImg,
    gallery: [necklaceImg, earringsImg],
    tagline: "The layering piece everything else hangs off.",
    description:
      "Our finest belcher chain, built to be stacked. Solid gold links, laser-welded, tested to hold a pendant twice its weight.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Gauge", value: "1.1mm" },
      { label: "Length", value: "40cm / 45cm / 50cm" },
      { label: "Clasp", value: "Solid gold lobster" },
      { label: "Made in", value: "Melbourne, Australia" },
    ],
    variantLabel: "Length",
    variants: [
      { id: "40", label: "40cm", priceDelta: 0 },
      { id: "45", label: "45cm", priceDelta: 70 },
      { id: "50", label: "50cm", priceDelta: 140 },
    ],
  },
  {
    slug: "pia-stacking-band",
    name: "Pia Stacking Band",
    category: "rings",
    price: 890,
    image: ringImg,
    gallery: [ringImg, braceletImg],
    tagline: "Made to be worn three at a time.",
    description:
      "A slim, gently squared band with a high polish. Buy one, then quietly collect the rest.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Width", value: "2.1mm" },
      { label: "Profile", value: "Soft square" },
      { label: "Sizing", value: "Complimentary first resize" },
      { label: "Made in", value: "Melbourne, Australia" },
    ],
    variantLabel: "Ring size",
    variants: [
      { id: "l", label: "Size L", priceDelta: 0 },
      { id: "n", label: "Size N", priceDelta: 0 },
      { id: "p", label: "Size P", priceDelta: 0 },
    ],
  },
  {
    slug: "aria-diamond-studs",
    name: "Aria Diamond Studs",
    category: "earrings",
    price: 1450,
    image: earringsImg,
    gallery: [earringsImg, ringImg],
    tagline: "The pair you'll never take out.",
    description:
      "Four-claw studs set with matched lab-grown brilliants. Low-set so they sit flush and disappear under a pillow.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Stones", value: "0.50ct total, F/VS matched pair" },
      { label: "Setting", value: "Low four-claw" },
      { label: "Fitting", value: "Screw backs" },
      { label: "Made in", value: "Melbourne, Australia" },
    ],
    variantLabel: "Metal",
    variants: metalVariants,
  },
  {
    slug: "esker-cuff",
    name: "Esker Cuff",
    category: "bracelets",
    price: 3480,
    image: braceletImg,
    gallery: [braceletImg, necklaceImg],
    tagline: "A single unbroken line of gold.",
    description:
      "Formed from one length of solid gold, tapered by hand and left open at the back so it slips on without a clasp.",
    specs: [
      { label: "Metal", value: "18ct solid gold, recycled" },
      { label: "Width", value: "6mm tapering to 3mm" },
      { label: "Fit", value: "Open back, adjustable" },
      { label: "Weight", value: "21g" },
      { label: "Made in", value: "Melbourne, Australia" },
    ],
    variantLabel: "Size",
    variants: [
      { id: "s", label: "Small", priceDelta: 0 },
      { id: "m", label: "Medium", priceDelta: 0 },
      { id: "l", label: "Large", priceDelta: 160 },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatAUD(cents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}
