import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";

export const AuthButton = ({ mobile }: { mobile?: boolean }) => {
    const { data: sessionData } = useSession();


    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={clsx("flex items-center",
                mobile ? "flex-col gap-2" : "flex-row gap-4"
            )}>
                <p className={clsx("text-center ",
                    mobile ? "text-lg text-" : "text-gray-800"
                )}>
                    {sessionData && <span className="mr-4"> Logged in as: <span className="text-gray-500"> {sessionData.user?.name} </span> </span>}
                </p>

                <button
                    className={clsx("rounded-full ",
                        mobile ? "text-base bg-slate-100 hover:bg-slate-200 text-gray-600 px-3 py-1" : "font-semibold bg-emerald-400/80 px-8 py-2  text-white no-underline transition hover:bg-emerald-300/80")}
                    onClick={sessionData ? () => void signOut() : () => void signIn()}
                >
                    {sessionData ? "Sign out" : "Sign in"}
                </button>
            </div>
        </div>
    );
}