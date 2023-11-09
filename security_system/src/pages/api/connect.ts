import type { NextApiRequest, NextApiResponse } from "next";
import { deviceCaller } from "~/server/api/ApiCaller";


type ResponseData = {
  message: string;
};

interface Body {
  connectionId: string;
  domain: string;
  stage: string;
  // params: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {

  // const connectionId = req.body.connectionid as string;
  // const domain = req.headers.domain as string;
  // const stage = req.headers.stage as string;

  // const domain = "vczqzgtci9.execute-api.us-east-1.amazonaws.com";
  // const stage = "production";

  const { connectionId, domain, stage } = req.body as Body;

  // const id = req.headers.connectionid as string;
  // if (id) {
  //   console.log("connectionId", id);
  //   void axios.post("/api/testSend", {
  //     message: id.split(",")[0],
  //     connectionId: id,
  //   });
  // }

  await deviceCaller.add({
    connectionId: connectionId,
    domain: domain,
    stage: stage,
  });
  // const addDevice = api.device.add.useMutation();

  // addDevice.mutate({
  //   connectionId: connectionId,
  //   domain: domain,
  //   stage: stage,
  // });

  console.log("connectionId", connectionId);

  res.status(200).json({

    message: connectionId ? JSON.stringify(connectionId) : "no connectionId",
  
  });
}