import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { ProductDrawing } from "@/components/product-drawing";
import { Reveal } from "@/components/reveal";
import { getCategory, getProduct, products } from "@/lib/products";
import { site, telHref } from "@/lib/site";

// Only the products in the catalogue exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.summary} Made by ${site.name}, ${site.address.district}.`,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        label={
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2">
            <Link href="/products" className="underline-offset-4 hover:text-paper hover:underline">
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/products?category=${category.id}`}
              className="underline-offset-4 hover:text-paper hover:underline"
            >
              {category.label}
            </Link>
          </nav>
        }
        titleLines={[product.name]}
      >
        {product.localName && <p>Known locally as {product.localName}.</p>}
      </PageHero>

      <section className="py-14 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="rounded-[2px] bg-paper-deep p-4 [--drawing-bg:var(--color-paper-deep)] md:p-10 lg:sticky lg:top-28 lg:self-start">
            <ProductDrawing
              kind={product.drawing}
              dimension={product.dimension}
              title={product.name}
              className="w-full text-ink"
            />
          </div>

          <Reveal>
            <p className="text-xl md:text-2xl">{product.summary}</p>
            <p className="mt-5 text-lg text-moss">{product.description}</p>

            <dl className="mt-10 border-t-2 border-ink">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid gap-1 border-b border-ink/20 py-4 sm:grid-cols-[10rem_1fr]"
                >
                  <dt className="label pt-1 text-moss">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-moss">
              Sizes are typical, not fixed. Tell us the measurements you need
              and we will quote for those.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/contact?product=${product.slug}`}
                className="btn btn-primary"
              >
                Ask for a quote
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href={telHref} className="btn btn-ghost-dark">
                <Phone size={16} aria-hidden="true" />
                Call {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/15 py-16 md:py-24">
          <div className="container-page">
            <h2 className="display text-4xl md:text-5xl">
              More {category.label.toLowerCase()}
            </h2>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
