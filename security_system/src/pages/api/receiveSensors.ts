import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sensorsCaller } from "~/server/api/ApiCaller";

type ResponseData = {
    message: string;
  };

type sensorData = {
    type: string;
    value: string;
    userId?: string;
}

export default async function POST(req: Request, res: NextApiResponse<ResponseData>) {
    try {

        const body = await req.body as unknown as sensorData;

        if (body !== undefined) {
            console.log(body);
            if (!body.userId)
                body.userId = "clp01vc84000098nfj1dxjho1";
            await sensorsCaller.addSensorLog({ type: body.type, value: body.value, userId: body.userId });
        }


        // console.log(type);
        
        res.status(200).json({
            message: "Data recieved successfully",
          });
        
    } catch (error) {
        console.log(error, "Rate error");
        res.status(400).json({
            message: "Error: " + JSON.stringify(error),
          });
    }
}