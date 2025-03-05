import { useState } from "react";
import BettingMode from "./BettingMode";
import BetAmountInput from "./BetAmountInput";
import ProfitDisplay from "./ProfitDisplay";
import BetButton from "./BetButton";
import BettingSlider from "./BettingSlider";
import QuickBetButtons from "./QuickBetButtons";
import BettingStats from "./BettingStats";
export default function BettingInterface() {
  const [mode, setMode] = useState<"Manual" | "Auto">("Manual");
  const [betAmount, setBetAmount] = useState<string>("0.00");
  const [profit, setProfit] = useState<string>("0.00");
  const [sliderValue, setSliderValue] = useState<number>(68.71);
  const [multiplier, setMultiplier] = useState<string>("2.0000");
  const [rollOver, setRollOver] = useState<string>("50.50");
  const [winChance, setWinChance] = useState<string>("49.5000");

  const quickBetValues = [88.02, 58.35, 68.71];

  const handleBetAmountChange = (value: string) => {
    setBetAmount(value);
    const calculatedProfit =
      Number.parseFloat(value) * Number.parseFloat(multiplier);
    setProfit(isNaN(calculatedProfit) ? "0.00" : calculatedProfit.toFixed(2));
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const handleQuickBet = (value: number) => {
    setSliderValue(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-white h-[80vh]">
      <div className="bg-[#253642] p-6 rounded-lg">
        <BettingMode mode={mode} setMode={setMode} />

        <BetAmountInput
          value={betAmount}
          onChange={handleBetAmountChange}
          currency="₹"
        />

        <ProfitDisplay value={profit} currency="₹" />

        <BetButton />
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
          rollOver={rollOver}
          winChance={winChance}
          onMultiplierChange={setMultiplier}
          onRollOverChange={setRollOver}
          onWinChanceChange={setWinChance}
        />
      </div>
    </div>
  );
}
