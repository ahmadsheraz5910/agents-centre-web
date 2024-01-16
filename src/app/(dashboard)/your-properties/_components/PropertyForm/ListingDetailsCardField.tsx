import InputField from "@/core/components/react-hook-fields/InputField";
import { Card, CardHeader, CardContent } from "@/core/components/ui/card";
import React from "react";
import { useFormContext } from "react-hook-form";

const ListingDetailsCardField = () => {
  const form = useFormContext();
  return (
    <Card className="opacity-80">
      <CardHeader className="border-b px-5 py-3 text-base font-semibold">
        {"Listing Details"}
      </CardHeader>
      <CardContent className="grid w-full grid-cols-2 gap-4  p-5 pt-4">
        <InputField
          control={form.control}
          label="Size in ft"
          name="features.size"
        />
        <InputField
          control={form.control}
          label="Bathrooms"
          name="features.bathrooms"
        />
        <InputField
          control={form.control}
          label="Structure Type"
          name="features.structureType"
        />
        <InputField
          control={form.control}
          label="Floors"
          name="features.floors"
        />
      </CardContent>
    </Card>
  );
};

export default ListingDetailsCardField;
