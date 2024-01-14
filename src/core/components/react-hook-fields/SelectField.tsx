import React, { type ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: UseControllerProps<TFieldValues, TName> & {
    label: ReactNode;
    options: string[] | readonly string[];
    description?: ReactNode;
  },
) => {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem className="row-start-2 flex-1">
          <FormLabel>{props.label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue defaultValue={props.options[0]} asChild>
                  <span className="capitalize">{field.value}</span>
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export default SelectField;
