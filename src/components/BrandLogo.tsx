"use client";
import React from "react";
import Image from "next/image";
interface Props {
  className?: string;
  foreground?:boolean
}
const BrandLogo = ({ className, foreground = false }: Props) => {
  return (
    <Image
      src={`/${foreground ? 'logo.png':'logo-2.png'}`}
      alt="Logo"
      width={480}
      height={120}
      className={className}
    />
    // <Image
    //   src="/logo-xs.png"
    //   alt="Logo"
    //   width={132}
    //   height={120}
    //   className={className}
    // />
  );
};

export default BrandLogo;
