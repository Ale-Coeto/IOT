interface DeviceProps {
    connectionId: string;
    name: string;
}

const Device: React.FC<DeviceProps> = ({ connectionId, name }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md relative">
            <div className="bg-green-400 h-4 w-4 absolute right-4 top-4 rounded-full shadow-inner " />

            <div className="font-bold text-neutral-800 pb-3">
                NodeMCU
            </div>
            <div className="flex flex-row gap-2">
                <div className="text-neutral-700">
                    Name
                </div>
                <div className="text-gray-400">
                    {name}
                </div>
            </div>

            <div className="flex flex-row gap-2">
                <div className="text-neutral-700">
                    Connection ID
                </div>
                <div className="text-gray-400">
                    {connectionId}
                </div>
            </div>

        </div>
    )
}

export default Device;