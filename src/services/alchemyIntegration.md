# Alchemy Smart Wallet Integration Guide

This file provides guidance on how to properly integrate Alchemy Smart Wallets in a production environment. In the current implementation, we're using mock data and simulated connections for demonstration purposes.

## Production Implementation Steps

1. **Create an Alchemy account**
   - Sign up at [https://dashboard.alchemy.com/services/smart-wallets](https://dashboard.alchemy.com/services/smart-wallets)
   - Create a new project to get your API keys

2. **Install required dependencies**
   ```bash
   npm install @alchemy/aa-core @alchemy/aa-alchemy viem
   ```

3. **Set up environment variables**
   - Create a `.env` file with your Alchemy API key:
   ```
   VITE_ALCHEMY_API_KEY=your-api-key
   ```

4. **Replace the mock wallet service with actual implementation**
   - Update the `walletService.ts` file with real Alchemy SDK code
   - Implement proper wallet connection, transaction signing, and account management

## Example Implementation Code

```typescript
import { LightSmartContractAccount, SmartAccountProvider } from '@alchemy/aa-core';
import { AlchemyProvider } from '@alchemy/aa-alchemy';
import { createWalletClient, http } from 'viem';

const API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

export const walletService = {
  connect: async (options?: WalletConnectionOptions): Promise<string> => {
    try {
      // Create an Alchemy provider
      const provider = new AlchemyProvider({
        apiKey: API_KEY,
        chain: mainnet,
      });
      
      // Connect to the user's wallet and create a smart account
      const account = new LightSmartContractAccount({
        rpcClient: provider,
        // Additional account configuration
      });
      
      // Get the wallet address
      const address = await account.getAddress();
      
      if (options?.onConnect) {
        options.onConnect(address);
      }
      
      return address;
    } catch (error) {
      if (options?.onError && error instanceof Error) {
        options.onError(error);
      }
      throw error;
    }
  },
  // Implement other methods similarly
};
```

## Security Considerations

1. **Never expose your API keys** - Always use environment variables
2. **Implement proper error handling** - Handle connection failures gracefully
3. **Consider gas fee management** - Alchemy Smart Wallets may require gas fee sponsorship configuration
4. **Test thoroughly** - Test on testnets before deploying to production