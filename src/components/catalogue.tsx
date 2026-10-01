"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ProductCard } from "@/components/product-card";
import { categories, products, type CategoryId } from "@/lib/products";

const ease = [0.16, 1, 0.3, 1] as const;

function isCategory(value: string | null): value is CategoryId {
  return categories.some((c) => c.id === value);
}

export function CatalogueGrid({ active }: { active: CategoryId | null }) {
  const visible = active ? products.filter((p) => p.category === active) : products;
  const filters = [
    { id: null, label: "Everything", count: products.length },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      count: products.filter((p) => p.category === c.id).length,
    })),
  ];

  // The filter lives in the URL so a filtered view can be shared or linked to.
  const select = (id: CategoryId | null) => {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("category", id);
    else url.searchParams.delete("category");
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2 border-b border-ink/20 pb-6"
      >
        {filters.map((filter) => {
          const selected = filter.id === active;
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={selected}
              onClick={() => select(filter.id)}
              className={`relative min-h-11 rounded-[2px] px-4 py-2 font-semibold transition-colors duration-300 ${
                selected ? "text-paper" : "text-ink hover:bg-ink/[0.07]"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-[2px] bg-ink"
                  transition={{ duration: 0.5, ease }}
                />
              )}
              <span className="relative">
                {filter.label}
                <span
                  className={`label ml-2 ${selected ? "text-fog" : "text-moss"}`}
                >
                  {filter.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-moss" aria-live="polite">
        {active
          ? categories.find((c) => c.id === active)?.blurb
          : "Timber, household goods and furniture — everything we make and sell."}
      </p>

      <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product) => (
            <motion.li
              key={product.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease }}
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}

export function Catalogue() {
  const category = useSearchParams().get("category");
  return <CatalogueGrid active={isCategory(category) ? category : null} />;
}
