import React from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

interface MarketFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const MarketFilter: React.FC<MarketFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Markets' },
    { id: 'trending', label: 'Trending', icon: <Flame size={16} /> },
    { id: 'ending-soon', label: 'Ending Soon', icon: <Clock size={16} /> },
    { id: 'newest', label: 'Newest', icon: <Sparkles size={16} /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center">
            {filter.icon && <span className="mr-1">{filter.icon}</span>}
            <span>{filter.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MarketFilter;