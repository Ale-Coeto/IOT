import { signIn, signOut, useSession } from "next-auth/react";

export const AuthButton = () => {
    const { data: sessionData } = useSession();


    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center">
                <p className="text-center text-gray-800">
                    {sessionData && <span className="mr-4"> Logged in as: <span className="text-gray-500"> {sessionData.user?.name} </span> </span>}
                </p>

                <button
                    className="rounded-full bg-emerald-400/80 px-8 py-2 font-semibold text-white no-underline transition hover:bg-emerald-300/80"
                    onClick={sessionData ? () => void signOut() : () => void signIn()}
                    >
                    {sessionData ? "Sign out" : "Sign in"}
                </button>
                </div>
        </div>
    );
}