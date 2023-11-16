interface WidgetProps {
    title: string;
    value: string | number;
    date: string;
}

const Widget: React.FC<WidgetProps> = ({ title, value, date }) => {
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h1 className="font-bold">
                {title}
            </h1>

            <div className="text-gray-400">
                {value}
            </div>
            <div className="text-neutral-500">
                {date}
            </div>
        </div>
    )
}

export default Widget;