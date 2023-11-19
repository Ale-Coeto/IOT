import type { NextApiRequest, NextApiResponse } from "next";

import { sensorsCaller } from "~/server/api/ApiCaller";

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
  const { userId } = req.body as { userId: string };
  
  const opened = z.string().parse(data);
  const user = z.string().parse(userId);

  console.log(opened, user);
  
  try {
    if (typeof data === "string") {
      await sensorsCaller.addOpened(
          { userId: user, value: opened }
      )
        
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