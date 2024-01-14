import { convertObjectToEnum } from "@/core/helpers";
import {
  PROPERTY_PURPOSE,
  PROPERTY_STATUS,
  PROPERTY_TYPE,
} from "@prisma/client";
import * as z from "zod";

export const PROPERTY_STATUS_OPTIONS = convertObjectToEnum(PROPERTY_STATUS);
export const PROPERTY_PURPOSE_OPTIONS = convertObjectToEnum(PROPERTY_PURPOSE);
export const PROPERTY_TYPE_OPTIONS = convertObjectToEnum(PROPERTY_TYPE);

const FormPropertySchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  status: z.enum(PROPERTY_STATUS_OPTIONS),
  price: z.string().min(1, "Please enter a valid price"),
  address: z.object({
    location: z
      .object({
        description: z.string(),
        placeId: z.string(),
        geometry: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      })
      .required(),
    city: z.string().min(1, " "),
    state: z.string().min(1, " "),
  }),
  purpose: z.enum(PROPERTY_PURPOSE_OPTIONS),
  type: z.enum(PROPERTY_TYPE_OPTIONS),
});
const APIPropertySchema = FormPropertySchema;
export { APIPropertySchema, FormPropertySchema };
