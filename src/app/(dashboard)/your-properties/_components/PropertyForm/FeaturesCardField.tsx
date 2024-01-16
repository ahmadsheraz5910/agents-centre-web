import { Card, CardHeader, CardContent } from "@/core/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/core/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group";
import React from "react";
import { useFormContext } from "react-hook-form";



const FeaturesCardField = () => {
  const form = useFormContext();
  return (
    <Card>
      <CardHeader className="border-b px-5 py-3 text-base font-semibold">
        {"Amenities and Features"}
      </CardHeader>
      <CardContent className="w-full gap-4 space-y-6 p-0 pb-5 pt-4">
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem className="space-y-3 px-5">
              <FormLabel>Interior Details</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="grid grid-cols-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default FeaturesCardField;
