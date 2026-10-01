// Single source of truth for business details. Edit here and the whole site
// (header, footer, contact page, SEO metadata, structured data) updates.

// Resolves to the business's own Google Maps listing.
const mapsQuery = encodeURIComponent(
  "Bhadrakshi Saw Mill And Furniture Industry, Lalmatiya, Lumbini Province",
);

export const site = {
  name: "Bhadrakshi Saw Mill & Furniture Industry",
  shortName: "Bhadrakshi",
  tagline: "Saw Mill & Furniture Industry",
  description:
    "Saw mill and furniture workshop in Masuriya, Dang. We saw timber to size, sell ready-made wooden goods, and build beds, chairs and household furniture to order.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  address: {
    line: "masuriya-3",
    district: "Dang",
    province: "Lumbini Province",
    country: "Nepal",
    countryCode: "NP",
  },

  phone: "+977 981-0826294",
  email: "bhadrakshifurniture@gmail.com",
  // WhatsApp number in international format, digits only (e.g. "97798XXXXXXXX").
  // Leave empty to hide the WhatsApp button.
  whatsapp: "" as string,
  // TODO: confirm opening hours — these are placeholders.
  hours: [
    { days: "Sunday – Friday", time: "8:00 am – 6:00 pm" },
    { days: "Saturday", time: "Closed" },
  ],

  // Google Maps plus code for the yard.
  plusCode: "RPV3+7P Lalmatiya",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`,
} as const;

export const fullAddress = `${site.address.line}, ${site.address.district}, ${site.address.province}, ${site.address.country}`;

export const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;
