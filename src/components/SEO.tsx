import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  twitterCard = "summary_large_image",
  twitterSite,
  twitterImage,
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content={ogType} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content={twitterCard} />
        {twitterSite && <meta name="twitter:site" content={twitterSite} />}
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
