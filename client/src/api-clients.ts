export const BASE_URL = import.meta.env.VITE_API_URL as string;
export interface BetFormData {
  clientSeed: string;
  betAmount: number;
  nonce: number;
}

export const rollDice = async (betFormData: BetFormData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/roll-dice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(betFormData),
    });

    const data = await response.json();
    if (!response.ok) {
      return data.responseMessage;
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
