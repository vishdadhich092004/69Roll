import React, { useState } from "react";
import { rollDice } from "../api-clients";
function Test() {
  const [betAmount, setBetAmount] = useState("");
  const [nonce, setNonce] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await rollDice({
      betAmount: Number(betAmount),
      nonce: Number(nonce),
      clientSeed: "client-seed",
    });
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-96"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Bet Amount"
          />
          <input
            type="text"
            value={nonce}
            onChange={(e) => setNonce(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nonce"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Test;
