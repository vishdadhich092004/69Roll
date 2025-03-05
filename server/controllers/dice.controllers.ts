import { Request, Response } from "express";
import { generateRandomDiceRoll } from "../helpers/generate.random.dice.roll";
import { RollRequest, RollResponse } from "../types/dice.types";

let playerBalance = 1000;

export const rollDice = (req: Request, res: Response): any => {
  try {
    const { clientSeed, nonce, betAmount } = req.body as RollRequest;
    // Validate required fields
    if (!clientSeed || !nonce) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate bet amount
    if (!betAmount || betAmount <= 0) {
      return res.status(400).json({ message: "Invalid bet amount" });
    }

    // Check if player has enough balance
    if (betAmount > playerBalance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const result = generateRandomDiceRoll(clientSeed, nonce);
    if (!result) {
      return res.status(400).json({ message: "Invalid dice roll" });
    }

    // Win if roll is 4, 5, or 6 (making the condition more explicit)
    const won = [4, 5, 6].includes(result.roll);
    const winAmount = won ? betAmount * 2 : 0;

    // Update balance: subtract bet and add winnings (if any)
    playerBalance = playerBalance - betAmount + winAmount;

    const response: RollResponse = {
      roll: result.roll,
      hash: result.hash,
      balanceAfter: playerBalance,
      won,
      winAmount,
    };

    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
