"use client";
import { Button } from "@/core/components/ui/button";
import { Separator } from "@/core/components/ui/separator";
import { cn } from "@/core/helpers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
interface Props {
    className?: string;
}
const PurposeSelector = ({className}:Props) => {
  const searchParams = useSearchParams();
  const isBuying = (searchParams.get("purpose") ?? "buy") === "buy";

  return (
    <div className={cn("flex items-center gap-1 text-lg", className)}>
      <Link passHref href={`/?purpose=buy`}>
        <Button
          variant={"link"}
          className={
            "text-base font-semibold text-slate-400" +
            (isBuying ? " text-primary" : "")
          }
        >
          {"Buy"}
        </Button>
      </Link>

      <Separator orientation="vertical" className="h-6" />
      <Link passHref href={`/?purpose=rent`}>
        <Button
          variant={"link"}
          className={
            "text-base font-semibold text-slate-400" +
            (!isBuying ? " text-primary" : "")
          }
        >
          {"Rent"}
        </Button>
      </Link>
    </div>
  );
};

export default PurposeSelector;
