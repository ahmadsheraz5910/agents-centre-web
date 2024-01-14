"use client";
import type * as z from "zod";
import { Card, CardContent, CardHeader } from "@/core/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/core/components/ui/button";
import { Form } from "@/core/components/ui/form";
import LocationCardField from "./LocationCardField";
import CurrencyInputField from "@/core/components/react-hook-fields/CurrencyInputField";
import SelectField from "@/core/components/react-hook-fields/SelectField";
import ListingDetailsCardField from "./ListingDetailsCardField";
import FeaturesCardField from "./FeaturesCardField";
import MediaCardField from "./MediaCardField";
import InputField from "@/core/components/react-hook-fields/InputField";
import TextareaField from "@/core/components/react-hook-fields/TextareaField";
import {
  FormPropertySchema,
  PROPERTY_PURPOSE_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "@/features/properties/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingCircle } from "@/core/components/ui/loading-circle";
import { Skeleton } from "@/core/components/ui/skeleton";

const formSchema = FormPropertySchema;

interface Props {
  initalValues?: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  title: string;
}

const PropertyForm = ({ title, onSubmit, initalValues }: Props) => {
  const router = useRouter();
  console.log(initalValues)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    resetOptions: {
      keepDirtyValues: true,
      keepDirty: false,
      keepSubmitCount: false,
    },
    values: initalValues,
    defaultValues: {
      title: "",
      description: "",
      status: "draft",
      price: "",
      address: {
        location: undefined,
        city: "",
        state: "",
      },
      purpose: "buy",
      type: "house",
    },
  });
  return (
    <Form {...form}>
      <form
        method={"POST"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full bg-slate-50"
      >
        {form.formState.isDirty && (
          <div className="fixed left-0 top-0 flex min-h-[80px] w-screen items-center justify-between bg-gray-800 px-4 duration-500 animate-in slide-in-from-top">
            <p className="text-lg font-semibold text-white">
              {"Unsaved Changes"}
            </p>
            <div className="flex gap-4">
              <Button
                type={"button"}
                className="h-auto bg-gray-500 p-2 text-primary-foreground hover:bg-gray-500/90"
                onClick={() => {
                  router.back();
                }}
              >
                {"Cancel"}
              </Button>
              <Button
                type={"submit"}
                variant={"outline"}
                className="flex h-auto items-center justify-center gap-2 p-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <LoadingCircle className="h-5 w-5" />
                    <p>{"Saving"}</p>
                  </>
                ) : (
                  <p>{"Save Changes"}</p>
                )}
              </Button>
            </div>
          </div>
        )}
        <div className="fixed z-50 flex min-h-[73px] w-full items-center justify-between space-y-1 border-b bg-white p-4">
          <div className="flex items-center gap-4">
            <Link href={"/your-properties"} passHref>
              <Button variant={"outline"} size={"sm"} className="h-auto p-2">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>

            <p className="text-2xl font-bold">{title}</p>
          </div>
        </div>
        <div className="overflow-auto px-12 py-8">
          <div className="mt-[73px]">
            <div className="flex gap-6">
              <div className="flex-1 space-y-6">
                <Card>
                  <CardContent className="space-y-4 p-5">
                    <InputField
                      name={"title"}
                      label={"Property Title"}
                      control={form.control}
                    />
                    <TextareaField
                      name={"description"}
                      label={"Property Description"}
                      control={form.control}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="space-y-4 p-5">
                    <div className="grid w-full grid-cols-2 gap-4">
                      <CurrencyInputField
                        name={"price"}
                        label={"Property Price"}
                        control={form.control}
                      />
                      <SelectField
                        label={"Property Purpose"}
                        name={"purpose"}
                        control={form.control}
                        options={PROPERTY_PURPOSE_OPTIONS}
                      />
                      <SelectField
                        label={"Property Type"}
                        name={"type"}
                        control={form.control}
                        options={PROPERTY_TYPE_OPTIONS}
                      />
                    </div>
                  </CardContent>
                </Card>
                <LocationCardField />
                <MediaCardField />
              </div>
              <div className="max-w-md flex-1 space-y-6">
                <Card>
                  <CardHeader className="space-y-0.5 border-b px-5 py-3">
                    <p className="text-base font-semibold">
                      {"Property Status"}
                    </p>
                  </CardHeader>
                  <CardContent className="p-5">
                    <SelectField
                      label={"Property Status"}
                      name={"status"}
                      control={form.control}
                      options={PROPERTY_STATUS_OPTIONS}
                    />
                  </CardContent>
                </Card>
                <ListingDetailsCardField />
                <FeaturesCardField />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
export const PropertyFormSkeleton = () => {
  return (
    <div className="relative w-full bg-slate-50">
      <div className="fixed z-50 flex min-h-[73px] w-full items-center justify-between space-y-1 border-b bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="h-auto p-2">
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="overflow-auto px-12 py-8">
        <div className="mt-[73px]">
          <div className="flex gap-6">
            <div className="flex-1 space-y-6">
              <Card>
                <CardContent className="space-y-4 p-5">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-8"></Skeleton>
                    <Skeleton className="h-10 w-full"></Skeleton>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-8"></Skeleton>
                    <Skeleton className="h-20 w-full"></Skeleton>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4 p-5">
                  <div className="grid w-full grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-8"></Skeleton>
                      <Skeleton className="h-10 w-full"></Skeleton>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-8"></Skeleton>
                      <Skeleton className="h-10 w-full"></Skeleton>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-8"></Skeleton>
                      <Skeleton className="h-10 w-full"></Skeleton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="max-w-md flex-1 space-y-6">
              <Card>
                <CardHeader className="space-y-0.5 border-b px-5 py-3">
                  <Skeleton className="h-6 w-8"></Skeleton>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-8"></Skeleton>
                    <Skeleton className="h-10 w-full"></Skeleton>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyForm;
