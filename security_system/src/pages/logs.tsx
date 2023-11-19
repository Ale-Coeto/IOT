import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import NavBar from "~/components/nav/navBar";
import { api } from "~/utils/api";
import { Toaster, toast } from 'react-hot-toast';
import { AiOutlineCloseCircle } from "react-icons/ai";

const Logs = () => {
    const session = useSession();
    const Logs = api.face_recognition.getLogs.useQuery({ userId: session.data?.user.id ?? "" }).data;
    const [openModal, setOpenModal] = useState(false);
    const [img, setImg] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<number>(-1);
    // console.log(Logs);
    const showImg = (key: number) => {
        setImg(Logs?.[key]?.image ?? "")
        setName(Logs?.[key]?.name ?? "")
        setId(Logs?.[key]?.id ?? -1)
        // console.log("show");
        setOpenModal(!openModal);
    }

    return (
        <>
            <Toaster />
            <div className="w-full h-screen bg-gray-100 p-8">
                <NavBar />
                <h1 className="text-xl font-bold mb-5">Logs</h1>

                <div className="text-gray-500 mb-4">
                    People who have accessed the house
                </div>

                <div>
                    <table className="border-2 w-full self-start">
                        <thead>
                            <tr className="text-start border-2 bg-slate-200">
                                <th className="text-start">Name</th>
                                <th className="text-start">Date</th>
                                <th className="text-start">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Logs ? (
                                Logs.map((log, key) => (
                                    <tr key={key} onClick={() => showImg(key)} className="hover:bg-zinc-200">
                                        <td>{log.name}</td>
                                        <td>{log.date}</td>
                                        <td>{log.time}</td>
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td>No logs</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
            <LogModal isOpen={openModal} image={img} name={name} id={id}/>
        </>
    );
}

export default Logs;

interface SaveProps {
    isOpen: boolean;
    image: string;
    name: string;
    id: number;
}

export const LogModal: React.FC<SaveProps> = ({ isOpen, image, name, id }) => {

    const dialog = useRef<HTMLDialogElement>(null);
    // const addImage = api.user.addImage.useMutation();
    // console.log(name);
    const deleteImage = api.face_recognition.deleteLog.useMutation();

    useEffect(() => {
        if (dialog == null) return;
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    const handleClick = () => {
            try {
                deleteImage.mutate({ id: id });
                dialog.current?.close();
            } catch (error) {
                toast.error("Error deleting log");
                dialog.current?.close();
            }
    
            toast.success("Log deleted successfully");
    }


    return (
        <dialog ref={dialog}
            className={
                " w-1/2 fixed right-9 rounded-lg bg-gray-100 p-5 shadow-lg shadow-emerald-300/30 backdrop:bg-slate-900 backdrop:opacity-40 "
            }
        >
            <div className='flex p-2 w-full'>

                <img src={`data:image/jpeg;base64,${image}`} />

                <div className='flex flex-col justify-between px-5 w-full'>
                    <div >
                        <div className='mb-2'>
                            Name
                        </div>
                        <div className='text-gray-400'>
                            {name}
                        </div>
                    </div>

                        <div>
                            <button onClick={handleClick} className='bg-emerald-300 py-2 px-5 rounded-full text-white hover:bg-emerald-200'>
                                Delete
                            </button>
                        </div>
                </div>

            </div>
            <button className="absolute p-2 right-3 top-3 text-neutral-800" onClick={() => dialog.current?.close()}>
                <AiOutlineCloseCircle className="text-2xl " />
            </button>

        </dialog>
    )
}

