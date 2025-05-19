import { Market } from '../types/market';

// Helper to generate random dates within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Current date
const now = new Date();

// Generate dates for different markets
const pastDate = new Date(now);
pastDate.setDate(pastDate.getDate() - 5);

const nearFutureDate = new Date(now);
nearFutureDate.setDate(nearFutureDate.getDate() + 2);

const farFutureDate = new Date(now);
farFutureDate.setDate(farFutureDate.getDate() + 30);

// Mock data for crypto prediction markets
export const mockMarkets: Market[] = [
  {
    id: '1',
    question: 'Will Bitcoin close above $75,000 by the end of the month?',
    category: 'Crypto',
    outcomes: [
      { id: '1a', label: 'Yes', probability: 0.73 },
      { id: '1b', label: 'No', probability: 0.27 }
    ],
    volume: 24500,
    creationDate: pastDate.toISOString(),
    expirationDate: farFutureDate.toISOString(),
    priceChange: 0.05
  },
  {
    id: '2',
    question: 'Will Ethereum merge to PoS successfully by September?',
    category: 'Crypto',
    outcomes: [
      { id: '2a', label: 'Yes', probability: 0.85 },
      { id: '2b', label: 'No', probability: 0.15 }
    ],
    volume: 18700,
    creationDate: randomDate(pastDate, now).toISOString(),
    expirationDate: farFutureDate.toISOString(),
    priceChange: 0.02
  },
  {
    id: '3',
    question: 'Will any crypto exchange experience a major hack (>$10M) in the next week?',
    category: 'Crypto',
    outcomes: [
      { id: '3a', label: 'Yes', probability: 0.12 },
      { id: '3b', label: 'No', probability: 0.88 }
    ],
    volume: 9300,
    creationDate: randomDate(pastDate, now).toISOString(),
    expirationDate: nearFutureDate.toISOString(),
    priceChange: -0.03
  },
  {
    id: '4',
    question: 'Will Solana achieve >1 million transactions per second by end of year?',
    category: 'Crypto',
    outcomes: [
      { id: '4a', label: 'Yes', probability: 0.41 },
      { id: '4b', label: 'No', probability: 0.59 }
    ],
    volume: 12400,
    creationDate: new Date().toISOString(),
    expirationDate: farFutureDate.toISOString(),
    priceChange: 0.08
  },
  {
    id: '5',
    question: 'Will USDT lose its peg (below $0.95) in the next 24 hours?',
    category: 'Crypto',
    outcomes: [
      { id: '5a', label: 'Yes', probability: 0.07 },
      { id: '5b', label: 'No', probability: 0.93 }
    ],
    volume: 31200,
    creationDate: randomDate(pastDate, now).toISOString(),
    expirationDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    priceChange: -0.01
  },
  {
    id: '6',
    question: 'Will Cardano release smart contracts by specified date?',
    category: 'Crypto',
    outcomes: [
      { id: '6a', label: 'Yes', probability: 0.68 },
      { id: '6b', label: 'No', probability: 0.32 }
    ],
    volume: 8900,
    creationDate: randomDate(pastDate, now).toISOString(),
    expirationDate: randomDate(nearFutureDate, farFutureDate).toISOString(),
    priceChange: 0.04
  },
  {
    id: '7',
    question: 'Will any meme coin achieve a market cap of over $10B this quarter?',
    category: 'Crypto',
    outcomes: [
      { id: '7a', label: 'Yes', probability: 0.22 },
      { id: '7b', label: 'No', probability: 0.78 }
    ],
    volume: 5600,
    creationDate: new Date().toISOString(),
    expirationDate: randomDate(nearFutureDate, farFutureDate).toISOString(),
    priceChange: 0.15
  },
  {
    id: '8',
    question: 'Will Bitcoin mining difficulty decrease in the next adjustment?',
    category: 'Crypto',
    outcomes: [
      { id: '8a', label: 'Yes', probability: 0.35 },
      { id: '8b', label: 'No', probability: 0.65 }
    ],
    volume: 7800,
    creationDate: randomDate(pastDate, now).toISOString(),
    expirationDate: nearFutureDate.toISOString(),
    priceChange: -0.02
  },
  {
    id: '9',
    question: 'Will SEC approve a spot Bitcoin ETF this year?',
    category: 'Crypto',
    outcomes: [
      { id: '9a', label: 'Yes', probability: 0.48 },
      { id: '9b', label: 'No', probability: 0.52 }
    ],
    volume: 29700,
    creationDate: randomDate(pastDate, now).toISOString(),
    expirationDate: farFutureDate.toISOString(),
    priceChange: 0.07
  }
];