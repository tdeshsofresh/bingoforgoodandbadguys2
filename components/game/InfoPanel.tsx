import React from 'react';
import Image from 'next/image';
import { GameState } from '@/types/game';

interface InfoPanelProps {
  gameState: GameState;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ gameState }) => {
  const lastCalledFigure = gameState.currentCard?.cells.find(
    figure => figure.id === gameState.calledFigures[gameState.calledFigures.length - 1]
  );

  const getAlliance = (side: 'good' | 'bad') => {
    if (side === 'good') return 'Allied Powers ✪';
    return 'Axis Powers ✠';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Last Called</h2>
      {lastCalledFigure ? (
        <div className="space-y-4">
          <div className="relative w-full h-64">
            <Image
              src={lastCalledFigure.imageUrl}
              alt={lastCalledFigure.name}
              fill
              className="object-contain rounded-md"
              unoptimized
              onError={(e: any) => {
                e.target.src = `https://via.placeholder.com/150?text=${encodeURIComponent(lastCalledFigure.name)}`;
              }}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-xl">{lastCalledFigure.name}</p>
              <span className="text-2xl">{lastCalledFigure.countryEmoji}</span>
            </div>
            
            <p className="text-md text-gray-600">{lastCalledFigure.country}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium
                ${lastCalledFigure.side === 'good' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-red-100 text-red-800'}`}>
                {lastCalledFigure.side === 'good' ? '✨ Good' : '☠️ Bad'}
              </span>
              
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium
                ${lastCalledFigure.side === 'good' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-purple-100 text-purple-800'}`}>
                {getAlliance(lastCalledFigure.side)}
              </span>

              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                {lastCalledFigure.war === 'WW2' ? '✠ World War II' : '† World War I'}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              <span className="font-medium">Did you know:</span> {lastCalledFigure.didYouKnow}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Modern Connection:</span> {lastCalledFigure.modernConnection}
            </p>
            {lastCalledFigure.peaceMessage && (
              <p className="text-sm text-gray-600 border-t pt-2 mt-2 border-gray-200">
                <span className="font-medium">Peace Message:</span> {lastCalledFigure.peaceMessage}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No figure called yet</p>
          <p className="text-sm mt-2">Click "Call Next Figure" to start the game</p>
        </div>
      )}
    </div>
  );
}; 