import { useEffect, useState } from "react";
import Widget from "~/components/dashboard/widget";
import * as io from 'socket.io-client'
import { AuthButton } from "~/components/authButton";
import { api } from "~/utils/api";
import { AddImage } from "~/components/dashboard/addImg";
import { UserImage } from "~/components/dashboard/userImg";
import { Toaster } from 'react-hot-toast'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsHouseLock } from "react-icons/bs";

const Dashboard = () => {

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status !== "authenticated") {
            router.push("/");
        }
    }, [session?.status, router]);

    // const socket = io.connect('http://localhost:3001')
    // const [temp, setTemp] = useState(0);
    const images = api.user.getImages.useQuery().data;
    const recognize = api.face_recognition.recognizeFace.useMutation();
    // // console.log(images);
    // useEffect(() => {
    //     // socket.on("receive_temp", (data) => {
    //     //     setTemp(data.message);
    //     // }); 

    // }, [socket]);

    useEffect(() => {
        // window.location.reload();
    }, [images?.images?.images])

    const temp = 10;

    const widgets = [
        { title: "Luz", value: "20", date: "20/10/2021" },
        { title: "Temperatura", value: "20", date: "20/10/2021" },
        { title: "Gas", value: "Open", date: "20/10/2021" },
    ]
    const [arr, setArr] = useState<string[]>([]);
    // useEffect(() => {
    //     if (images?.images?.images === undefined) return;
        
    //     for (let i = 0; i < images?.images?.images.length; i++) {
    //         const img = images?.images?.images[i];
    //         if (img === undefined) continue;
    //         arr.push(img.url);
    //     }
    // })
    // const recognize = api.face_recognition.recognizeFace.useQuery({ img: "00000", images: arr });

    const handleC = () => {
        if (images?.images?.images === undefined) return;
        for (let i = 0; i < images?.images?.images.length; i++) {
            const img = images?.images?.images[i];
            if (img === undefined) continue;
            arr.push(img.url);
        }
        recognize.mutate({ img: "00000", images: arr });
    }

    return (
        <>
            <Toaster />
            <div className="w-full h-screen bg-gray-100 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex flex-row gap-2 items-center">
                        <BsHouseLock className="text-xl" />
                        <h1 className="text-xl font-bold">Dashboard</h1>
                    </div>
                    <AuthButton />

                </div>

                <h1 className="text-neutral-900 text-base mb-6">
                    Sensor values
                </h1>

                <div className="grid grid-cols-5 gap-7 mb-24">
                    {widgets.map((widget, key) => (
                        <Widget key={key} title={widget.title} value={temp} date={widget.date} />
                    ))}
                </div>


                <h1 onClick={handleC} className="text-neutral-900 text-base mb-4">
                    People with access
                </h1>

                {images?.length !== 0 && images !== undefined && images !== null ? (
                    <div>
                        <div className="text-gray-500 mb-4">
                            People who have access to the house
                        </div>
                        <div className="flex flex-row items-center gap-5 h-72">
                            {images?.images?.images.map((image, key) => (
                                <UserImage key={key} image={image.url} name={image.name} id={image.id} />
                            ))}
                            <div className="">
                                <AddImage />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-gray-500 mb-4">
                            Add an image to give access
                        </div>
                        <AddImage />

                    </div>
                )
                }

            </div>
        </>
    )
}

export default Dashboard;