import Link from "next/link";
import { LogMark } from "@/components/log-mark";
import { fullAddress, nav, site, telHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest text-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <LogMark className="h-10 w-10" />
            <p className="display text-3xl">{site.shortName}</p>
          </div>
          <p className="mt-5 max-w-sm text-paper/70">
            Saw mill and furniture workshop. Timber sawn to size, wooden goods
            for the home, and furniture built to order.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label text-fog">Site</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-paper/85 underline-offset-4 hover:text-paper hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-fog">Find us</p>
          <address className="mt-4 space-y-2.5 text-paper/85 not-italic">
            <p>{fullAddress}</p>
            <p>
              <a
                href={telHref}
                className="underline-offset-4 hover:text-paper hover:underline"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="underline-offset-4 hover:text-paper hover:underline"
              >
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-paper/55 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="label text-[0.68rem]">
            {site.address.district} · {site.address.province} ·{" "}
            {site.address.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
