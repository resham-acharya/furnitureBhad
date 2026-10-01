import { Suspense } from "react";
import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm, EnquiryFormFromUrl } from "@/components/enquiry-form";
import { MapEmbed } from "@/components/map-embed";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { fullAddress, site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & quotes",
  description: `Ask ${site.name} for a quote on timber, wooden goods or made-to-order furniture. Visit the yard at ${fullAddress}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" titleLines={["Tell us what", "you need."]}>
        <p>
          Send the item, the size and the quantity. We will call you back with
          a price and how long it will take.
        </p>
      </PageHero>

      <section className="py-14 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <h2 className="display text-4xl md:text-5xl">Ask for a quote</h2>
            <div className="mt-8">
              <Suspense fallback={<EnquiryForm />}>
                <EnquiryFormFromUrl />
              </Suspense>
            </div>
          </div>

          <Reveal>
            <aside className="lg:sticky lg:top-28">
              <h2 className="display text-4xl md:text-5xl">Or reach us directly</h2>
              <dl className="mt-8 border-t-2 border-ink">
                <div className="border-b border-ink/20 py-5">
                  <dt className="label text-moss">Phone</dt>
                  <dd className="mt-1.5 text-xl font-semibold">
                    <a href={telHref} className="underline-offset-4 hover:underline">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-ink/20 py-5">
                  <dt className="label text-moss">Email</dt>
                  <dd className="mt-1.5 text-lg">
                    <a
                      href={`mailto:${site.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-ink/20 py-5">
                  <dt className="label text-moss">Yard</dt>
                  <dd className="mt-1.5 text-lg">{fullAddress}</dd>
                </div>
                <div className="border-b border-ink/20 py-5">
                  <dt className="label text-moss">Hours</dt>
                  <dd className="mt-1.5 space-y-1 text-lg">
                    {site.hours.map((row) => (
                      <p key={row.days} className="flex justify-between gap-6">
                        <span>{row.days}</span>
                        <span className="text-moss">{row.time}</span>
                      </p>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={telHref} className="btn btn-ghost-dark">
                  <Phone size={16} aria-hidden="true" />
                  Call
                </a>
                {site.whatsapp && (
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-dark"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp
                  </a>
                )}
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost-dark"
                >
                  <MapPin size={16} aria-hidden="true" />
                  Directions
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <h2 className="display text-4xl md:text-5xl">Find the yard</h2>
          <div className="mt-8">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
