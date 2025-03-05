import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const serverSeed = process.env.SERVER_SEED as string;
if (!serverSeed) {
  throw new Error("SERVER_SEED is not set");
}
export const generateRandomDiceRoll = (
  clientSeed: string,
  nonce: number
): {
  roll: number;
  hash: string;
} => {
  // Create HMAC using SHA256
  const hmac = crypto.createHmac("sha256", serverSeed);

  // Combine client seed and nonce
  const message = `${clientSeed}-${nonce}`;
  hmac.update(message);

  // Generate hash
  const hash = hmac.digest("hex");

  // Use first 4 bytes (8 hex characters) for randomness
  const decimal = parseInt(hash.slice(0, 8), 16);

  // Generate number between 1-6
  const roll = (decimal % 6) + 1;

  return { roll, hash };
};
