import { z } from "zod";

// import type { NextApiRequest, NextApiResponse } from "next";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sendRouter = createTRPCRouter({
  send: publicProcedure
    .input(z.object({ connectionId: z.string(), data: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const device = await ctx.db.device.findUnique({
          where: {
            connectionId: input.connectionId,
          },
        });
        // console.log(device?.connectionId)
        if (!device) {
          return "Error: device not found";
        }

        const callbackUrl = `https://${device.domain}/${device.stage}`;

        const client = new ApiGatewayManagementApiClient({
          endpoint: callbackUrl,
          region: "us-east-1",
        });


        const jsonObject = JSON.parse(input.data);
        console.log(jsonObject);

        const requestParams = {
          ConnectionId: device.connectionId,
          Data: JSON.stringify(jsonObject),
        };

        const command = new PostToConnectionCommand(requestParams);
        console.log(command);
        const result = await client.send(command);
        return JSON.stringify(result);
        
      } catch (error) {
        console.log("error: ", error);
      }

      return false;
    }),
});
