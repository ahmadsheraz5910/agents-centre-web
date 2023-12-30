"use client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BackpackIcon,
  CornerDownLeft,
  MousePointer,
  SearchIcon,
  TextCursorIcon,
  XIcon,
} from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/ui-utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import usePlacesAutocomplete from "use-places-autocomplete";
import { GLOBAL_CONFIG } from "@/config";
import useLocationsState from "./useLocationsState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CommandMenu({ className }: { className?: string }) {
  const {
    suggestions: { data, loading, status },
    setValue,
    value,
    ready: isGoogleMapsObjectReady,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "pk",
      },
      types: ["sublocality"],
    },
    callbackName: GLOBAL_CONFIG.googlePlacesAPI.callbackName,
  });
  const { locations, setLocations, initalLoading } = useLocationsState({
    isGoogleMapsObjectReady,
  });

  const limitedLocations = locations
    ? locations.length > 1
      ? locations.slice(0, 1)
      : locations
    : undefined;
  const isManyLocationsSelected = locations && locations?.length > 1;
  if (initalLoading) {
    return <Skeleton className={cn("h-10 w-24 max-w-lg", className)} />;
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={cn("relative max-w-lg", className)}>
          <div className="flex items-center rounded-lg border border-input bg-slate-100 px-3 py-2 text-sm">
            <div className="h-full">
              <SearchIcon className="fill-slate-100 text-primary/70" />
            </div>
            <div className="ml-1 flex flex-1 flex-wrap justify-start gap-x-1 gap-y-2">
              {limitedLocations?.map((loc, idx) => (
                <Badge
                  variant={"outline"}
                  key={idx}
                  className="min-w-fit bg-white"
                >
                  <div className="flex items-center gap-2 py-1">
                    {loc.address}
                    <Button variant={"link"} className="h-auto p-0">
                      <XIcon
                        className="h-4 w-4"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setLocations((prevLocations) => {
                            return prevLocations
                              ? prevLocations.filter(
                                  (prev) => prev.placeId !== loc.placeId,
                                )
                              : [];
                          });
                        }}
                      />
                    </Button>
                  </div>
                </Badge>
              ))}
              {!!isManyLocationsSelected && (
                <Badge
                  className="min-w-fit bg-white"
                  variant={"outline"}
                >{`+${locations.length} More`}</Badge>
              )}
              <input
                type="text"
                className={"flex-1 bg-slate-100 px-2 focus:outline-none"}
                placeholder={
                  locations?.length
                    ? "Add more locations..."
                    : "Search locations, agents or agencies..."
                }
              />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={
            "z-50 w-[calc(var(--radix-popper-anchor-width)+120px)] rounded-xl border text-popover-foreground shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          }
          sideOffset={-40}
          alignOffset={-40}
          side={"top"}
        >
          {
            <Command className="overflow-hidden rounded-xl">
              <div
                className="flex items-center bg-white px-4 py-3"
                cmdk-input-wrapper=""
              >
                <SearchIcon className="mr-3 h-6 w-6 shrink-0 text-slate-600 opacity-50" />
                <div className="flex flex-1 flex-wrap justify-start gap-x-1 gap-y-2">
                  {locations?.map((loc, idx) => (
                    <Badge
                      variant={"outline"}
                      key={idx}
                      className="min-w-fit bg-white"
                    >
                      <div className="flex items-center gap-2 py-1">
                        {loc.address}
                        <Button variant={"link"} className="h-auto p-0">
                          <XIcon
                            className="h-4 w-4"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setLocations((prevLocations) => {
                                return prevLocations
                                  ? prevLocations.filter(
                                      (prev) => prev.placeId !== loc.placeId,
                                    )
                                  : [];
                              });
                            }}
                          />
                        </Button>
                      </div>
                    </Badge>
                  ))}
                  <CommandPrimitive.Input
                    className={"flex-1 text-lg focus:outline-none"}
                    placeholder={
                      locations?.length
                        ? "Add more locations..."
                        : "Search locations, agents or agencies..."
                    }
                    value={value}
                    onValueChange={setValue}
                  />
                </div>
              </div>
              <CommandList className="border-b border-t">
                {!data && loading && (
                  <CommandPrimitive.Loading>
                    {"Loading..."}
                  </CommandPrimitive.Loading>
                )}
                {status === "OK" && (
                  <CommandGroup heading="Locations">
                    {data.map(
                      ({ description, structured_formatting, place_id }) => (
                        <CommandItem
                          key={place_id}
                          value={description}
                          className="text-base"
                          onSelect={() => {
                            console.log("clicked");
                            setLocations((prevLocations) => {
                              const newLocation = {
                                placeId: place_id,
                                address: structured_formatting.main_text,
                                geometry: undefined,
                              };
                              return prevLocations
                                ? prevLocations.some(
                                    (prev) => prev.placeId === place_id,
                                  )
                                  ? prevLocations
                                  : [...prevLocations, newLocation]
                                : [newLocation];
                            });
                            setValue("", false);
                          }}
                        >
                          <div className="flex w-full items-baseline justify-between">
                            <span>
                              {structured_formatting.main_text_matched_substrings.map(
                                (m, idx) => (
                                  <span key={idx}>
                                    {structured_formatting.main_text.slice(
                                      0,
                                      m.offset,
                                    )}
                                    <span className="font-medium text-slate-600">
                                      {structured_formatting.main_text.slice(
                                        m.offset,
                                        m.offset + m.length,
                                      )}
                                    </span>
                                    {structured_formatting.main_text.slice(
                                      m.offset + m.length,
                                      structured_formatting.main_text.length,
                                    )}
                                  </span>
                                ),
                              )}
                            </span>
                            <span className="text-sm text-slate-400">
                              {structured_formatting.secondary_text}
                            </span>
                          </div>
                        </CommandItem>
                      ),
                    )}
                  </CommandGroup>
                )}
              </CommandList>
              <div className="h-16">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="bg-slate-100 text-slate-500 rounded-md p-2">
                    <MousePointer className="w-4 h-4" />
                  </div>
                  <p>{"or"}</p>
                  <div className="bg-slate-100 text-slate-500 rounded-md p-2">
                    <ArrowUpIcon className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-100 text-slate-500 rounded-md p-2">
                    <ArrowDownIcon className="w-4 h-4" />
                  </div>
                  <p>{"to navigate, "}</p>
                  <div className="bg-slate-100 text-slate-500 rounded-md p-2">
                    <CornerDownLeft className="w-4 h-4" />
                  </div>
                  <p>{"to select, and"}</p>
                  <div className="bg-slate-100 rounded-md font-semibold flex items-center text-center px-3 py-1 text-slate-500">
                    <p>{"Ctrl"}</p>
                  </div>
                  <p>{"+"}</p>
                  <div className="bg-slate-100 rounded-md font-semibold flex items-center text-center px-3 py-1 text-slate-500">
                    <p>{"K"}</p>
                  </div>
                  <p>{"to search anytime"}</p>
                </div>
              </div>
            </Command>
          }
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </Popover>
  );
}
