
import React, { useState, useRef } from 'react';
import { COLOR_SEGMENTS } from '../constants';
import { ColorSegment } from '../types';

interface WheelProps {
  onResult: (segment: ColorSegment) => void;
  isSpinning: boolean;
  setIsSpinning: (val: boolean) => void;
}

const Wheel: React.FC<WheelProps> = ({ onResult, isSpinning, setIsSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const totalItems = COLOR_SEGMENTS.length;
  const degreesPerItem = 360 / totalItems;

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalSpin = rotation + (360 * 10) + extraDegrees;
    
    setRotation(totalSpin);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = totalSpin % 360;
      // O cálculo garante que cada segmento (cor única) tenha a mesma chance
      const winningIndex = Math.floor(((360 - (normalizedRotation % 360)) / degreesPerItem) % totalItems);
      
      onResult(COLOR_SEGMENTS[winningIndex]);
    }, 4000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-40 drop-shadow-xl">
        <div className="w-10 h-12 bg-gradient-to-b from-[#fcd34d] to-[#d4af37] border-2 border-[#b8860b]" 
             style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}></div>
      </div>

      <div 
        className="relative w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full border-[12px] border-[#d4af37] bg-[#0d1a10] shadow-[0_0_60px_rgba(212,175,55,0.4)] overflow-hidden transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0,0.15,1)]"
        style={{ transform: `rotate(${rotation}deg)` }}
        ref={wheelRef}
      >
        {COLOR_SEGMENTS.map((segment, index) => {
          const angle = index * degreesPerItem;
          return (
            <div 
              key={segment.id}
              className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div 
                className="w-full h-full border-r border-black/20"
                style={{ 
                    backgroundColor: segment.color,
                    clipPath: `polygon(0 0, 105% 0, 0 105%)`,
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15)'
                }}
              >
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <button
          onClick={spin}
          disabled={isSpinning}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#b8860b] via-[#d4af37] to-[#fef3c7] border-4 border-[#854d0e] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.5)] flex items-center justify-center group active:scale-90 transition-all duration-150 disabled:opacity-90"
        >
          <div className="magical-text text-[#1a3a25] font-black text-2xl sm:text-3xl group-hover:scale-110 transition-transform uppercase tracking-tighter drop-shadow-sm">
            {isSpinning ? '...' : 'GIRAR'}
          </div>
        </button>
        <div className="absolute inset-[-10px] rounded-full border-2 border-[#d4af37]/40 pointer-events-none"></div>
      </div>

      <div className="absolute inset-[-20px] rounded-full bg-[#d4af37]/5 blur-3xl -z-10"></div>
    </div>
  );
};

export default Wheel;
