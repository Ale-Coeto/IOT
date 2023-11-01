import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const saveData = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.example.findMany();
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),

    sendData: publicProcedure
        .input(z.object({ temp: z.number() }))
        .mutation(({ input, ctx }) => {
            return (
            ctx.db.log.create({
                data: {
                    temp: input.temp,
                },
            })
            )
        })

});
