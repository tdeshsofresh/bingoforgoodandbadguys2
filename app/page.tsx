'use client';

import { useState, useEffect } from 'react';
import { BingoCard } from '@/components/game/BingoCard';
import { GameControls } from '@/components/game/GameControls';
import { InfoPanel } from '@/components/game/InfoPanel';
import { Victory } from '@/components/game/Victory';
import { generateBingoCard, checkWinCondition } from '@/utils/gameUtils';
import type { GameState } from '@/types/game';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    currentCard: null,
    calledFigures: [],
    markedCells: [],
    hasWon: false,
  });

  const [fartSound] = useState(() => {
    if (typeof window !== 'undefined') {
      return new Audio('/sounds/fart.mp3');
    }
    return null;
  });

  useEffect(() => {
    // Initialize game with a new card
    if (!gameState.currentCard) {
      const initialCard = generateBingoCard();
      console.log('New game started with card:', initialCard);
      setGameState(prev => ({ ...prev, currentCard: initialCard }));
    }
  }, [gameState.currentCard]);

  const handleCellClick = (figureId: string) => {
    if (gameState.hasWon) return;

    console.log('Cell clicked:', figureId);
    console.log('Called figures:', gameState.calledFigures);
    console.log('Marked cells:', gameState.markedCells);

    if (gameState.calledFigures.includes(figureId)) {
      setGameState(prev => {
        const newMarkedCells = [...prev.markedCells, figureId];
        const hasWon = prev.currentCard ? checkWinCondition(newMarkedCells, prev.currentCard.cells) : false;
        
        console.log('Win condition check:', hasWon);
        
        return {
          ...prev,
          markedCells: newMarkedCells,
          hasWon: hasWon
        };
      });
    } else {
      console.log('Playing fart sound...');
      // Play fart sound for incorrect selection
      if (fartSound) {
        fartSound.currentTime = 0; // Reset sound to start
        fartSound.play().catch(e => console.log('Error playing sound:', e));
      }
    }
  };

  const handleNewGame = () => {
    console.log('Starting new game...');
    const newCard = generateBingoCard();
    setGameState({
      currentCard: newCard,
      calledFigures: [],
      markedCells: [],
      hasWon: false,
    });
  };

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-blue-400 via-purple-400 to-red-400">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Historical Figures Bingo
        </h1>
        <h2 className="text-2xl text-center mb-8 text-white/90">
          World War Heroes and Villains
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {gameState.currentCard && (
              <BingoCard
                card={gameState.currentCard}
                markedCells={gameState.markedCells}
                onCellClick={handleCellClick}
              />
            )}
          </div>
          
          <div className="space-y-4">
            <GameControls
              gameState={gameState}
              setGameState={setGameState}
            />
            <InfoPanel
              gameState={gameState}
            />
          </div>
        </div>
      </div>

      {gameState.hasWon && (
        <Victory onClose={handleNewGame} />
      )}
    </main>
  );
}
