import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {

    const auth = useContext(AuthContext);

    function handleLogout() {
        auth?.logout();
    }

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">

            <h2 className="text-xl font-semibold">
                Personal Finance Manager
            </h2>


            <div className="flex items-center gap-4">

                <span className="text-gray-600">
                    Welcome, {auth?.user?.name || "User"}
                </span>


                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>

            </div>

        </header>
    );
}