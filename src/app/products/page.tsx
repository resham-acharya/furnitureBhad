import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Catalogue, CatalogueGrid } from "@/components/catalogue";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Beds, chairs, tables, wardrobes, household wooden items, sawn timber and door and window frames — made and sold by Bhadrakshi Saw Mill & Furniture Industry in Dang.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero label="Products" titleLines={["What we make", "and sell."]}>
        <p>
          Sizes shown are typical ones. Everything is made or cut to your
          measurements, so ask for the size you actually need.
        </p>
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="container-page">
          {/* The fallback is the full, unfiltered catalogue, so the static HTML lists every product. */}
          <Suspense fallback={<CatalogueGrid active={null} />}>
            <Catalogue />
          </Suspense>
        </div>
      </section>

      <section className="bg-paper-deep py-16 md:py-20">
        <div className="container-page flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="display text-4xl md:text-5xl">
              Don&apos;t see what you need?
            </h2>
            <p className="mt-3 max-w-xl text-lg text-moss">
              If it is made of wood, ask. Describe it or send a sketch and we
              will tell you whether we can build it.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Ask us
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
