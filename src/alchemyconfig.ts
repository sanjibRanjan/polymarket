
import {cookieStorage,  createConfig } from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";



export const config = createConfig(
  {
    // alchemy config
    transport: alchemy({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }), // TODO: add your Alchemy API key - setup your app and embedded account config in the alchemy dashboard (https://dashboard.alchemy.com/accounts)
    chain: sepolia, // TODO: specify your preferred chain here and update imports from @account-kit/infra
    ssr: true, // Defers hydration of the account state to the client after the initial mount solving any inconsistencies between server and client state (read more here: https://www.alchemy.com/docs/wallets/react/ssr)
    storage: cookieStorage, // persist the account state using cookies (read more here: https://www.alchemy.com/docs/wallets/react/ssr#persisting-the-account-state)
    enablePopupOauth: true, // must be set to "true" if you plan on using popup rather than redirect in the social login flow
    // optional config to override default session manager config
    sessionConfig: {
      expirationTimeMs: 1000 * 60 * 60, // 60 minutes (default is 15 min)
    },
  },
  {
    // authentication ui config - your customizations here
    auth: {
      sections: [
        [{ type: "email" }],
        [
          { type: "passkey" },
          { type: "social", authProviderId: "google", mode: "popup" },
          { type: "social", authProviderId: "facebook", mode: "popup" },
        ],
        [
          {
            type: "external_wallets",
            walletConnect: { projectId: "your-project-id" },
          },
        ],
      ],
      addPasskeyOnSignup: false,
    
    },
  }
);

export const queryClient = new QueryClient();
