"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";

const fallbackImage = "/images/college-placeholder.svg";

const allowedRemoteHosts = new Set([
  "images.unsplash.com",
  "static.wixstatic.com",
  "blogs.ubc.ca",
  "cf-img-a-in.tosshub.com",
  "upload.wikimedia.org",
  "www.nitt.edu",
  "manage.collnod.com",
  "cdn.dnaindia.com",
  "img.jagranjosh.com",
  "assets.thehansindia.com",
  "bsmedia.business-standard.com",
  "ksadmission.in",
  "picestudynation.com",
  "s3.ap-south-1.amazonaws.com",
  "thesamikhsya.com",
  "amity.edu",
  "akm-img-a-in.tosshub.com",
  "gyaanarth.com",
  "kj1bcdn.b-cdn.net",
  "www.mbacollegesbangalore.in",
]);

type CollegeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
};

function getSafeImageSource(src?: string | null) {
  if (!src) {
    return fallbackImage;
  }

  if (src.startsWith("/")) {
    return src;
  }

  try {
    const url = new URL(src);
    return url.protocol === "https:" && allowedRemoteHosts.has(url.hostname)
      ? src
      : fallbackImage;
  } catch {
    return fallbackImage;
  }
}

export function CollegeImage({ src, alt, onError, ...props }: CollegeImageProps) {
  const safeSrc = useMemo(() => getSafeImageSource(src), [src]);
  const [failedSrc, setFailedSrc] = useState("");
  const currentSrc = failedSrc === safeSrc ? fallbackImage : safeSrc;

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallbackImage) {
          setFailedSrc(currentSrc);
        }

        onError?.(event);
      }}
    />
  );
}
