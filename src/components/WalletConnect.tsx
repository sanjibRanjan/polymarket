
import React, { useState, useEffect } from 'react';
import { ConnectButton } from './ConnectButton';
import { LogOut } from 'lucide-react';

import { sepolia } from 'viem/chains';
import { http, createPublicClient } from 'viem';
import { formatEther } from 'viem/utils';
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

// Get Alchemy API key from environment variables
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
}

const WalletConnect: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,

  });
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<any>(null);
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  // Helper to extract address from lightAccount (supports both .address and .getAddress())
  const getAddressFromAccount = async (account: any): Promise<string | null> => {
    console.log("account (getAddressFromAccount):", account);
    if (!account) return null;
    if (typeof account.address === 'string') return account.address;
    if (typeof account.getAddress === 'function') return await account.getAddress();
    return null;
  };


  const generatePrivateKey = (): string => {
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const connectWallet = async () => {
    openAuthModal();
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null
    });
    setClient(null);
    // Keeping private key for reconnection convenience
  };

  return (
    <div>
      {wallet.isConnected ? (
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {wallet.address}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {wallet.balance}
            </span>
          </div>
          <button
            onClick={disconnectWallet}
            className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none"
            aria-label="Disconnect wallet"
          >
            <LogOut size={18} />
          </button>
        </div>
      ) : (
        <ConnectButton onClick={connectWallet} isLoading={isLoading} />
      )}
    </div>
  );
};

export default WalletConnect;
