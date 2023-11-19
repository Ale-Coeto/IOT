import { useEffect } from "react";
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
    const getLog = api.face_recognition.getLogs.useQuery({ userId: session.data?.user.id ?? "" }).data;
    const imgLog = getLog?.[0]?.image ?? "";
    // console.log(imgLog);


    const handleRecognize = () => {
        const result = recognize_face.mutate({ id: 0, userId: session.data?.user.id ?? "" });
        console.log(result);
    }

    useEffect(() => {
        // imgElem.setAttribute('src', "data:image/jpg;base64," + baseStr64);
    })



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
            <div className="w-full h-full md:h-screen bg-gray-100 p-8 pt-14">

                <NavBar />
                <h1 className="text-xl font-bold mb-7">Dashboard</h1>

                <h1 className="text-neutral-900 text-base mb-6 font-medium">
                    Sensor values
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7 mb-20">
                    {widgets.map((widget, key) => (
                        <Widget key={key} title={widget.title} value={widget.value} date={widget.date} />
                    ))}
                </div>

                <div className="mb-20">
                    <h1 className="text-neutral-900 text-base mb-4 font-medium">
                        Security status
                    </h1>

                    <div className="text-gray-700 mb-5">
                        Last person detected
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div>
                            <img src={`data:image/jpeg;base64,${imgLog}`} />

                        </div>

                        <div className="pl-4">
                            <p className="text-gray-700">
                                Name:
                            </p>

                            <p className="text-gray-500 mb-7">
                                {getLog?.[0]?.name ?? "No one"}
                            </p>

                            <p className="text-gray-700">
                                Date:
                            </p>

                            <p className="text-gray-500">
                                {getLog?.[0]?.date ?? "No one"}
                            </p>
                        </div>


                    </div>
                </div>

                {/* <button onClick={handleRecognize}>
                    recognize
                </button > */}


            </div>
        </>
    )
}

export default Dashboard;