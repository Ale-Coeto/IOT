import { useEffect, useState } from "react";
import Widget from "~/components/dashboard/widget";
import { api } from "~/utils/api";
import { Toaster } from 'react-hot-toast'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "~/components/nav/navBar";
import format from "date-fns/format";


const Dashboard = () => {

    const session = useSession();
    const router = useRouter();
    const recognize_face = api.face_recognition.recognize.useMutation();
    const sendData = api.sendData.send.useMutation();

    const handleRecognize = () => {
        const result = recognize_face.mutate({ id: 0, userId: "clp01vc84000098nfj1dxjho1" });
        console.log(result);
    }

    const send = () => {
        sendData.mutate({ connectionId: "Of7CPf_zIAMCI8A=", data: '{ "action": "sendMessage", "message": "hola" }' });

    }

    useEffect(() => {
        if (session?.status !== "authenticated") {
            router.push("/");
        }
    }, [session?.status, router]);

    const id = session.data?.user.id ?? "";
    const temp = api.sensors.getSensorLogs.useQuery({ userId: id, type: "temperature" }).data;
    const tempDate = temp?.createdAt ?? new Date("2000/1/1");

    const gas = api.sensors.getSensorLogs.useQuery({ userId: id, type: "gas" }).data;
    const gasDate = gas?.createdAt ?? new Date("2000/1/1, 00:00:00");

    const widgets = [
        { title: "Luz", value: "20", date: "20/10/2021" },
        { title: "Temperatura", value: temp?.value ?? -1, date: format(tempDate, "dd/MM/yyyy - hh:mm aaaa") },
        { title: "Gas", value: gas?.value ?? 0, date: format(gasDate, "dd/MM/yyyy - hh:mm aaaa") },
    ]
   

    return (
        <>
            <Toaster />
            <div className="w-full h-screen bg-gray-100 p-8">

                <NavBar />
                <h1 className="text-xl font-bold mb-5">Dashboard</h1>

                <h1 className="text-neutral-900 text-base mb-6">
                    Sensor values
                </h1>

                <div className="grid grid-cols-5 gap-7 mb-20">
                    {widgets.map((widget, key) => (
                        <Widget key={key} title={widget.title} value={widget.value} date={widget.date} />
                    ))}
                </div>

                <div className="mb-20">
                    <h1 className="text-neutral-900 text-base mb-4">
                        Security status
                    </h1>
                    <div className="pl-4">
                        <p className="text-gray-700">
                            Door:
                        </p>

                        <p className="text-gray-500 mb-7">
                            Opened
                        </p>

                        <p className="text-gray-700">
                            Last person to enter:
                        </p>

                        <p className="text-gray-500">
                            Ale
                        </p>
                    </div>

                </div>




                <button onClick={handleRecognize}>
                    recognize
                </button >

                <button onClick={send}>
                    send
                </button >

            </div>
        </>
    )
}

export default Dashboard;