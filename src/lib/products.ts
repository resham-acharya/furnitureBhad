// Catalogue data. Sizes are typical ones shown for reference — everything is
// made or cut to the customer's measurements. Add a product by adding an
// entry here; pages, sitemap and the enquiry form pick it up automatically.

export type CategoryId = "furniture" | "household" | "timber";

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  {
    id: "furniture",
    label: "Furniture",
    blurb: "Beds, chairs, tables and storage, built to order.",
  },
  {
    id: "household",
    label: "Household items",
    blurb: "Everyday wooden goods for the kitchen and home.",
  },
  {
    id: "timber",
    label: "Timber & joinery",
    blurb: "Sawn timber and frame stock, cut to your list.",
  },
];

export type DrawingKind =
  | "double-bed"
  | "single-bed"
  | "chair"
  | "table"
  | "wardrobe"
  | "stool"
  | "chopping-board"
  | "chauka-belna"
  | "shelf"
  | "planks"
  | "beams"
  | "door-frame";

export type Product = {
  slug: string;
  name: string;
  localName?: string;
  category: CategoryId;
  drawing: DrawingKind;
  summary: string;
  description: string;
  /** Label printed on the drawing's dimension line. */
  dimension: string;
  specs: { label: string; value: string }[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "double-bed",
    name: "Double bed",
    category: "furniture",
    drawing: "double-bed",
    summary: "A solid timber bed frame with a slatted headboard.",
    description:
      "A sturdy bed frame with a slatted headboard, side rails and a low footboard. Tell us your mattress size and the headboard height you want and we build the frame around it.",
    dimension: "6 ft 6 in",
    specs: [
      { label: "Typical size", value: "5 × 6.5 ft" },
      { label: "Headboard", value: "Slatted or plain panel" },
      { label: "Made", value: "To order" },
    ],
    featured: true,
  },
  {
    slug: "single-bed",
    name: "Single bed",
    category: "furniture",
    drawing: "single-bed",
    summary: "A compact bed frame for one, built to your mattress.",
    description:
      "A simple, strong single bed with a plain headboard. A good fit for children's rooms, hostels and guest rooms — order one or a matching set.",
    dimension: "6 ft 6 in",
    specs: [
      { label: "Typical size", value: "3 × 6.5 ft" },
      { label: "Headboard", value: "Plain panel" },
      { label: "Made", value: "To order, singly or in sets" },
    ],
  },
  {
    slug: "dining-chair",
    name: "Dining chair",
    category: "furniture",
    drawing: "chair",
    summary: "A ladder-back chair with a flat wooden seat.",
    description:
      "A ladder-back chair with three back slats, a flat seat and a front stretcher. Order them singly or as a set to go with a table.",
    dimension: "1 ft 6 in",
    specs: [
      { label: "Seat height", value: "About 18 in" },
      { label: "Back", value: "Three slats" },
      { label: "Made", value: "To order, singly or in sets" },
    ],
    featured: true,
  },
  {
    slug: "dining-table",
    name: "Dining table",
    category: "furniture",
    drawing: "table",
    summary: "A four-leg table sized for your family and your room.",
    description:
      "A plain, solid table with a plank top, apron and four square legs. We size the top to the number of people you need to seat and the space you have.",
    dimension: "4 ft",
    specs: [
      { label: "Typical size", value: "4 × 2.5 ft (seats four)" },
      { label: "Height", value: "About 30 in" },
      { label: "Made", value: "To order" },
    ],
    featured: true,
  },
  {
    slug: "wardrobe",
    name: "Wardrobe",
    localName: "Daraz",
    category: "furniture",
    drawing: "wardrobe",
    summary: "A three-door wardrobe with shelves and hanging space.",
    description:
      "A freestanding wardrobe with panelled doors. The number of doors, shelves and the hanging space inside are laid out to suit what you need to store.",
    dimension: "4 ft 6 in",
    specs: [
      { label: "Typical size", value: "4.5 ft wide × 6.5 ft high" },
      { label: "Doors", value: "Two or three" },
      { label: "Made", value: "To order" },
    ],
  },
  {
    slug: "low-stool",
    name: "Low stool",
    localName: "Pirka",
    category: "household",
    drawing: "stool",
    summary: "The everyday low seat for the kitchen and courtyard.",
    description:
      "A low wooden stool for sitting at floor level — in the kitchen, by the fire or out in the courtyard. Small, tough and easy to move around.",
    dimension: "1 ft 2 in",
    specs: [
      { label: "Typical size", value: "14 in wide × 6 in high" },
      { label: "Use", value: "Kitchen, courtyard, puja room" },
    ],
    featured: true,
  },
  {
    slug: "chopping-board",
    name: "Chopping board",
    localName: "Achano",
    category: "household",
    drawing: "chopping-board",
    summary: "A thick board cut from a single piece of timber.",
    description:
      "A heavy chopping board cut from one piece of timber, with a hanging hole at one corner. Thick enough to take years of daily kitchen work.",
    dimension: "1 ft 4 in",
    specs: [
      { label: "Typical size", value: "16 × 10 in" },
      { label: "Use", value: "Kitchen" },
    ],
  },
  {
    slug: "chauka-belna",
    name: "Rolling board & pin",
    localName: "Chauka-belna",
    category: "household",
    drawing: "chauka-belna",
    summary: "A round rolling board and pin for roti.",
    description:
      "A round rolling board with its matching pin for making roti — turned and sanded smooth so the dough doesn't catch.",
    dimension: "10 in",
    specs: [
      { label: "Board", value: "About 10 in across" },
      { label: "Pin", value: "About 14 in long" },
    ],
  },
  {
    slug: "wall-shelf",
    name: "Wall shelf",
    category: "household",
    drawing: "shelf",
    summary: "A two-tier shelf for the kitchen, shop or puja corner.",
    description:
      "A simple two-tier shelf with side supports. Use it for kitchen jars, shop stock or a puja corner — we cut the length to fit your wall.",
    dimension: "3 ft",
    specs: [
      { label: "Typical size", value: "3 ft long, two tiers" },
      { label: "Made", value: "To your wall length" },
    ],
  },
  {
    slug: "sawn-planks",
    name: "Sawn planks",
    category: "timber",
    drawing: "planks",
    summary: "Planks and boards sawn to your thickness and width.",
    description:
      "Logs sawn into planks and boards in the thickness, width and length you ask for. Bring a cut list or tell us the job and we'll work out the sizes with you.",
    dimension: "1 in × 6 in",
    specs: [
      { label: "Thickness", value: "Cut to your list" },
      { label: "Use", value: "Furniture, flooring, shuttering, shelving" },
    ],
  },
  {
    slug: "beams-and-battens",
    name: "Beams & battens",
    category: "timber",
    drawing: "beams",
    summary: "Square-sawn sections for roofs and structure.",
    description:
      "Heavier square and rectangular sections for beams, rafters and purlins, along with smaller battens — sawn to the section and length your building needs.",
    dimension: "4 in × 4 in",
    specs: [
      { label: "Sections", value: "Cut to your list" },
      { label: "Use", value: "Roofing, structure, framing" },
    ],
  },
  {
    slug: "door-and-window-frames",
    name: "Door & window frames",
    localName: "Chaukos",
    category: "timber",
    drawing: "door-frame",
    summary: "Frames made to the openings in your building.",
    description:
      "Door and window frames made to the size of your openings. Give us the measurements from your site, or your builder's drawing, and we cut and join the frames to match.",
    dimension: "3 ft",
    specs: [
      { label: "Typical door", value: "3 × 6.5 ft opening" },
      { label: "Made", value: "To your site measurements" },
    ],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}
