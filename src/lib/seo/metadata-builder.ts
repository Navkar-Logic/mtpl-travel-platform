import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  DEFAULT_OG_IMAGE_PATH,
  buildCanonicalUrl,
  resolvePrimaryAssetUrl,
} from "./site-seo";

export interface PageOgImageOptions {
  url: string;
  width?: number;
  height?: number;
  alt: string;
}

export interface BuildPageMetadataInput {
  title: Metadata["title"];
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: PageOgImageOptions;
  ogType?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
}

export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  noIndex = false,
  keywords,
}: BuildPageMetadataInput): Metadata {
  const canonicalUrl = buildCanonicalUrl(path);
  const resolvedOgTitle =
    ogTitle ||
    (typeof title === "string"
      ? `${title} | ${siteConfig.publicBrandName} — Mishrikotkar Travels`
      : siteConfig.seo.defaultTitle);
  const resolvedOgDescription = ogDescription || description;

  const imageUrl = resolvePrimaryAssetUrl(ogImage?.url || DEFAULT_OG_IMAGE_PATH);
  const imageWidth = ogImage?.width ?? 1200;
  const imageHeight = ogImage?.height ?? 630;
  const imageAlt =
    ogImage?.alt || "Mishrikotkar Travels Pvt. Ltd. (MTPL) — Travel, Taken Care Of.";

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url: canonicalUrl,
      siteName: "Mishrikotkar Travels Pvt. Ltd. (MTPL)",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [imageUrl],
    },
  };
}

