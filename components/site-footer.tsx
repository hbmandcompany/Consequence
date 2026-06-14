import Link from "next/link";
import { Mark } from "./mark";
import { getMainSiteUrl, getShopSectionUrl, getShopUrl } from "@/lib/urls";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink/10 mt-0">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3">
              <Mark className="w-7 h-7 text-ink" />
              <span className="font-display text-2xl tracking-tight">Consequence</span>
            </div>
            <p className="mt-6 max-w-md font-display text-2xl leading-[1.15] tracking-tight text-ink/80">
              Every arrangement, sale, split, and payout has consequences. We built the apparatus that lets you see them — from the DAW to the chain — at the speed they actually arrive.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <input
                placeholder="you@studio.com"
                className="flex-1 bg-transparent border-b border-ink/15 focus:border-ink/60 outline-none text-sm py-3 placeholder:text-ink/35"
              />
              <button className="text-[11px] tabular tracking-[0.18em] uppercase text-ink/70 hover:text-ink uline">
                Subscribe
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10">
              <FooterCol
                title="Surfaces"
                items={[
                  { label: "Shop", href: getShopUrl() },
                  { label: "Treasury", href: getMainSiteUrl("/treasury") },
                  { label: "Marketplace", href: getShopSectionUrl("market") },
                  { label: "Feed", href: getShopSectionUrl("feed") },
                  { label: "Wallet", href: getShopSectionUrl("wallet") },
                  { label: "Client login", href: "/login" },
                  { label: "Sign up", href: "/signup" },
                ]}
              />
              <FooterCol
                title="Engine"
                items={[
                  { label: "Inference", href: "/#inference" },
                  { label: "Simulation", href: "/#simulation" },
                  { label: "Digital Twins", href: "/#twins" },
                  { label: "Architecture", href: "/#architecture" },
                ]}
              />
              <FooterCol
                title="Platform"
                items={[
                  { label: "Collaboration", href: "/#collaboration" },
                  { label: "Platform scale", href: "/#scale" },
                  { label: "Resilience", href: "/#resilience" },
                  { label: "Contact", href: "/#contact" },
                ]}
              />
              <FooterCol
                title="Site"
                items={[
                  { label: "Home", href: "/#hero" },
                  { label: "Protocol", href: "/session-protocol", note: "Session" },
                  { label: "Manifesto", href: "/#manifesto" },
                  { label: "Surfaces", href: "/#surfaces" },
                  { label: "Scale", href: "/#scale" },
                  { label: "Closing", href: "/#closing" },
                ]}
              />
              <FooterCol
                title="House"
                items={[
                  { label: "HBM & Company", href: "#" },
                  { label: "Press", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Privacy & Terms", href: "#" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="font-display text-[clamp(64px,12vw,200px)] leading-[0.85] tracking-tightest-2 text-ink/90">
            What happens next.
          </div>
          <div className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/40 whitespace-nowrap">
            © {year} HBM & Company · Amsterdam · Warsaw · Brooklyn
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; note?: string }[];
}) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] tabular uppercase tracking-[0.2em] text-ink/40 mb-5">
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={`${title}-${it.label}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <Link href={it.href} className="text-[14px] text-ink/80 hover:text-ink uline">
              {it.label}
            </Link>
            {it.note && (
              <span className="text-[9px] tabular tracking-[0.16em] uppercase text-ink/35">
                {it.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
