import { z } from "zod";


import {
    createTRPCRouter,
    publicProcedure,
    // systemProcedure
} from "~/server/api/trpc";

export const deviceRouter = createTRPCRouter({
    add: publicProcedure
        .input(
            z.object({
                connectionId: z.string(),
                domain: z.string(),
                stage: z.string(),
                name: z.string(),
              }),
        )
        .mutation( async({ input, ctx }) => {
            try {
                // await ctx.db.device.deleteMany({
                //   where: {
                //     OR: [{ connectionId: input.connectionId }],
                //   },
                // });
                await ctx.db.device.create({
                  data: {
                    name: input.name,
                    connectionId: input.connectionId,
                    domain: input.domain,
                    stage: input.stage,
                  },
                });
                return true;
              } catch (error) {
                console.log("error: ", error);
              }
        
              return false;
            }),

    removeDevice: publicProcedure
    .input(z.object({ connectionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      
      await ctx.db.device.deleteMany({
        where: {
          connectionId: input.connectionId,
        }
      });
    }),

    getDevices: publicProcedure
    .query(async ({ ctx }) => {
      const devices = await ctx.db.device.findMany();
      return devices;
    }),


});
