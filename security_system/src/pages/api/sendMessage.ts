import type { NextApiRequest, NextApiResponse } from "next";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

type ResponseData = {
  message: string;

};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { message, connectionId } = req.body as {
    message: string;
    connectionId: string;
  };
  if (!message) {
    res.status(400).json({
      message: "No message provided",
    });
  }
  const apiGatewayClient = new ApiGatewayManagementApiClient({
        endpoint: "https://vczqzgtci9.execute-api.us-east-1.amazonaws.com/production/",
        region: "us-east-1",
  });

  const postToConnectionCommand = new PostToConnectionCommand({
    ConnectionId: connectionId,
    Data: JSON.stringify({
      action: "message",
      content: message,
    }),
  });

  const result = await apiGatewayClient.send(postToConnectionCommand);
  
  res.status(200).json({
    message: JSON.stringify(result),
   
  });
}