import { BRAND_CC, BRAND_SOFTWARE } from "@/lib/seo/metadata";
import { getRequestSeoSurface } from "@/lib/seo/surface";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export function SiteJsonLd() {
  const surface = getRequestSeoSurface();
  const ccOrigin = getHomeOrigin() || "https://www.consequence.cc";
  const softwareOrigin = getSoftwareOrigin() || "https://www.consequence.software";

  const organization = {
    "@type": "Organization",
    "@id": `${ccOrigin}/#organization`,
    name: "HBM & Company",
    url: ccOrigin,
    brand: [
      { "@type": "Brand", name: BRAND_CC.siteName },
      { "@type": "Brand", name: BRAND_SOFTWARE.siteName },
    ],
  };

  const graph =
    surface === "software"
      ? {
          "@context": "https://schema.org",
          "@graph": [
            organization,
            {
              "@type": "WebSite",
              "@id": `${softwareOrigin}/#website`,
              url: softwareOrigin,
              name: BRAND_SOFTWARE.siteName,
              description: BRAND_SOFTWARE.description,
              publisher: { "@id": `${ccOrigin}/#organization` },
              inLanguage: "en-US",
            },
            {
              "@type": "SoftwareApplication",
              "@id": `${softwareOrigin}/#application`,
              name: "Consequence",
              applicationCategory: "MusicApplication",
              operatingSystem: "macOS, Windows",
              description: BRAND_SOFTWARE.description,
              url: `${softwareOrigin}/download`,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free tier available · Professional plans from $49/month",
              },
              publisher: { "@id": `${ccOrigin}/#organization` },
            },
          ],
        }
      : {
          "@context": "https://schema.org",
          "@graph": [
            organization,
            {
              "@type": "WebSite",
              "@id": `${ccOrigin}/#website`,
              url: ccOrigin,
              name: BRAND_CC.siteName,
              description: BRAND_CC.description,
              publisher: { "@id": `${ccOrigin}/#organization` },
              inLanguage: "en-US",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${ccOrigin}/?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "OnlineStore",
              "@id": `${ccOrigin}/#marketplace`,
              name: BRAND_CC.siteName,
              description: BRAND_CC.description,
              url: ccOrigin,
              keywords: BRAND_CC.keywords.slice(0, 12).join(", "),
              publisher: { "@id": `${ccOrigin}/#organization` },
            },
          ],
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
