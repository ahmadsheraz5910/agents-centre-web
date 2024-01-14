"use client";
import { type FormPropertySchema } from "@/features/properties/schema";
import React from "react";
import type * as z from "zod";
import PropertyForm from "../_components/PropertyForm";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  propertyId: string;
  initalValues: z.infer<typeof FormPropertySchema>;
};

const EditPropertyClient = (props: Props) => {
  const router = useRouter();
  const { mutateAsync } = api.propertyRouter.updateProperty.useMutation();
  
  return (
    <PropertyForm
      title={props.initalValues.title}
      initalValues={props.initalValues}
      onSubmit={async (values) => {
        try {
          await mutateAsync({
            ...values,
            id: props.propertyId,
          });
          toast("Property Updated", {
            description: "Your property is updated successfully",
          });
          router.refresh()
        } catch (e) {
          toast("Error", {
            description: "Something went wrong, please try again later",
          });
        }
      }}
    />
  );
};

export default EditPropertyClient;
