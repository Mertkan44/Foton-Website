import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://fotonsc.com";

export const SITE_NAME = "Foton Healthcare Solutions";
export const DEFAULT_OG_IMAGE = "/hero-poster.jpg";
export const DEFAULT_DESCRIPTION =
  "Medical imaging installation, dismantling, service, spare parts, and rental solutions for healthcare facilities across Turkey and worldwide.";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  FALLBACK_SITE_URL;

export const SITE_URL = RAW_SITE_URL.startsWith("http")
  ? RAW_SITE_URL.replace(/\/+$/, "")
  : `https://${RAW_SITE_URL.replace(/\/+$/, "")}`;

export const SITE_URL_OBJECT = new URL(SITE_URL);

export const serviceSolutionSlugs = [
  "angio",
  "mr",
  "ct",
  "nuclear",
  "integrated",
] as const;

export type ServiceSolutionSlug = (typeof serviceSolutionSlugs)[number];

export const serviceSolutionSeo: Record<
  ServiceSolutionSlug,
  { title: string; description: string }
> = {
  angio: {
    title: "Angio & X-Ray Solutions",
    description:
      "Angio and X-Ray installation, dismantling, training, remote access, tube replacement, transport, and technical support services.",
  },
  mr: {
    title: "Magnetic Resonance Service Solution",
    description:
      "MRI installation, dismantling, shimming, RF room preparation, magnet services, coil repair, transport, and technical support.",
  },
  ct: {
    title: "Computed Tomography (CT) Service Solutions",
    description:
      "CT installation, dismantling, tube replacement, rental, transport, maintenance contracts, and technical training services.",
  },
  nuclear: {
    title: "Nuclear Medicine Solutions",
    description:
      "PET CT, PET MRI, gamma camera, installation, dismantling, and application support solutions for nuclear medicine departments.",
  },
  integrated: {
    title: "Integrated Service Management",
    description:
      "Integrated maintenance, repair, logistics, spare parts, and 24/7 intervention services for medical imaging operations.",
  },
};

const DEFAULT_KEYWORDS = [
  "medical imaging service",
  "MRI installation",
  "CT service",
  "medical equipment dismantling",
  "hospital technical service",
  "medical equipment logistics",
  "Foton Healthcare Solutions",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL_OBJECT).toString();
}

export function isServiceSolutionSlug(
  value: string,
): value is ServiceSolutionSlug {
  return serviceSolutionSlugs.includes(value as ServiceSolutionSlug);
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  imagePath?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  imagePath = DEFAULT_OG_IMAGE,
}: BuildMetadataInput): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const image = absoluteUrl(imagePath);

  return {
    metadataBase: SITE_URL_OBJECT,
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1024,
          height: 1024,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function getOrganizationStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/logo.svg"),
      email: "foton@fotonsc.com",
      telephone: "+90 543 441 99 92",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "foton@fotonsc.com",
          telephone: "+90 543 441 99 92",
          areaServed: ["TR", "EU", "Middle East"],
          availableLanguage: ["en", "tr", "de", "es", "ru"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Orhangazi mh. 1646 sk. No:42",
        addressLocality: "Esenyurt",
        addressRegion: "Istanbul",
        addressCountry: "TR",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: ["en", "tr", "de", "es", "ru"],
    },
  ];
}
