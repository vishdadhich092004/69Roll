import { Router } from "express";
import { rollDice } from "../controllers/dice.controllers";
const router = Router();

router.post("/roll-dice", rollDice);

export default router;
