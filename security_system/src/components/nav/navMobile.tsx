import { BsHouseLock } from "react-icons/bs";
import { AuthButton } from "../authButton";
import { useRouter, usePathname } from "next/navigation";
import NavElement from "./navElement";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const NavMobile = () => {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(false);

    // const [selected, setSelected] = useState("dashboard");

    const hanldeClick = (route: string) => {
        router.push(route);
        // setSelected(route);
    }
    // console.log(selected)

    return (
        <div className="w-full z-50 bg-secondary border-b fixed top-5 right-0 left-0 text-white text-2xl" onClick={() => setOpen(!open)}>
            <div className="flex flex-row justify-between px-4">
                <FiMenu className="pb-3 text-4xl" />
                {/* {isLoggedIn && (
                        <div className="text-white text-base mr-2 self-center">
                            {user?.name}
                        </div>
                    )} */}
            </div>

            {open && (
                <>
                    <div className="flex flex-col items-center py-4 px-5 bg-custom-dark-gray w-full">
                        {/* {routes.map((route, key) => (
                                <NavElement key={key} title={} />
                            ))} */}
                        {/* <div className="mt-4 flex flex-row">
                                <Button rounded p4 onClick={handleClick}>
                                    {isLoggedIn ? "Logout" : "Login"}
                                </Button>
                            </div> */}
                    </div>
                </>
            )}
        </div>

    )
}

export default NavMobile;