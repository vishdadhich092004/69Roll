import { Button } from "@/components/ui/button";

interface BetButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BetButton({ onClick, disabled }: BetButtonProps) {
  return (
    <Button
      className="w-full h-14 bg-[#79FB54] hover:bg-[#4edb4e] text-black font-semibold text-lg rounded-md cursor-pointer"
      onClick={onClick}
      disabled={disabled}
    >
      Bet
    </Button>
  );
}
