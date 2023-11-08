import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import axios from "axios";

export const FaceRecognitionRouter = createTRPCRouter({
    recognizeFace: protectedProcedure
        .input(z.object({ img: z.string(), images: z.array(z.string()) }))
        .mutation(({ input }) => {
            try {
                const json = JSON.stringify(input);
                console.log(json);
                // const response = await axios.post("https://recognition-api-iota.vercel.app/getImg",{img: input});
            } catch (error) {
                console.log(error);
            }
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
    
})