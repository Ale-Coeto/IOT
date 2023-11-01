import {
    ApiGatewayManagementApiClient,
    PostToConnectionCommand,
    
  } from "@aws-sdk/client-apigatewaymanagementapi";


  export const handler = async (event: { requestContext: { connectionId: string; }; }) => {
    const domain = "https://vczqzgtci9.execute-api.us-east-1.amazonaws.com/production/@connections";
    const stage = "";
    const connectionId: string = event.requestContext.connectionId;
    const callbackUrl = `https://${domain}/${stage}`;
    const client = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });
  
    const requestParams = {
      ConnectionId: connectionId,
      Data: "Hello!",
    };
  
    const command = new PostToConnectionCommand(requestParams);
  
    try {
      await client.send(command);
    } catch (error) {
      console.log(error);
    }
  
    return {
      statusCode: 200,
    };
  };


  