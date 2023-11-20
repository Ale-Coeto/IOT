import { BsHouseLock } from "react-icons/bs";
import { AuthButton } from "../authButton";
import { useRouter, usePathname } from "next/navigation";
import NavElement from "./navElement";

interface route {
    title: string;
    route: string;
    path: string;
}

const NavDesktop = ({ routes }: { routes: route[] }) => {
    const router = useRouter();
    const path = usePathname();

    // const [selected, setSelected] = useState("dashboard");

    const hanldeClick = (route: string) => {
        router.push(route);
        // setSelected(route);
    }
    // console.log(selected)

    return (
        <div className="fixed right-0 left-0 invisible h-0 md:h-auto md:visible flex items-center justify-between mb-8 p-4 pr-4">
            <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2 items-center">
                    <BsHouseLock className="text-xl" />
                    <h1 className="text-xl font-bold">Safe Space</h1>
                </div>

                <span className="text-gray-500">/</span>
                <NavElement title="Dashboard" route="dashboard" onClick={hanldeClick} selected={path === "/dashboard"} />

                <span className="text-gray-500">/</span>
                <NavElement title="Logs" route="logs" onClick={hanldeClick} selected={path === "/logs"} />

                <span className="text-gray-500">/</span>
                <NavElement title="Devices" route="devices" onClick={hanldeClick} selected={path === "/devices"} />

                <span className="text-gray-500">/</span>
                <NavElement title="Access" route="access" onClick={hanldeClick} selected={path === "/access"} />

            </div>

            <AuthButton />

        </div>
    )
}

export default NavDesktop;