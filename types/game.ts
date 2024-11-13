export interface HistoricalFigure {
  id: string;
  name: string;
  side: 'good' | 'bad';
  war: 'WW1' | 'WW2';
  country: string;
  countryEmoji: string;
  imageUrl: string;
  didYouKnow: string;
  modernConnection: string;
  peaceMessage?: string;
}

export interface BingoCard {
  id: string;
  cells: HistoricalFigure[];
  freeSpace?: {
    text: string;
    imageUrl: string;
  };
}

export interface GameState {
  currentCard: BingoCard | null;
  calledFigures: string[];
  markedCells: string[];
  hasWon: boolean;
} 