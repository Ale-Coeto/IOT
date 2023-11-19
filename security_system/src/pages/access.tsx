import { useEffect } from "react";
import { AddImage } from "~/components/dashboard/addImg";
import { UserImage } from "~/components/dashboard/userImg";
import NavBar from "~/components/nav/navBar";
import { api } from "~/utils/api";

const Access = () => {
    const images = api.user.getImages.useQuery().data;

    useEffect(() => {
        // window.location.reload();
    }, [images?.images?.images])

    return (
        <div className="w-full h-screen bg-gray-100 p-8 pt-14">
            <NavBar />
            <h1 className="text-xl font-bold mb-5">Access</h1>


            {images?.length !== 0 && images !== undefined && images !== null ? (
                <div>
                    <div className="text-gray-500 mb-4">
                        People who have access to the house
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-5 h-72">
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
    );
}

export default Access;