import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai'
import { CldUploadButton } from "next-cloudinary";
import { api } from '~/utils/api';
import { Toaster, toast } from 'react-hot-toast';

interface CldUploadWidgetResults {
    event?: string;
    info?: ob | undefined | string;
}

interface ob {
    secure_url?: string;
    string?: string;

}


export const AddImage = () => {

    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState<string>("");

    const handleUpload = (result: CldUploadWidgetResults) => {
        setImage("");
        if (typeof result?.info !== 'string')
            setImage(result?.info?.secure_url ?? "");

        console.log(image);
    }

    useEffect(() => {
        if (image !== "") {
            setOpenModal(true);
        }
    }, [image])

    return (
        <>
            <Toaster />
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={(result) => handleUpload(result)}
                uploadPreset="m1lkeklu"
                className='z-50'
            >
                <div className="rounded-full border-4 drop-shadow-md border-white p-5 w-min bg-gray-100 hover:bg-gray-50">
                    <AiOutlinePlus className='text-gray-700 text-xl' />
                </div>
            </CldUploadButton>
            {/* <Avatar image={userData?.image ?? 'Logo2.svg'} edit /> */}

            <AddModal isOpen={openModal} image={image} />

        </>
    )
}

interface SaveProps {
    isOpen: boolean;
    image: string;

}

const AddModal: React.FC<SaveProps> = ({ isOpen, image }) => {

    const dialog = useRef<HTMLDialogElement>(null);
    const [name, setName] = useState<string>("");
    const addImage = api.user.addImage.useMutation();
    // console.log(name);

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
            addImage.mutate({ name: name, img: image })
            dialog.current?.close();
        } catch (error) {
            toast.error("Error adding image");
            dialog.current?.close();
        }

        toast.success("Image added successfully");
    }


    return (
        <dialog ref={dialog}
            className={
                "w-auto md:w-1/2 fixed right-9 rounded-lg bg-gray-100 p-5 shadow-lg shadow-emerald-300/30 backdrop:bg-slate-900 backdrop:opacity-40 "
            }
        >
            <div className='flex flex-col md:flex-row p-2 w-full'>

                <img src={image} alt="img" className="h-64" />

                <div className='flex flex-col justify-between px-5 w-full'>
                    <div>
                        <div className='mb-2'>
                            Name
                        </div>
                        <input type="text" className=" rounded-md p-1 ring-1 ring-inset ring-emerald-400 focus:outline-0 text-gray-600" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className='text-gray-400'>
                            Make sure the face of the person is clear
                        </div>
                        <div>
                            <button onClick={handleClick} className='bg-emerald-300 py-2 px-5 rounded-full text-white hover:bg-emerald-200'>
                                Save
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <button className="absolute p-2 right-3 top-3 text-neutral-800" onClick={() => dialog.current?.close()}>
                <AiOutlineCloseCircle className="text-2xl " />
            </button>

        </dialog>
    )
}
export default AddModal;

