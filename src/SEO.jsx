import { Helmet } from "react-helmet";

export default function SEO({ title, description, keywords }) {

  return (
    <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
  );
}
