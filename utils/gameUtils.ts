import { BingoCard, HistoricalFigure } from '@/types/game';
import { historicalFigures } from '@/data/historicalFigures';

export const generateBingoCard = (): BingoCard => {
  const goodFigures = historicalFigures.filter(f => f.side === 'good');
  const badFigures = historicalFigures.filter(f => f.side === 'bad');
  
  // Ensure we have a mix of good and bad figures
  const selectedGood = [...goodFigures].sort(() => Math.random() - 0.5).slice(0, 13);
  const selectedBad = [...badFigures].sort(() => Math.random() - 0.5).slice(0, 12);
  
  const allFigures = [...selectedGood, ...selectedBad]
    .sort(() => Math.random() - 0.5);

  return {
    id: Math.random().toString(36).substr(2, 9),
    cells: allFigures,
    freeSpace: {
      text: "Peace & Understanding",
      imageUrl: "/figures/peace-symbol.png"
    }
  };
};

export const getRandomFigure = (figures: HistoricalFigure[]): HistoricalFigure => {
  return figures[Math.floor(Math.random() * figures.length)];
};

export const checkWinCondition = (
  markedCells: string[],
  cardCells: HistoricalFigure[]
): boolean => {
  // Check only first three rows (0-4, 5-9, 10-14)
  const rows = [
    cardCells.slice(0, 5),    // First row
    cardCells.slice(5, 10),   // Second row
    cardCells.slice(10, 15)   // Third row
  ];

  // Check if any row is completely marked
  return rows.some(row => 
    row.length === 5 && row.every(cell => markedCells.includes(cell.id))
  );
}; 