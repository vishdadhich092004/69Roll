import { Button } from "@/components/ui/button";

export default function BetButton() {
  return (
    <Button
      className="w-full h-14 bg-[#79FB54] hover:bg-[#4edb4e] text-black font-semibold text-lg rounded-md"
      onClick={() => console.log("Bet placed")}
    >
      Bet
    </Button>
  );
}
