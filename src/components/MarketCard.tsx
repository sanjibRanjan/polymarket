import React from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { Market, Outcome } from '../types/market';
import { formatCurrency, formatPercentage, timeUntil } from '../utils/formatters';

interface MarketCardProps {
  market: Market;
}

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  // Find the outcome with the highest probability
  const leadingOutcome = [...market.outcomes].sort((a, b) => b.probability - a.probability)[0];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {market.category}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {timeUntil(market.expirationDate)}
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 line-clamp-2">
          {market.question}
        </h3>
        
        <div className="space-y-3 mb-4">
          {market.outcomes.map((outcome) => (
            <OutcomeBar 
              key={outcome.id} 
              outcome={outcome} 
              isLeading={outcome.id === leadingOutcome.id} 
            />
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4 text-sm border-t pt-4 border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <TrendingUp size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
            <span className="text-gray-700 dark:text-gray-300">
              {formatCurrency(market.volume)}
            </span>
          </div>
          
          <div className={`flex items-center ${market.priceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {market.priceChange >= 0 ? (
              <ArrowUp size={16} className="mr-1" />
            ) : (
              <ArrowDown size={16} className="mr-1" />
            )}
            <span>{formatPercentage(Math.abs(market.priceChange))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OutcomeBarProps {
  outcome: Outcome;
  isLeading: boolean;
}

const OutcomeBar: React.FC<OutcomeBarProps> = ({ outcome, isLeading }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <div className="font-medium text-gray-800 dark:text-gray-200">
          {outcome.label}
        </div>
        <div className={`font-semibold ${isLeading ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
          {formatPercentage(outcome.probability)}
        </div>
      </div>
      
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${isLeading ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-400 dark:bg-gray-600'}`}
          style={{ width: `${outcome.probability * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MarketCard;