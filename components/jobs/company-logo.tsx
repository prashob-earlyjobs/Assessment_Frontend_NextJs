"use client";

import { useState } from "react";

const box = "size-9 shrink-0 rounded-lg";

export function CompanyLogo({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <span className={`${box} bg-neutral-100`} aria-hidden />;

  return (
    <img
      src={src}
      alt=""
      className={`${box} object-cover ring-1 ring-black/[0.06]`}
      onError={() => setFailed(true)}
    />
  );
}
