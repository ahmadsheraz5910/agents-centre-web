import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import CurrencyInput from "react-currency-input-field";
import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

const CurrencyInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> & { label: string },
) => {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              <span className="absolute ml-3 mt-[2.5px] text-sm font-medium text-muted-foreground">
                {"PKR"}
              </span>
              <CurrencyInput
                name={field.name}
                className={
                  "flex h-10 w-full rounded-md border border-input bg-background py-2 pl-12 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                placeholder="Enter property price in PKR"
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CurrencyInputField;
