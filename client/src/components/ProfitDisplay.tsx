import { Input } from "@/components/ui/input";

interface ProfitDisplayProps {
  value: string;
  currency: string;
}

export default function ProfitDisplay({ value, currency }: ProfitDisplayProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <div className="text-sm text-gray-400 mb-2 font-semibold">
          Profit on Win
        </div>
        <div className="text-sm text-gray-400 mb-2 font-semibold">
          {currency}0.00
        </div>
      </div>
      <div className="relative">
        <Input
          type="text"
          value={value}
          readOnly
          className="bg-[#1a2533] border-0 h-12 pl-10 pr-2 rounded-md"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
          ₹
        </div>
      </div>
    </div>
  );
}
