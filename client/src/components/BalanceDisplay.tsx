interface BalanceDisplayProps {
  balance: number;
  currency: string;
}

export default function BalanceDisplay({
  balance,
  currency,
}: BalanceDisplayProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Balance</label>
      <div className="text-xl font-semibold">
        {currency}
        {balance.toFixed(2)}
      </div>
    </div>
  );
}
