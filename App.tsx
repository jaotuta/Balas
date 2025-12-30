
import React, { useState } from 'react';
import Wheel from './components/Wheel';
import MagicBean from './components/MagicBean';
import { COLOR_SEGMENTS } from './constants';
import { ColorSegment, SpinResult } from './types';
import { History, Wand2, Palette } from 'lucide-react';

const App: React.FC = () => {
  const [currentResult, setCurrentResult] = useState<ColorSegment | null>(null);
  const [history, setHistory] = useState<SpinResult[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleResult = (segment: ColorSegment) => {
    setCurrentResult(segment);
    setHistory(prev => [{ segment, timestamp: Date.now() }, ...prev].slice(0, 10));
  };

  const closeModal = () => setCurrentResult(null);

  return (
    <div className="min-h-screen relative flex flex-col items-center py-8 px-4 sm:px-8">
      <div className="bg-scroll"></div>

      <header className="text-center mb-12 space-y-4">
        <h1 className="magical-text text-5xl sm:text-7xl font-black text-[#d4af37] magical-glow tracking-widest">
          SORTEIO DE CORES
        </h1>
        <p className="text-[#e2e8f0] text-xl sm:text-2xl font-bold tracking-widest uppercase opacity-80">
          PROVE A BALA DA COR SORTEADA
        </p>
        <div className="flex justify-center gap-4 text-[#d4af37]/60">
           <Wand2 className="w-6 h-6 animate-pulse" />
           <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent self-center"></div>
           <Wand2 className="w-6 h-6 animate-pulse rotate-180" />
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center gap-12">
        <div className="relative py-8">
          <Wheel 
            onResult={handleResult} 
            isSpinning={isSpinning} 
            setIsSpinning={setIsSpinning} 
          />
        </div>

        <div className="w-full max-w-4xl bg-[#1a3a25]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#d4af37]/20 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="text-[#d4af37] w-5 h-5" />
            <h3 className="magical-text text-[#d4af37] font-bold text-lg">CORES DISPONÍVEIS</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {COLOR_SEGMENTS.map(segment => (
              <div key={segment.id} className="p-1 rounded-full border border-[#d4af37]/20">
                <MagicBean color={segment.color} borderColor={segment.borderColor} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-12 w-full max-w-4xl flex justify-between items-center text-[#d4af37]/80">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/20 transition-all"
        >
          <History className="w-5 h-5" />
          <span className="font-bold text-sm tracking-widest">HISTÓRICO</span>
        </button>
        <div className="hidden sm:block text-sm italic opacity-50 font-bold">
          "A cor é o único guia..."
        </div>
      </footer>

      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowHistory(false)}></div>
          <div className="relative w-full max-w-xs bg-[#0d1a10] border-l border-[#d4af37]/30 h-full p-8 shadow-2xl overflow-y-auto">
            <h2 className="magical-text text-[#d4af37] text-3xl font-bold mb-8 border-b border-[#d4af37]/20 pb-4">CORES SORTIADAS</h2>
            <div className="space-y-4">
              {history.length === 0 ? (
                <p className="text-[#e2e8f0]/40 italic">Nada ainda...</p>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-[#1a3a25]/40 p-4 rounded-xl border border-[#d4af37]/10">
                    <MagicBean color={item.segment.color} borderColor={item.segment.borderColor} size="sm" />
                    <div>
                      <div className="text-[#e2e8f0] font-bold uppercase tracking-tighter text-sm">{item.segment.displayName}</div>
                      <div className="text-[#d4af37]/60 text-xs">{new Date(item.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {currentResult && !isSpinning && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeModal}></div>
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#1a3a25] to-[#0d1a10] border-2 border-[#d4af37] rounded-[50px] p-10 text-center shadow-[0_0_150px_rgba(212,175,55,0.4)] animate-in fade-in zoom-in duration-500">
            <div className="space-y-8">
              <h4 className="text-[#d4af37] text-sm font-black tracking-[0.6em] uppercase opacity-70">A Cor da Vez</h4>
              
              <div className="flex justify-center py-4">
                <div className="w-48 h-32 rounded-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)]" 
                     style={{ 
                       backgroundColor: currentResult.color, 
                       border: `4px solid ${currentResult.borderColor}`,
                       boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.4)`
                     }}>
                  <div className="absolute top-4 left-8 w-1/2 h-1/4 bg-white opacity-40 rounded-full blur-[2px]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="magical-text text-[#fef3c7] text-4xl font-black uppercase tracking-widest">{currentResult.displayName}</h2>
                <p className="text-[#e2e8f0]/60 italic text-sm">Procure esta cor no seu pacote e prove!</p>
              </div>

              <button 
                onClick={closeModal}
                className="w-full mt-8 py-6 bg-[#d4af37] hover:bg-[#b8860b] text-[#1a3a25] font-black rounded-3xl text-2xl transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                PROVAR AGORA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
