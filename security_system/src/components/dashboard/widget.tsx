interface WidgetProps {
    title: string;
    value: string | number;
    icon?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, value, icon }) => {

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="font-bold">
                {title}
            </h1>

            <div className="text-gray-400">
                {value}
            </div>
        </div>
    )
}

export default Widget;