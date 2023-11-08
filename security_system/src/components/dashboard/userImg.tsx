import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { api } from '~/utils/api';
import toast from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface AddImageProps {
    name: string;
    image: string;
    id: string;
}

export const UserImage: React.FC<AddImageProps> = ({ name, image, id }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <EditModal isOpen={openModal} id={id} />
            <div className='flex flex-col items-center h-72'>

                <div onClick={() => setOpenModal(!openModal)} className="rounded-full border-4 drop-shadow-lg border-white h-56 aspect-square hover:-translate-y-3">
                    <Image src={image} alt={name} fill className='rounded-full object-cover aspect-square ' />
                </div>

                <div className='text-gray-700 pt-2'>
                    {name}
                </div>

            </div>
        </>
    )
}

interface SaveProps {
    isOpen: boolean;
    id: string;
}

const EditModal: React.FC<SaveProps> = ({ isOpen, id }) => {

    const dialog = useRef<HTMLDialogElement>(null);
    const [name, setName] = useState<string>("");
    const deleteImage = api.user.deleteImage.useMutation();
    const editImage = api.user.editImage.useMutation();
    // console.log(name);

    useEffect(() => {
        if (dialog == null) return;
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    const handleDelete = () => {

        try {
            deleteImage.mutate({ id: id });
            dialog.current?.close();
        } catch (error) {
            toast.error("Error deleting image");
            dialog.current?.close();
        }

        toast.success("Image deleted successfully");
    }

    const handleSave = () => {
        try {
            editImage.mutate({ id: id, name: name });
            dialog.current?.close();
        } catch (error) {
            toast.error("Error editing image");
            dialog.current?.close();
        }

        toast.success("Image edited successfully");
    }


    return (
        <dialog ref={dialog}
            className={
                " w-1/3 fixed right-9 rounded-lg bg-gray-100 p-5 shadow-lg shadow-emerald-300/30 backdrop:bg-slate-900 backdrop:opacity-40 "
            }
        >
            <div className='text-neutral-800 mb-4 pl-2'>
                What do you want to do?
            </div>

            <div className='mb-5'>
                <div className='mb-2'>
                    New name
                </div>
                <input type="text" className=" rounded-md p-1 ring-1 ring-inset ring-emerald-400 focus:outline-0 text-gray-600" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='flex gap-3 p-2 w-full'>



                <button onClick={() => dialog.current?.close} className='bg-gray-300 py-2 px-5 rounded-full text-white hover:bg-gray-200'>
                    Cancel
                </button>

                <button onClick={handleDelete} className='bg-red-400 py-2 px-5 rounded-full text-white hover:bg-red-300'>
                    Delete
                </button>

                <button onClick={handleSave} className='bg-emerald-300 py-2 px-5 rounded-full text-white hover:bg-emerald-200'>
                    Save
                </button>


            </div>
            <button className="absolute p-2 right-3 top-3 text-neutral-800" onClick={() => dialog.current?.close()}>
                <AiOutlineCloseCircle className="text-2xl " />
            </button>

        </dialog>
    )
}
export default EditModal;