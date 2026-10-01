import { about, contact, hours, site } from "@/data/site";

const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function localBusinessSchema() {
  const open = hours.filter((h) => h.open);
  return {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "BeautySalon"],
    "@id": `${site.url}/#salao`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: contact.phoneE164,
    image: [`${site.url}/opengraph-image.png`],
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    ...(contact.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng } }
      : {}),
    hasMap: contact.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: open.map((h) => dayMap[h.day]),
        opens: open[0].open,
        closes: open[0].close,
      },
    ],
    sameAs: [contact.instagramUrl],
    founder: { "@type": "Person", name: about.name },
    knowsAbout: ["Mechas", "Loiro", "Alisamento", "Reestruturação capilar", "Exoplastia", "Coloração"],
    areaServed: { "@type": "City", name: "Uberlândia" },
  };
}
