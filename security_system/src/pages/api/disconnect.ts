import type { NextApiRequest, NextApiResponse } from "next";

import { deviceCaller } from "~/server/api/ApiCaller";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Debug
  // console.log("body", req.body);
  // console.log("query", req.query);

  if (req.body === undefined) {
    res.status(400).json({
      message: "Error: Missing body",
    });
    return;
  }
  
  const connectionId = req.body.connectionId as string;

  if (!connectionId || connectionId === "undefined") {
    res.status(400).json({
      message: "Error: Missing connection id",
    });
  } 

  else {
    try {
      await deviceCaller.removeDevice({
        connectionId: connectionId,
      });
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({
        message: "Error: " + JSON.stringify(error),
      });
    }
    res.status(200).json({
      message: "Device disconnected",
    });
  }
}