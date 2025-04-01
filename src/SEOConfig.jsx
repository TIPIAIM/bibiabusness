export function SEOConfig () {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Website",
        name: "Bibiabusiness | Boutique Premium Guinée - Mode Électronique et autres",
        url: "https://bibiabusness.com",

        description: "Découvrez les meilleurs produits premium en Guinée. Livraison rapide à Conakry et dans toutes les régions. Qualité garantie.",
        sameAs: [
          "https://web.facebook.com/people/AOD-Avocats-SCPA/61569855070493/?rdid=nu1hpcE1e9TKytvQ&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F15poedCHYP%2F%3F_rdc%3D1%26_rdr",
          "https://www.instagram.com/aod.avocats.net/",
        ],
        publisher: {
          "@type": "Organization",
          name: "Bibiabusness",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+224 623 146 940",
          contactType: "Service client",
        },
      })}
    </script>
  );
}{/*
    home: {
      title: "Bibiabusiness | Boutique Premium Guinée - Mode & Électronique",
      description: "Découvrez les meilleurs produits premium en Guinée. Livraison rapide à Conakry et dans toutes les régions. Qualité garantie.",
      keywords: "boutique Guinée, produits premium Conakry, acheter en ligne Guinée, mode africaine, électronique qualité"
    },
    product: {
      title: "Nos Produits | Bibiabusiness - Excellence Made in Africa",
      description: "Collection exclusive de produits de qualité supérieure. Parfums, montres, accessoires mode et électronique au meilleur prix."
    },
    // ... configurations pour les autres pages
 */ }
