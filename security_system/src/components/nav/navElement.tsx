import clsx from "clsx";

interface NavElementProps {
    title: string;
    route: string;
    selected: boolean;
    onClick: (route: string) => void;
}

const NavElement: React.FC<NavElementProps> = ({ title, route, onClick, selected }) => {

    return (
        <div className="flex flex-row gap-2 items-center" onClick={() => onClick(route)}>
            <h1 className={clsx(selected ? "text-emerald-400 hover:text-emerald-500" : "text-emerald-600 hover:text-emerald-600",
                "text-lg hover:underline")} >
                {/* <h1 className="text-lg hover:underline text-emerald-600 hover:text-emerald-500"> */}
                {title}
            </h1>
        </div>
    )
}

export default NavElement;