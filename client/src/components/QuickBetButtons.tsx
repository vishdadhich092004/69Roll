interface QuickBetButtonsProps {
  values: number[];
  onSelect: (value: number) => void;
  selectedValue: number;
}

export default function QuickBetButtons({
  values,
  onSelect,
  selectedValue,
}: QuickBetButtonsProps) {
  return (
    <div className="flex gap-2">
      {values.map((value) => (
        <button
          key={value}
          className={`px-4 py-2 rounded-full ${
            Math.abs(value - selectedValue) < 0.01
              ? "bg-[#5cff5c] text-black"
              : "bg-[#5cff5c] text-black opacity-90 hover:opacity-100"
          }`}
          onClick={() => onSelect(value)}
        >
          {value.toFixed(2)}
        </button>
      ))}
    </div>
  );
}
