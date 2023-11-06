import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "~/utils/api";


type ResponseData = {
  message: string;
};

interface Body {
  connectionId: string;
  domain: string;
  stage: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {

  const { connectionId, domain, stage } = req.body as Body;

  // const id = req.headers.connectionid as string;
  // if (id) {
  //   console.log("connectionId", id);
  //   void axios.post("/api/testSend", {
  //     message: id.split(",")[0],
  //     connectionId: id,
  //   });
  // }

  
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