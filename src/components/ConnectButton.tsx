import React from 'react';
import { Wallet, Loader } from 'lucide-react';

interface ConnectButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-70"
    >
      {isLoading ? (
        <Loader size={18} className="animate-spin" />
      ) : (
        <Wallet size={18} />
      )}
      <span>Connect Wallet</span>
    </button>
  );
};