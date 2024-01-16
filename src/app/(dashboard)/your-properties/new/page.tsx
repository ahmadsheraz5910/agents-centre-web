"use client";
import type * as z from "zod";
import React from "react";
import {
  FormPropertySchema,
} from "@/features/properties/schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import PropertyForm from "../_components/PropertyForm";
import { useRouter } from "next/navigation";

const formSchema = FormPropertySchema;
const AddNewProperty = () => {
  const { mutateAsync } = api.propertyRouter.createProperty.useMutation();
  const router = useRouter()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await mutateAsync(values);
      toast("Property Added", {
        description: "A new property is added successfully",
      });
      router.push(`/your-properties/${response.id}`)
    } catch (e) {
      toast("Error", {
        description: "Something went wrong, please try again later",
      });
      console.log(e);
    }
  }
  return <PropertyForm title={"Add New Property"} onSubmit={onSubmit} />;
};

export default AddNewProperty;
