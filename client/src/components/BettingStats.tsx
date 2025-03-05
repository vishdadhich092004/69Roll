import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";

interface BettingStatsProps {
  multiplier: string;
  rollOver: string;
  winChance: string;
  onMultiplierChange: (value: string) => void;
  onRollOverChange: (value: string) => void;
  onWinChanceChange: (value: string) => void;
}

export default function BettingStats({
  multiplier,
  rollOver,
  winChance,
  onMultiplierChange,
  onRollOverChange,
  onWinChanceChange,
}: BettingStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 bg-[#253642] rounded-lg p-6">
      <div>
        <div className="text-gray-400 mb-2">Multiplier</div>
        <div className="relative">
          <Input
            type="text"
            value={multiplier}
            onChange={(e) => onMultiplierChange(e.target.value)}
            className="bg-[#1a2533] border-0 h-12 pr-10 rounded-md"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            X
          </div>
        </div>
      </div>

      <div>
        <div className="text-gray-400 mb-2">Roll Over</div>
        <div className="relative">
          <Input
            type="text"
            value={rollOver}
            onChange={(e) => onRollOverChange(e.target.value)}
            className="bg-[#1a2533] border-0 h-12 rounded-md"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <RefreshCw className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <div className="text-gray-400 mb-2">Win Chance</div>
        <div className="relative">
          <Input
            type="text"
            value={winChance}
            onChange={(e) => onWinChanceChange(e.target.value)}
            className="bg-[#1a2533] border-0 h-12 pr-10 rounded-md"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            %
          </div>
        </div>
      </div>
    </div>
  );
}
