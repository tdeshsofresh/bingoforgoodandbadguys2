import React from 'react';
import { GameState, HistoricalFigure } from '@/types/game';
import { getRandomFigure, generateBingoCard } from '@/utils/gameUtils';

interface GameControlsProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  setGameState,
}) => {
  const handleCallFigure = () => {
    if (!gameState.currentCard) return;
    
    const availableFigures = gameState.currentCard.cells.filter(
      figure => !gameState.calledFigures.includes(figure.id)
    );
    
    if (availableFigures.length === 0) return;
    
    const nextFigure = getRandomFigure(availableFigures);
    setGameState(prev => ({
      ...prev,
      calledFigures: [...prev.calledFigures, nextFigure.id]
    }));
  };

  const handleNewGame = () => {
    const newCard = generateBingoCard();
    setGameState({
      currentCard: newCard,
      calledFigures: [],
      markedCells: [],
      hasWon: false,
    });
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-lg">
      <div className="absolute -top-14 right-0">
        <button
          onClick={handleNewGame}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                   transition-colors shadow-lg hover:shadow-xl"
        >
          New Game
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Call Next Figure</h2>
        <button
          onClick={handleCallFigure}
          className="w-full py-3 px-6 bg-blue-500 text-white text-lg rounded-lg 
                   hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
        >
          Call Next Figure
        </button>
      </div>
    </div>
  );
}; 