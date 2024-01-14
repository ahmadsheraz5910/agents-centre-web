import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { APIPropertySchema } from "@/features/properties/schema";
import * as z from "zod";

export const propertyRouter = createTRPCRouter({
  getPropertyById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      // Testing loading state
      //await new Promise((resolve) => setTimeout(resolve, 2000000));
      return await ctx.db.properties.findUniqueOrThrow({
        where: {
          id: input,
        },
      });
    }),
  getMyProperties: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.properties.findMany({
      where: {
        postedBy: {
          id: ctx.session.user.id,
        },
      },
    });
  }),
  createProperty: protectedProcedure
    .input(APIPropertySchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.properties.create({
        data: {
          ...input,
          thumbnail: "",
          postedBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  updateProperty: protectedProcedure
    .input(APIPropertySchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input: { id, ...rest } }) => {
      return await ctx.db.properties.update({
        where: {
          id: id,
        },
        data: {
          ...rest,
        },
      });
    }),
});
