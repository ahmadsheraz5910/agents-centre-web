"use client";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import { Separator } from "@/core/components/ui/separator";
import { cn } from "@/core/helpers";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

const options = [
  { label: "House", value: "house" },
  { label: "Flat", value: "flat" },
  { label: "Upper Portion", value: "upper_portion" },
  { label: "Lower Portion", value: "lower_portion" },
  { label: "Farm House", value: "farm_house" },
  { label: "Room", value: "room" },
];
interface Props {
  selectedValues: Array<string> | undefined;
  setSelectedValues: (values: Array<string> | undefined) => void;
}
export function HouseTypeFilter({ selectedValues, setSelectedValues }: Props) {
  const selectedValuesSet = new Set<string>(selectedValues);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="font-medium flex items-center border-slate-300 text-slate-800">
          <p>{"House Type"}</p>
          {selectedValuesSet?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValuesSet.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValuesSet.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValuesSet.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValuesSet.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
          <ChevronDownIcon className="w-4 h-4 ml-3 mt-0.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] min-w-[var(--radix-popper-anchor-width)] p-0" align="start">
        <div className="p-1 text-foreground" role={"presentation"}>
          {options.map((option) => {
            const isSelected = selectedValuesSet.has(option.value);
            return (
              <div
                key={option.value}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-accent-foreground outline-none transition-colors hover:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onClick={() => {
                  if (isSelected) {
                    selectedValuesSet.delete(option.value);
                  } else {
                    selectedValuesSet.add(option.value);
                  }
                  setSelectedValues(
                    selectedValuesSet.size > 0
                      ? Array.from(selectedValuesSet)
                      : undefined,
                  );
                }}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible",
                  )}
                >
                  <CheckIcon className={cn("h-4 w-4")} />
                </div>
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
        <Separator orientation="horizontal" />
        <div className="p-1">
          <div
            onClick={() => setSelectedValues(undefined)}
            className="relative flex cursor-default select-none items-center justify-center rounded-sm px-2 py-1.5 text-center text-sm font-medium text-accent-foreground outline-none transition-colors hover:bg-accent"
          >
            <span>{"Clear Filters"}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
