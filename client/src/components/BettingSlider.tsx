import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { AlignJustify } from "lucide-react";
interface BettingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function BettingSlider({ value, onChange }: BettingSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    onChange(percentage);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      onChange(percentage);
    },
    [isDragging, onChange]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative">
      <div className="flex justify-between mb-2 text-gray-400">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>

      <div
        ref={sliderRef}
        className="h-12 bg-[#2a3a4a] rounded-full relative cursor-pointer border-2 border-[#3a4a5a] px-4 flex items-center"
        onClick={handleSliderClick}
      >
        {/* Progress bar - red to green gradient */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-4 h-[20%] rounded-full"
          style={{
            width: `${value}%`,
            background: "linear-gradient(to right, #ff3b5c 0%, #5cff5c 100%)",
          }}
        />

        {/* Slider handle */}
        <div
          className="absolute top-0 h-full aspect-square bg-[#4a7eff] rounded-md flex items-center justify-center transform -translate-x-1/2"
          style={{ left: `${value}%` }}
          onMouseDown={handleMouseDown}
        >
          <AlignJustify className="h-6 w-6 text-white rotate-90" />
        </div>

        {/* Value indicator */}
        <div
          className="absolute -top-16 transform -translate-x-1/2 bg-white text-[#1a2533] font-bold p-2 rounded-md"
          style={{
            left: `${value}%`,
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 75%, 60% 75%, 50% 100%, 40% 75%, 0% 75%)",
          }}
        >
          <div className="pb-2">{value.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
