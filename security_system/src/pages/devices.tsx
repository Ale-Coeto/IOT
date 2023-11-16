import Device from "~/components/devices/devices";
import NavBar from "~/components/nav/navBar";
import { api } from "~/utils/api";

const Devices = () => {
    const devices = api.device.getDevices.useQuery().data;

    return (
        <div className="w-full h-screen bg-gray-100 p-8">
            <NavBar />
            <h1 className="text-xl font-bold mb-5">Devices</h1>

            <div className="text-gray-500 mb-4">
                Devices avaliable
            </div>

            <div className="grid grid-cols-4">
                {devices?.map((device, key) => (
                    <Device name={device.name} connectionId={device.connectionId} />
                ))}
            </div>
        </div>
    );
}

export default Devices;