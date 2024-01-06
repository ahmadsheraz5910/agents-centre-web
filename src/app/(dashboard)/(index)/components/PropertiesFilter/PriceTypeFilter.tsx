import { Button } from "@/components/ui/button";
import { DoubleEdgeSlider } from "@/components/ui/doubleEdgeSlider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import maxArray from "lodash.max";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";


const PRICE_STEP = 25000;
const PRICE_RANGE = Array(41)
  .fill(0)
  .map((_, idx) => idx * PRICE_STEP);
const MIN_PRICE = 0;
const MAX_PRICE = maxArray(PRICE_RANGE) ?? 100;

type PriceFilterRange = {
  maxPrice: number | undefined;
  minPrice: number | undefined;
};
interface Props {
  priceFilter: PriceFilterRange;
  setPriceFilter: React.Dispatch<React.SetStateAction<PriceFilterRange>>;
}
const PriceTypeFilter = ({ priceFilter, setPriceFilter }: Props) => {
  const pricesRange = [12000, 20000, 30000, 25000, 50000];
  const frequencies = PRICE_RANGE.map(
    (r) =>
      pricesRange
        .map((price) => (price >= r && price <= r + PRICE_STEP ? 1 : 0))
        .filter((c) => c).length,
  );
  const maxFrequency = maxArray(frequencies) ?? 100;
  console.log(priceFilter);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center border-slate-300 font-medium text-slate-800"
        >
          <p>{"Price"}</p>
          <ChevronDownIcon className="ml-3 mt-0.5 h-4 w-4" />
          {(!!priceFilter.minPrice || !!priceFilter.minPrice) && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {priceFilter.minPrice ?? "Min"} -{" "}
                {priceFilter.maxPrice ?? "Max"}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-fit space-y-8 p-6">
        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <div className="flex h-20 items-end gap-0.5 px-2">
              {frequencies.map((v, idx) => {
                const isPriceInRange =
                  (priceFilter.minPrice ?? MIN_PRICE) <=
                    (PRICE_RANGE[idx] ?? 0) &&
                  (priceFilter.maxPrice ?? MAX_PRICE) >=
                    (PRICE_RANGE[idx] ?? 0) + PRICE_STEP;

                return (
                  <div
                    key={idx}
                    style={{
                      height: `${
                        maxFrequency ? Math.ceil((v * 100) / maxFrequency) : 0
                      }%`,
                    }}
                    className={`min-w-[4px] rounded-md ${
                      isPriceInRange ? "bg-slate-600" : "bg-slate-400"
                    }`}
                  ></div>
                );
              })}
            </div>
            <DoubleEdgeSlider
              min={MIN_PRICE}
              max={MAX_PRICE}
              value={[
                priceFilter.minPrice ?? MIN_PRICE,
                priceFilter.maxPrice ?? MAX_PRICE,
              ]}
              step={PRICE_STEP}
              onValueChange={(v) => {
                const [min, max] = v;
                setPriceFilter({
                  maxPrice: max,
                  minPrice: min,
                });
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <Label htmlFor="minimum">{"Min Price"}</Label>
              <Input
                type="string"
                id={"minimum"}
                placeholder="Enter Minimum"
                className="min-w-fit"
                value={priceFilter.minPrice ?? ""}
                onChange={(e) => {
                  const minPrice = parseInt(e.target.value) || undefined;
                  if (!minPrice) return setPriceFilter((p) => ({ ...p, minPrice }));
                  if (priceFilter.maxPrice && minPrice >= priceFilter.maxPrice) return;
                  setPriceFilter((p) => ({
                    ...p,
                    minPrice,
                  }));
                }}
              />
            </div>
            <Separator orientation="horizontal" className="mt-5 w-4" />
            <div>
              <Label htmlFor="maximum">{"Max Price"}</Label>
              <Input
                type="string"
                id={"maximum"}
                placeholder="Enter Maximum"
                className="min-w-fit"
                value={priceFilter.maxPrice ?? ""}
                onChange={(e) => {
                  const maxPrice = parseInt(e.target.value) || undefined;
                  if (!maxPrice) return setPriceFilter((p) => ({ ...p, maxPrice }));
                  if (priceFilter.minPrice && maxPrice <= priceFilter.minPrice)
                    return;
                  setPriceFilter((p) => ({ ...p, maxPrice }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1">
          <Button
            size={"sm"}
            variant={"link"}
            onClick={() => {
              setPriceFilter({
                maxPrice: undefined,
                minPrice: undefined,
              });
            }}
          >
            {"Clear"}
          </Button>
          <Button size={"sm"}>{"Done"}</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PriceTypeFilter;
