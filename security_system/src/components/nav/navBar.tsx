import NavDesktop from "./navDesktop";
import NavMobile from "./navMobile";

const NavBar = () => {


    return (
        <div className="h-min top-0 w-full">
            <NavDesktop />
            <NavMobile />
        </div>
    )
}

export default NavBar;