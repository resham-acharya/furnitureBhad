import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductDrawing } from "@/components/product-drawing";
import { getCategory, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col focus-visible:outline-offset-4"
    >
      <div className="relative overflow-hidden rounded-[2px] bg-paper-deep [--drawing-bg:var(--color-paper-deep)]">
        <ProductDrawing
          kind={product.drawing}
          dimension={product.dimension}
          title={product.name}
          className="aspect-[240/184] w-full p-3 text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 right-3 grid h-9 w-9 translate-y-1 place-items-center rounded-[2px] bg-vermilion text-white opacity-0 transition duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="label text-moss">{getCategory(product.category).label}</p>
        <h3 className="display mt-1.5 text-[1.9rem]">
          {product.name}
          {product.localName && (
            <span className="ml-2 font-sans text-base font-medium tracking-normal text-moss normal-case">
              {product.localName}
            </span>
          )}
        </h3>
        <p className="mt-2 text-[0.98rem] text-moss">{product.summary}</p>
      </div>
    </Link>
  );
}
