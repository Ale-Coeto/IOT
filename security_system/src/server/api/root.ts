import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { saveData } from "./routers/data";
import { deviceRouter } from "./routers/device";
import { userRouter } from "./routers/user";
import { FaceRecognitionRouter } from "./routers/face_recognition";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  data: saveData,
  device: deviceRouter,
  user: userRouter,
  face_recognition: FaceRecognitionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
