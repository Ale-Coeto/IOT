import { api } from "~/utils/api";

interface DeviceProps {
    connectionId: string;
    name: string;
}

const Device: React.FC<DeviceProps> = ({ connectionId, name }) => {
    const sendData = api.sendData.send.useMutation();

    const handleClose = () => {
        sendData.mutate({ connectionId: connectionId, data: '{ "action": "cerrar", "message": "hola" }' });
        console.log("send")
    }

    const handleOpen = () => {
        sendData.mutate({ connectionId: connectionId, data: '{ "action": "abrir", "message": "hola" }' });
        console.log("send")
    }

    return (
        <div className="bg-white p-4 rounded-md shadow-md relative hover:-translate-y-2" >
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

            <div className="flex gap-4">
                <button onClick={handleOpen}>
                    abrir
                </button>
                <button onClick={handleClose}>
                    cerrar
                </button>
            </div>

        </div>
    )
}

export default Device;