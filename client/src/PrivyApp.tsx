import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import App from "./App";

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
});

export default function PrivyApp() {
  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#a988d4",
          logo: "/assets/preloader-logo.png",
          landingHeader: "Connect your Solana wallet",
          showWalletLoginFirst: true,
          walletChainType: "solana-only",
          walletList: ["phantom", "solflare"],
        },
        loginMethods: ["wallet"],
        embeddedWallets: {
          solana: {
            createOnLogin: "off",
          },
        },
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
      }}
    >
      <App />
    </PrivyProvider>
  );
}
