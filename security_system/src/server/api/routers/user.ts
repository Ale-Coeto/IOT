import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getImages: protectedProcedure
        .query(async ({ ctx }) => {
            const id = ctx.session.user.id;
            const imgs = await ctx.db.user.findUnique({
                where: {
                    id: id
                },
                select: {
                    images: true
                }
            })

            const length = imgs?.images?.length;

            return { length: length, images: imgs };
        }),

    addImage: protectedProcedure
        .input(z.object({ img: z.string(), name: z.string()}))
        .mutation(async ({ ctx, input }) => {
            const id = ctx.session.user.id;
            return await ctx.db.image.create({
                data: {
                    url: input.img,
                    name: input.name,
                    userId: id
                }
                })
        }),

    deleteImage: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const id = ctx.session.user.id;
            return await ctx.db.image.delete({
                where: {
                    id: input.id
                }
            })
        }),

    editImage: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const id = ctx.session.user.id;
            return await ctx.db.image.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name
                }
            })
        })
        
});