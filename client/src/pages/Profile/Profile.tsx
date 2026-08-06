import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {

    const auth = useContext(AuthContext);

    const user = auth?.user;


    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currency, setCurrency] = useState("ZMW");


    if (!auth) return null;


    async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    try {

        await auth?.updateProfile(
            name,
            email
        );

        alert("Profile updated successfully");

    } catch (error) {

        console.error(
            "Profile update failed:",
            error
        );

        alert("Failed to update profile");
    }
}

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Profile
                </h1>

                <p className="text-gray-500">
                    Manage your personal information.
                </p>
            </div>


            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-md p-6 space-y-4"
            >

                <input
                    className="w-full border rounded p-2"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />


                <input
                    className="w-full border rounded p-2"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />


                <select
                    className="w-full border rounded p-2"
                    value={currency}
                    onChange={(e) =>
                        setCurrency(e.target.value)
                    }
                >

                    <option value="ZMW">
                        ZMW - Zambian Kwacha
                    </option>

                    <option value="USD">
                        USD - US Dollar
                    </option>

                    <option value="EUR">
                        EUR - Euro
                    </option>

                </select>


                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save Profile
                </button>

            </form>

        </div>
    );
}