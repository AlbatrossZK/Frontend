import { Link, useLocation } from "wouter";
import { Wallet, LogOut } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

const NAV_ITEMS = [
  { label: "App", href: "/app/auth" },
  { label: "Agent", href: "/app/agent" },
  { label: "Stealth", href: "/app/stealth" },
  { label: "Proof", href: "/app/proof" },
  { label: "Transfer", href: "/app/transfer" },
  { label: "Access", href: "/app/access" },
];

export function AppHeader() {
  const [location] = useLocation();
  const { login, logout, authenticated, ready, user } = usePrivy();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getDisplayAddress = () => {
    if (user?.wallet?.address) {
      return truncateAddress(user.wallet.address);
    }
    return "Connected";
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link href="/app" className="flex items-center gap-3 group">
          <img 
            src="/assets/preloader-logo.png" 
            alt="Albatross" 
            className="h-8 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-white font-bold text-lg tracking-tight">Albatross</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                item.href === "/app" 
                  ? location === "/app" 
                    ? "text-white bg-white/10" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                  : location === item.href || location.startsWith(item.href)
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              [ {item.label} ]
            </Link>
          ))}
        </nav>

        {/* Right Side: Connect Wallet + Solana Chain */}
        <div className="flex items-center gap-3">
          {authenticated ? (
            <div className="flex items-center gap-2">
              <button 
                className="px-5 py-2.5 bg-gradient-to-r from-[#a988d4] to-[#8b6fc0] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#a988d4]/30 transition-all flex items-center gap-2"
                data-testid="button-wallet-connected"
              >
                <Wallet size={16} />
                {getDisplayAddress()}
              </button>
              <button 
                onClick={logout}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                title="Disconnect"
                data-testid="button-disconnect"
              >
                <LogOut size={16} className="text-white/60" />
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              disabled={!ready}
              className="px-5 py-2.5 bg-gradient-to-r from-[#a988d4] to-[#8b6fc0] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#a988d4]/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              data-testid="button-connect-wallet"
            >
              <Wallet size={16} />
              {!ready ? "Loading..." : "Connect Wallet"}
            </button>
          )}
          
          <div 
            className="px-4 py-2.5 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-[#14F195]/30 rounded-xl flex items-center gap-2 text-sm font-medium"
          >
            <img 
              src="/assets/solana-logo.png" 
              alt="Solana" 
              className="w-6 h-6 object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent font-bold">
              Solana
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
