import type { NextApiRequest, NextApiResponse } from "next";

import { faceRecognitionCaller } from "~/server/api/ApiCaller";
import { sendDataCaller } from "~/server/api/ApiCaller";

// import { DeviceDataType } from "~/zod/types";
import { z } from "zod";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {

  const { data } = req.body as { data: string };
  const { id } = req.body as { id: string };
  const { chunk } = req.body as { chunk: string };
  const { chunkSize } = req.body as { chunkSize: string };
  const { userId } = req.body as { userId: string };
  
  const img = z.string().parse(data);
  const imgId = z.number().parse(id);
  const chunkNum = z.number().parse(chunk);
  const chunkS = z.number().parse(chunkSize);
  const user = z.string().parse(userId);

  try {
    if (typeof data === "string") {
    await faceRecognitionCaller.addImage(
        { image: img, id: imgId, chunk: chunkNum, chunkSize: chunkS }
    )
    
    if (chunkNum === chunkS) {
      const result = await faceRecognitionCaller.recognize({ id: imgId, userId: user });
      // console.log(result)

      if (result !== "None" && result !== "Unknown" && result !== "Error") {
        await sendDataCaller.send({ connectionId: "Of7CPf_zIAMCI8A=", data: '{"action":"message", "content":"hola"}' });
      }
        
    }

    }

    res.status(200).json({
      message: "Data recieved successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({
      message: "Error: " + JSON.stringify(error),
    });
  }
  }