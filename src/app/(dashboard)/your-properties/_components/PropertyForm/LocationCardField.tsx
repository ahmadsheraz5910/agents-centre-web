"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/core/components/ui/card";
import GoogleAutoComplete from "@/core/components/GoogleAutoComplete";
import { useMutation } from "@tanstack/react-query";
import { getGeocode } from "use-places-autocomplete";
import type * as z from "zod";
import { LoadingCircle } from "@/core/components/ui/loading-circle";
import { type FormPropertySchema } from "@/features/properties/schema";
type FieldValue = Record<
  "address",
  z.infer<typeof FormPropertySchema>["address"]
>;

const LocationCardField = () => {
  const { control, setValue } = useFormContext<FieldValue>();
  const { mutate: getPlaceDetails, status: getPlaceDetailsStatus } =
    useMutation({
      mutationKey: ["autocomplete.getPlaceDetails"],
      mutationFn: async (placeId: string) => {
        try {
          const response = await getGeocode({ placeId: placeId });
          if (!response[0]) {
            throw new Error("No response for placeId");
          }
          return response[0];
        } catch (e) {
          throw new Error("Something went wrong while fetching place details");
        }
      },
    });
  return (
    <Card>
      <div className="flex items-center justify-between border-b pr-5">
        <CardHeader className="space-y-0.5 px-5 py-3">
          <p className="text-base font-semibold">{"Location"}</p>
          <p className="text-sm text-muted-foreground">
            {
              "Add images, pdfs or videos to show property details and features."
            }
          </p>
        </CardHeader>
        {getPlaceDetailsStatus === "loading" && (
          <div>
            <LoadingCircle className="h-5 w-5" />
          </div>
        )}
      </div>

      <CardContent className={`space-y-4 p-5 ${getPlaceDetailsStatus === "loading" ? 'opacity-50':''}`}>
        <FormField
          name={`address.location`}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <GoogleAutoComplete
                  name={field.name}
                  onBlur={field.onBlur}
                  location={field.value}
                  onLocationChange={(location) => {
                    getPlaceDetails(location.placeId, {
                      onSuccess: (data) => {
                        const stateName = data.address_components.find(
                          (component) =>
                            component.types.includes(
                              "administrative_area_level_1",
                            ),
                        )?.long_name;
                        const cityName = data.address_components.find(
                          (component) =>
                            component.types.includes(
                              "administrative_area_level_2",
                            ),
                        )?.long_name;

                        setValue(`address.city`, cityName ?? "");
                        setValue(`address.state`, stateName ?? "");
                        setValue(`address.location`, {
                          geometry: {
                            lat: data.geometry.location.lat(),
                            lng: data.geometry.location.lng(),
                          },
                          description: location.description,
                          placeId: location.placeId,
                        });
                      },
                      onError: (error) => {
                        console.log(error);
                      },
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name={`address.city`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`address.state`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCardField;
