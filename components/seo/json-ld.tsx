import { BRAND_CC, BRAND_SOFTWARE } from "@/lib/seo/metadata";
import { getHomeOrigin, getSoftwareOrigin } from "@/lib/urls";

export function SiteJsonLd() {
  const ccOrigin = getHomeOrigin() || "https://www.consequence.cc";
  const softwareOrigin = getSoftwareOrigin() || "https://www.consequence.software";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${ccOrigin}/#website`,
        url: ccOrigin,
        name: BRAND_CC.siteName,
        description: BRAND_CC.description,
        publisher: { "@id": `${ccOrigin}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "WebSite",
        "@id": `${softwareOrigin}/#website-software`,
        url: softwareOrigin,
        name: BRAND_SOFTWARE.siteName,
        description: BRAND_SOFTWARE.description,
        publisher: { "@id": `${ccOrigin}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${ccOrigin}/#organization`,
        name: "HBM & Company",
        url: ccOrigin,
        brand: [
          { "@type": "Brand", name: BRAND_CC.siteName },
          { "@type": "Brand", name: BRAND_SOFTWARE.siteName },
        ],
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
