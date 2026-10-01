import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-forest pt-28 pb-16 text-paper">
      <div className="container-page">
        <p className="label text-fog">Page not found</p>
        <h1 className="display mt-4 text-[clamp(3rem,9vw,7rem)]">
          Nothing on this shelf.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-paper/75">
          The page you were looking for has moved or never existed. The
          catalogue and the contact page are both still here.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/products" className="btn btn-primary">
            Browse products
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/" className="btn btn-ghost-light">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
