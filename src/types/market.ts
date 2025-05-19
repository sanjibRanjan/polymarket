export interface Outcome {
  id: string;
  label: string;
  probability: number;
}

export interface Market {
  id: string;
  question: string;
  category: string;
  outcomes: Outcome[];
  volume: number;
  creationDate: string;
  expirationDate: string;
  priceChange: number;
}