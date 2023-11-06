import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const deviceRouter = createTRPCRouter({
    add: publicProcedure
        .input(
            z.object({
                connectionId: z.string(),
                domain: z.string(),
                stage: z.string(),
              }),
        )
        .mutation( async({ input, ctx }) => {
            try {
                await ctx.db.device.deleteMany({
                  where: {
                    OR: [{ connectionId: input.connectionId }],
                  },
                });
                await ctx.db.device.create({
                  data: {
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


});
