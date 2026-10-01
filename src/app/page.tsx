import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { ProcessSection } from "@/components/home/process-section";
import { ProductCard } from "@/components/product-card";
import { Reveal, RisingLines } from "@/components/reveal";
import { featuredProducts, products } from "@/lib/products";
import { fullAddress, site, telHref } from "@/lib/site";

const services = [
  {
    where: "At the saw mill",
    title: "Timber processing",
    body: "Logs sawn into planks, beams and battens, cut to the sizes on your list — for building work, joinery or your own carpenter.",
    items: ["Planks and boards", "Beams, rafters and battens", "Door and window frame stock"],
    href: "/products?category=timber",
    cta: "See timber & joinery",
  },
  {
    where: "At the yard",
    title: "Wooden goods",
    body: "Everyday wooden items for the kitchen and home, ready to take away from the yard.",
    items: ["Low stools (pirka)", "Chopping boards (achano)", "Rolling boards, shelves and more"],
    href: "/products?category=household",
    cta: "See household items",
  },
  {
    where: "In the workshop",
    title: "Furniture to order",
    body: "Beds, chairs, tables and wardrobes built to your measurements, so the piece fits the room it is going into.",
    items: ["Single and double beds", "Chairs and dining tables", "Wardrobes and storage"],
    href: "/products?category=furniture",
    cta: "See furniture",
  },
];

const orderSteps = [
  {
    title: "Tell us what you need",
    body: "The item, the size and how many. A rough sketch or a photo of something similar helps.",
  },
  {
    title: "We send a quote",
    body: "You get a price and the time it will take before any work starts.",
  },
  {
    title: "We build it",
    body: "Your order is cut and made at our workshop, and we let you know when it is ready.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section id="services" className="py-24 md:py-36">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-end">
            <div>
              <p className="label text-moss">What we do</p>
              <h2 className="display mt-3 text-[clamp(2.8rem,7vw,6rem)]">
                <RisingLines lines={["One yard,", "three kinds", "of work."]} onView />
              </h2>
            </div>
            <Reveal>
              <p className="max-w-xl text-lg text-moss md:pb-3 md:text-xl">
                The mill and the workshop are one business, so the timber in
                your furniture is sawn by the same people who build it.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.1}>
                <article className="flex h-full flex-col border-t-2 border-ink pt-6">
                  <p className="label text-vermilion-deep">{service.where}</p>
                  <h3 className="display mt-3 text-4xl">{service.title}</h3>
                  <p className="mt-4 text-moss">{service.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-3">
                        <span className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="group mt-8 inline-flex items-center gap-2 self-start border-b border-ink/30 pb-1 font-semibold transition-colors hover:border-vermilion hover:text-vermilion-deep md:mt-auto md:pt-8"
                  >
                    {service.cta}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section className="py-24 md:py-36">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-moss">From the workshop</p>
              <h2 className="display mt-3 text-[clamp(2.8rem,7vw,6rem)]">
                <RisingLines lines={["Made here."]} onView />
              </h2>
            </div>
            <Link href="/products" className="btn btn-ghost-dark">
              All {products.length} items
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-deep py-24 md:py-36">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="label text-moss">Made to order</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,5rem)]">
              <RisingLines lines={["Your size,", "not a standard", "one."]} onView />
            </h2>
            <Reveal>
              <p className="mt-6 max-w-md text-lg text-moss">
                Rooms, doorways and families come in different sizes. Give us
                the measurements and we build to them.
              </p>
              <Link href="/contact" className="btn btn-primary mt-8">
                Start an order
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <ol>
            {orderSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className="grid grid-cols-[2.75rem_1fr] gap-x-5 border-t border-ink/20 py-8 last:border-b md:grid-cols-[3.5rem_1fr] md:gap-x-8 md:py-10">
                  <span className="display text-6xl text-vermilion md:text-7xl">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="display text-3xl md:text-4xl">{step.title}</h3>
                    <p className="mt-3 max-w-md text-moss">{step.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="label text-moss">Visit</p>
            <h2 className="display mt-3 text-[clamp(2.8rem,6vw,5rem)]">
              <RisingLines lines={["Come and see", "the wood."]} onView />
            </h2>
            <Reveal>
              <p className="mt-6 max-w-md text-lg text-moss">
                The best way to choose timber is to look at it. Drop by the
                yard in Masuriya, or call ahead and tell us what you are
                looking for.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost-dark"
                >
                  <MapPin size={16} aria-hidden="true" />
                  Get directions
                </a>
                <a href={telHref} className="btn btn-ghost-dark">
                  <Phone size={16} aria-hidden="true" />
                  Call us
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <dl className="border-t-2 border-ink">
              <div className="grid gap-1 border-b border-ink/20 py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="label pt-1 text-moss">Address</dt>
                <dd className="text-lg">{fullAddress}</dd>
              </div>
              <div className="grid gap-1 border-b border-ink/20 py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="label pt-1 text-moss">Hours</dt>
                <dd className="space-y-1 text-lg">
                  {site.hours.map((row) => (
                    <p key={row.days} className="flex justify-between gap-6">
                      <span>{row.days}</span>
                      <span className="text-moss">{row.time}</span>
                    </p>
                  ))}
                </dd>
              </div>
              <div className="grid gap-1 border-b border-ink/20 py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="label pt-1 text-moss">Phone</dt>
                <dd className="text-lg">
                  <a href={telHref} className="underline-offset-4 hover:underline">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 border-b border-ink/20 py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="label pt-1 text-moss">Email</dt>
                <dd className="text-lg">
                  <a
                    href={`mailto:${site.email}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
