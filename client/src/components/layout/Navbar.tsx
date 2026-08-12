import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const auth = useContext(AuthContext);

  function handleLogout() {
    auth?.logout();
  }

  return (
    <header
      className="
        sticky
        top-0
        z-10
        flex
        h-16
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-6
      "
    >
      {/* App Name */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Personal Finance Manager
        </h2>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">

        <div className="hidden text-right sm:block">
          <p className="text-xs text-slate-500">
            Welcome back
          </p>

          <p className="text-sm font-medium text-slate-800">
            {auth?.user?.name || "User"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition-all
            duration-200
            hover:bg-red-700
            hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          Logout
        </button>

      </div>
    </header>
  );
}