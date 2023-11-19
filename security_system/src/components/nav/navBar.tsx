import NavDesktop from "./navDesktop";
import NavMobile from "./navMobile";

const NavBar = () => {

    const routes = [
        { title: "Dashboard", route: "dashboard", path: "/dashboard" },
        { title: "Logs", route: "logs", path: "/logs" },
        { title: "Devices", route: "devices", path: "/devices" },
        { title: "Access", route: "access", path: "/access" },
    ]

    return (
        <div className="z-50 fixed h-min top-0 w-full">
            <NavDesktop routes={routes} />
            <NavMobile routes={routes} />
        </div>
    )
}

export default NavBar;