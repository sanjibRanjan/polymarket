import { createLightAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { createLightAccount } from '@alchemy/aa-accounts';
import { sepolia } from 'viem/chains';
import { http } from 'viem';
import { formatEther } from 'viem/utils';

// Get Alchemy API key from environment variables
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

/**
 * Creates a Light Account using Alchemy's Account Abstraction
 * @param privateKey - The private key to use for the account
 * @returns The Light Account and Alchemy client
 */
export const createAlchemyWallet = async (privateKey: string) => {
  try {
    const chain = sepolia;
    
    // Create a Light Account
    const lightAccount = await createLightAccount({
      transport: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
      chain,
      privateKey: `0x${privateKey}`
    });
    
    // Create the Alchemy client
    const alchemyClient = await createLightAccountAlchemyClient({
      apiKey: ALCHEMY_API_KEY,
      chain,
      account: lightAccount
    });
    
    return { lightAccount, alchemyClient };
  } catch (error) {
    console.error('Error creating Alchemy wallet:', error);
    throw error;
  }
};

/**
 * Fetches the balance of an Ethereum address
 * @param address - The Ethereum address to fetch the balance for
 * @returns The formatted balance in ETH
 */
export const fetchWalletBalance = async (address: string): Promise<string> => {
  try {
    // Create a viem client to fetch balance
    const transport = http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
    const balance = await transport.getBalance({ address: address as `0x${string}` });
    
    // Format the balance from wei to ETH
    const formattedBalance = formatEther(balance);
    
    return `${parseFloat(formattedBalance).toFixed(4)} ETH`;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw error;
  }
};

/**
 * Generates a random private key
 * @returns A random 32-byte private key as a hex string
 */
export const generatePrivateKey = (): string => {
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Formats an Ethereum address for display
 * @param address - The full Ethereum address
 * @returns A shortened version of the address (e.g., 0x1234...5678)
 */
export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};