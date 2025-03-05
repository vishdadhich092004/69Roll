import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BetAmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: string;
}

export default function BetAmountInput({
  value,
  onChange,
  currency,
}: BetAmountInputProps) {
  const handleHalf = () => {
    const currentValue = Number.parseFloat(value);
    if (!isNaN(currentValue)) {
      onChange((currentValue / 2).toFixed(2));
    }
  };

  const handleDouble = () => {
    const currentValue = Number.parseFloat(value);
    if (!isNaN(currentValue)) {
      onChange((currentValue * 2).toFixed(2));
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <div className="text-sm text-gray-400 mb-2 font-semibold">
          Bet Amount
        </div>
        <div className="text-sm text-gray-400 mb-2 font-semibold">
          {currency}0.00
        </div>
      </div>
      <div className="flex">
        <div className="relative flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-[#1a2533] border-0 h-12 pl-10 pr-2 rounded-l-md"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
            ₹
          </div>
        </div>
        <Button
          variant="outline"
          className="h-12 px-4 bg-[#1a2533] border-0 border-l border-[#2a3a4a] rounded-none"
          onClick={handleHalf}
        >
          ½
        </Button>
        <Button
          variant="outline"
          className="h-12 px-4 bg-[#1a2533] border-0 border-l border-[#2a3a4a] rounded-r-md"
          onClick={handleDouble}
        >
          2×
        </Button>
      </div>
    </div>
  );
}
