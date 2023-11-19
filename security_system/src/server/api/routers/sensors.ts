import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const sensorsRouter = createTRPCRouter({
  
    addSensorLog: publicProcedure
    .input(z.object({type: z.string(), value: z.string(), userId: z.string()}))
    .mutation(async ({ ctx, input }) => {
        return await ctx.db.sensorLog.create({
            data: {
                type: input.type,
                value: input.value,
                userId: input.userId
            }
        })
    }),

    getSensorLogs: publicProcedure
    .input(z.object({userId: z.string(), type: z.string()}))
    .query(async ({ ctx, input }) => {
        return await ctx.db.sensorLog.findFirst({
            where: {
                userId: input.userId,
                type: input.type
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                value: true,
                createdAt: true
            }
        })
    }),

    addOpened: publicProcedure
    .input(z.object({userId: z.string(), value: z.string()}))
    .mutation(async ({ ctx, input }) => {
        const newLog = await ctx.db.opened.create({
            data: {
                userId: input.userId,
                value: input.value
            }
        })


        await ctx.db.opened.deleteMany({
            where: {
                NOT: {
                    id: newLog.id
                }
            }
        })

        console.log(newLog)
        return newLog;
    })

});
