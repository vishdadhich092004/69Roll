import { useState } from "react";
import { randomBytes } from "ethers";
interface CreateUserProps {
  onUserCreate: () => void;
}

export default function CreateUser({ onUserCreate }: CreateUserProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }

    // Clear local storage
    localStorage.clear();

    // Set initial balance
    localStorage.setItem("balance", "1000");
    localStorage.setItem("clientSeed", randomBytes(32).toString());

    // Store username
    localStorage.setItem("username", username);

    onUserCreate();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative bg-[#253642] p-8 rounded-xl w-96 shadow-2xl border border-gray-700">
        <h2 className="text-white text-2xl font-bold mb-6">Create New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full p-3 mb-6 rounded-lg bg-[#13212D] text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Start Fresh
          </button>
        </form>
      </div>
    </div>
  );
}
