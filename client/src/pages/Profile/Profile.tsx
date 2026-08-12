import { useState } from "react";

export default function Profile() {
  const savedProfile = localStorage.getItem("profile");

  const profile = savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "",
        email: "",
        currency: "ZMW",
      };

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [currency, setCurrency] = useState(profile.currency);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const updatedProfile = {
      name,
      email,
      currency,
    };

    localStorage.setItem(
      "profile",
      JSON.stringify(updatedProfile)
    );

    alert("Profile saved successfully");
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>

        <p className="mt-1 text-slate-500">
          Manage your personal information and preferences.
        </p>
      </div>

      {/* Profile Form */}
      <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update the information associated with your profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                p-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                p-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Currency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Currency
            </label>

            <select
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                p-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
          </div>

          {/* Save */}
          <div className="pt-2">
            <button
              type="submit"
              className="
                rounded-lg
                bg-blue-600
                px-5
                py-3
                font-medium
                text-white
                transition-all
                duration-200
                hover:bg-blue-700
                hover:scale-[1.01]
                active:scale-[0.98]
              "
            >
              Save Profile
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}