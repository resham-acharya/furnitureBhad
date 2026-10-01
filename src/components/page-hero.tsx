import { RisingLines } from "@/components/reveal";

// Dark title band at the top of inner pages; the fixed header sits over it.
export function PageHero({
  label,
  titleLines,
  children,
}: {
  label: React.ReactNode;
  titleLines: string[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-forest pt-36 pb-14 text-paper md:pt-44 md:pb-20">
      <div className="container-page">
        <div className="label text-fog">{label}</div>
        <h1 className="display mt-4 text-[clamp(3rem,8vw,6.5rem)]">
          <RisingLines lines={titleLines} />
        </h1>
        {children && (
          <div className="mt-6 max-w-2xl text-lg text-paper/75">{children}</div>
        )}
      </div>
    </section>
  );
}
