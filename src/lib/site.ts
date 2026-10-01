// Single source of truth for business details. Edit here and the whole site
// (header, footer, contact page, SEO metadata, structured data) updates.

export const site = {
  name: "Bhadrakshi Saw Mill & Furniture Industry",
  shortName: "Bhadrakshi",
  tagline: "Saw Mill & Furniture Industry",
  description:
    "Saw mill and furniture workshop in Masuriya, Dang. We saw timber to size, sell ready-made wooden goods, and build beds, chairs and household furniture to order.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  address: {
    line: "Masuriya-2",
    district: "Dang",
    province: "Lumbini Province",
    country: "Nepal",
    countryCode: "NP",
  },

  // TODO: replace these placeholders with the real contact details.
  phone: "+977 98XX-XXXXXX",
  email: "info@example.com",
  // WhatsApp number in international format, digits only (e.g. "97798XXXXXXXX").
  // Leave empty to hide the WhatsApp button.
  whatsapp: "" as string,
  hours: [
    { days: "Sunday – Friday", time: "8:00 am – 6:00 pm" },
    { days: "Saturday", time: "Closed" },
  ],

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Masuriya, Dang, Lumbini Province, Nepal"),
} as const;

export const fullAddress = `${site.address.line}, ${site.address.district}, ${site.address.province}, ${site.address.country}`;

export const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;
