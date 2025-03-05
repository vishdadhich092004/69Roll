import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface BettingModeProps {
  mode: "Manual" | "Auto";
  setMode: (mode: "Manual" | "Auto") => void;
}

export default function BettingMode({ mode, setMode }: BettingModeProps) {
  return (
    <div className="flex items-center bg-[#1a2533] rounded-full p-1 mb-6">
      <Button
        variant="ghost"
        className={`rounded-full flex-1 ${
          mode === "Manual" ? "bg-[#2a3a4a] text-white" : "text-gray-400"
        }`}
        onClick={() => setMode("Manual")}
      >
        Manual
      </Button>
      <Button
        variant="ghost"
        className={`rounded-full flex-1 ${
          mode === "Auto" ? "bg-[#2a3a4a] text-white" : "text-gray-400"
        }`}
        onClick={() => setMode("Auto")}
      >
        Auto
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-gray-400"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
