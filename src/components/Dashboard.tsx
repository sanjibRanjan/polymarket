import React, { useState, useEffect } from 'react';
import MarketCard from './MarketCard';
import MarketFilter from './MarketFilter';
import { fetchMarkets } from '../services/polymarketApi';
import { Market } from '../types/market';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const getMarkets = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMarkets();
        setMarkets(data);
        setFilteredMarkets(data);
      } catch (error) {
        console.error('Error fetching markets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getMarkets();
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredMarkets(markets);
    } else if (filter === 'trending') {
      setFilteredMarkets(markets.filter(market => market.volume > 5000));
    } else if (filter === 'ending-soon') {
      const now = new Date();
      const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      setFilteredMarkets(markets.filter(market => 
        new Date(market.expirationDate) < twentyFourHoursLater));
    } else if (filter === 'newest') {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      setFilteredMarkets(markets.filter(market => 
        new Date(market.creationDate) > threeDaysAgo));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Crypto Prediction Markets
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore and trade on the latest crypto prediction markets
        </p>
      </div>

      <MarketFilter 
        activeFilter={activeFilter} 
        onFilterChange={handleFilterChange} 
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : filteredMarkets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">No markets found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;