import React from 'react';
import Image from 'next/image';
import { BingoCard as BingoCardType, HistoricalFigure } from '@/types/game';

interface BingoCardProps {
  card: BingoCardType;
  markedCells: string[];
  onCellClick: (figureId: string) => void;
}

const getShapeEmoji = (index: number) => {
  const shapes = [
    '⭐', // star
    '❤️', // heart
    '⚪', // circle
    '🔷', // diamond
    '🔺', // triangle
    '🌟', // sparkle star
  ];
  return shapes[index % shapes.length];
};

export const BingoCard: React.FC<BingoCardProps> = ({
  card,
  markedCells,
  onCellClick,
}) => {
  // Create 3 rows of 5 cards each
  const rows = [
    card.cells.slice(0, 5),   // First row
    card.cells.slice(5, 10),  // Second row
    card.cells.slice(10, 15)  // Third row
  ];

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between gap-4">
            {row.map((figure: HistoricalFigure, colIndex: number) => (
              <div
                key={figure.id}
                onClick={() => onCellClick(figure.id)}
                className={`
                  w-[250px] h-[350px] border-2 cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  ${markedCells.includes(figure.id) 
                    ? 'bg-green-50 border-green-500 shadow-lg scale-105' 
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'}
                `}
              >
                <div className="h-full flex flex-col justify-between p-4">
                  {/* Top section - Name and Country */}
                  <div className="text-center">
                    <p className="text-lg font-bold leading-tight mb-1">{figure.name}</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xl">{figure.countryEmoji}</span>
                      <span className="text-sm">{figure.country}</span>
                    </div>
                  </div>

                  {/* Middle section - Image */}
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={figure.imageUrl}
                      alt={figure.name}
                      fill
                      className="object-contain rounded-md"
                      unoptimized
                      onError={(e: any) => {
                        e.target.src = `https://via.placeholder.com/150?text=${encodeURIComponent(figure.name)}`;
                      }}
                    />
                  </div>

                  {/* Bottom section - Badges and Shape */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full
                        ${figure.side === 'good' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800'}`}>
                        {figure.side === 'good' ? '✨ Allied' : '☠️ Axis'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full
                        ${figure.war === 'WW2' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-amber-100 text-amber-800'}`}>
                        {figure.war}
                      </span>
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-2xl" aria-hidden="true">
                        {getShapeEmoji(rowIndex * 5 + colIndex)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}; 