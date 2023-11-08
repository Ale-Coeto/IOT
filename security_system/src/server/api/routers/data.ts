import axios from "axios";
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

    getData: publicProcedure.query(() => {
        const fetchData = async () => {
            try {
                    const response = await axios.post("https://recognition-api-iota.vercel.app/getImg",{img: "test"});
                    // const data = await response.json();
                    console.log(response.data);
                    return response.data as string;
            } catch (error) {
                console.log(error);
                return error;
            }
            
          }
          return fetchData();
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
