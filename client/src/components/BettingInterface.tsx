import { useState, useEffect } from "react";
import BettingMode from "./BettingMode";
import BetAmountInput from "./BetAmountInput";
import ProfitDisplay from "./ProfitDisplay";
import BetButton from "./BetButton";
import BettingSlider from "./BettingSlider";
import QuickBetButtons from "./QuickBetButtons";
import BettingStats from "./BettingStats";
import { rollDice } from "../api-clients";
import BalanceDisplay from "./BalanceDisplay";
import CreateUser from "./CreateUser";

export default function BettingInterface() {
  const [mode, setMode] = useState<"Manual" | "Auto">("Manual");
  const [betAmount, setBetAmount] = useState<string>("0.00");
  const [profit, setProfit] = useState<string>("0.00");
  const [sliderValue, setSliderValue] = useState<number>(68.71);
  const [multiplier, setMultiplier] = useState<string>("2.0000");
  const [winChance, setWinChance] = useState<string>("49.5000");
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? parseFloat(savedBalance) : 1000;
  });
  const [showCreateUser, setShowCreateUser] = useState(() => {
    return !localStorage.getItem("username");
  });

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  const quickBetValues = [88.02, 58.35, 68.71];

  const handleBet = async () => {
    const betFormData = {
      betAmount: Number(betAmount),
      nonce: Math.floor(Math.random() * 1000000),
      clientSeed: localStorage.getItem("clientSeed") || "",
    };
    console.log(betFormData);
    const response = await rollDice(betFormData);
    console.log("Bet response:", response);
    setBalance(response.balanceAfter);
  };

  const handleBetAmountChange = (value: string) => {
    setBetAmount(value);
    const calculatedProfit =
      Number.parseFloat(value) * Number.parseFloat(multiplier);
    setProfit(isNaN(calculatedProfit) ? "0.00" : calculatedProfit.toFixed(2));
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const newWinChance = (100 - value).toFixed(4);
    setWinChance(newWinChance);
    const houseEdge = 0.01; // 1%
    const newMultiplier = ((1 - houseEdge) * (100 / (100 - value))).toFixed(4);
    setMultiplier(newMultiplier);
  };

  const handleQuickBet = (value: number) => {
    handleSliderChange(value);
  };

  const handleUserCreate = () => {
    setShowCreateUser(false);
    const savedBalance = localStorage.getItem("balance");
    setBalance(savedBalance ? parseFloat(savedBalance) : 1000);
  };

  const handleClearUser = () => {
    localStorage.clear();
    setShowCreateUser(true);
  };

  return (
    <>
      {showCreateUser && <CreateUser onUserCreate={handleUserCreate} />}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-white h-[80vh]">
        <div className="bg-[#253642] p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <BalanceDisplay balance={balance} currency="₹" />
            <button
              onClick={handleClearUser}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Reset User
            </button>
          </div>
          <BettingMode mode={mode} setMode={setMode} />

          <BetAmountInput
            value={betAmount}
            onChange={handleBetAmountChange}
            currency="₹"
          />

          <ProfitDisplay value={profit} currency="₹" />

          <BetButton
            onClick={handleBet}
            disabled={Number(betAmount) > balance}
          />
        </div>

        <div className="lg:col-span-2 bg-[#13212D] p-6 rounded-lg flex flex-col h-full justify-between">
          <div className="flex justify-end">
            <QuickBetButtons
              values={quickBetValues}
              onSelect={handleQuickBet}
              selectedValue={sliderValue}
            />
          </div>

          <BettingSlider value={sliderValue} onChange={handleSliderChange} />

          <BettingStats
            multiplier={multiplier}
            rollOver={sliderValue}
            winChance={winChance}
            onMultiplierChange={setMultiplier}
            onRollOverChange={setSliderValue}
            onWinChanceChange={setWinChance}
          />
        </div>
      </div>
    </>
  );
}
