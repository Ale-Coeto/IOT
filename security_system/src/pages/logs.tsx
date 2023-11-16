import { useSession } from "next-auth/react";
import NavBar from "~/components/nav/navBar";
import { api } from "~/utils/api";

const Logs = () => {
    const session = useSession();
    const Logs = api.face_recognition.getLogs.useQuery({ userId: session.data?.user.id ?? "" }).data;
    // console.log(Logs);
    return (
        <div className="w-full h-screen bg-gray-100 p-8">
            <NavBar />
            <h1 className="text-xl font-bold mb-5">Logs</h1>

            <div className="text-gray-500 mb-4">
                People who have accessed the house
            </div>

            <div>
                <table className="border-2 w-full self-start">
                    <tr className="text-start border-2 bg-slate-200">
                        <th className="text-start">Name</th>
                        <th className="text-start">Date</th>
                        <th className="text-start">Time</th>
                    </tr>

                    {Logs ? (
                        Logs.map((log, key) => (
                            <tr key={key}>
                                <td>{log.name}</td>
                                <td>{log.date}</td>
                                <td>{log.time}</td>
                            </tr>

                        ))
                    ) : (
                        <tr>
                            <td>No logs</td>
                        </tr>
                    )}

                </table>
            </div>
        </div>
    );
}

export default Logs;