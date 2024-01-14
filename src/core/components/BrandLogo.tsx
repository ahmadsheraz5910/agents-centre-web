"use client";
import React from "react";
import Image from "next/image";
interface Props {
  className?: string;
  foreground?: boolean;
  iconOnly?: boolean;
}
const BrandLogo = ({
  className,
  iconOnly = false,
  foreground = false,
}: Props) => {
  if (iconOnly) {
    return (
      <Image
        src="/logo-xs.png"
        alt="Logo"
        width={88}
        height={80}
        className={className}
      />
    );
  }
  return (
    <Image
      src={`/${foreground ? "logo.png" : "logo-2.png"}`}
      alt="Logo"
      width={480}
      height={120}
      className={className}
    />
  );
};

export default BrandLogo;
