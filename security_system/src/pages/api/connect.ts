import type { NextApiRequest, NextApiResponse } from "next";
import { deviceCaller } from "~/server/api/ApiCaller";


type ResponseData = {
  message: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {

  // const connectionId = req.body.connectionid as string;
  // const domain = req.headers.domain as string;
  // const stage = req.headers.stage as string;

  // const domain = "vczqzgtci9.execute-api.us-east-1.amazonaws.com";
  // const stage = "test";

  // console.log("body", req.body);
  // const { connectionId, domain, stage } = req.body as Body;
  const connectionId = req.body.connectionId as string;
  
  const domain = req.body.domain as string;
  const stage = req.body.stage as string;
  
  // const id = req.headers.connectionid as string;
  // if (id) {
  //   console.log("connectionId", id);
  //   void axios.post("/api/testSend", {
  //     message: id.split(",")[0],
  //     connectionId: id,
  //   });
  // }
  // console.log(req.body);
  if (!connectionId) {
    res.status(400).json({
      message: "Error: Missing connection id",
    });
    return;
  }

  if (connectionId !== "undefined") {
  await deviceCaller.add({
    name: "test",
    connectionId: connectionId,
    domain: domain,
    stage: stage,
  });
  console.log("added")
}
  // const addDevice = api.device.add.useMutation();
  console.log("connectionId", connectionId);

  // addDevice.mutate({
  //   connectionId: connectionId,
  //   domain: domain,
  //   stage: stage,
  // });


  res.status(200).json({

    message: JSON.stringify(req.body)

  });
}

//https://iot-security-system.vercel.app/api/connect