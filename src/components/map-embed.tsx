import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

// Google Maps embed of the business listing. Lazy-loaded, so it costs
// nothing until the visitor scrolls near it.
export function MapEmbed() {
  return (
    <figure>
      <div className="overflow-hidden rounded-[2px] border border-ink/20 bg-paper-deep">
        <iframe
          src={site.mapEmbedUrl}
          title={`Map showing ${site.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-[340px] w-full border-0 md:h-[460px]"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span className="label text-moss">Plus code · {site.plusCode}</span>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
        >
          Open in Google Maps
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
