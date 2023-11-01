import { useEffect, useState } from "react";
import Widget from "~/components/dashboard/widget";
import * as io from 'socket.io-client'


const Dashboard = () => {
    const socket = io.connect('http://localhost:3001')
    const [temp, setTemp] = useState(0);

    useEffect(() => {
        // socket.on("receive_temp", (data) => {
        //     setTemp(data.message);
        // }); 
        
    }, [socket]);

    const widgets = [
        { title: "Temperature", value: "20" },
        { title: "Humidity", value: "20" },
        { title: "Door", value: "Open" },
    ]

    return (
        <div className="w-full h-screen bg-gray-100 p-8">
            <h1 className="text-xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-5 gap-7">
                {widgets.map((widget, key) => (
                    <Widget key={key} title={widget.title} value={temp} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard;