import * as io from 'socket.io-client'
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const SendMessage = () => {
    const socket = io.connect('http://localhost:3001')
    const [data, setData] = useState("a");
    const send = api.data.sendData.useMutation();


    const sendMessage = () => {
        // socket.emit("send_message", { message: data });
        console.log("send message")
    }

    const handleClick = () => {
        const temp = parseInt(data)
        send.mutate({ temp: temp })
    }
    useEffect(() => {
        // socket.on("recieve_temp", (data) => {
        //     alert(data.message);
        // });
    }, [socket]);

    return (
        <div>
            <input className="border-2 m-3" placeholder="message" onChange={(e) => setData(e.target.value)} />
            <button onClick={sendMessage} className="p-2 bg-neutral-100 rounded-md">
                Send
            </button>

            <button onClick={handleClick} className="p-2 bg-neutral-100 rounded-md ml-4">
                Save
            </button>
        </div>
    )
}

export default SendMessage;