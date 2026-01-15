import { Link, useLocation } from "wouter";
import { Menu, X, Github, ScanLine, FileText, Map, Coins, Cpu, Info, ArrowRight, Home } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface GlobalHeaderProps {
  className?: string;
}

export function GlobalHeader({ className = "" }: GlobalHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "App", href: "/app", icon: Cpu },
    { label: "About", href: "/about", icon: Info },
    { label: "$ALBA", href: "/alba-token", icon: Coins },
    { label: "Roadmap", href: "#", icon: Map },
    { label: "Documentation", href: "#", icon: FileText },
  ];

  const stickyMenuItems = [
    { label: "Home", href: "/", icon: Home },
    ...menuItems
  ];

  const socialLinks = [
    { 
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "https://x.com/AlbatrossZK",
      label: "X"
    },
    { 
      icon: Github,
      href: "https://github.com/AlbatrossZK",
      label: "GitHub"
    },
    { 
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      ),
      href: "https://dexscreener.com/",
      label: "DexScreener"
    },
    { 
      icon: ScanLine,
      href: "https://www.x402scan.com/",
      label: "x402 Explorer"
    }
  ];

  const isHomePage = location === "/";

  return (
    <>
      <header className={`absolute top-0 left-0 right-0 w-full h-auto lg:h-[200px] z-20 bg-gradient-to-b from-white/60 to-transparent pointer-events-none ${className}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_2fr_1fr] items-center lg:items-start gap-4 lg:gap-6 mt-4 lg:mt-8 pointer-events-auto">
          <Link href="/app" className="pointer-events-auto bubbles w-fit" data-testid="button-open-app">
            <span className="text">Open App</span>
            <ArrowRight size={14} className="arrow-icon" />
          </Link>

          <div className="flex flex-col items-center justify-center gap-2 font-bold text-center pointer-events-auto w-full">
            <p className="max-w-[200px] md:max-w-[430px] text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium hidden md:block">
              Where AI evolves beyond capability.
            </p>
            <div className="divider w-[1px] h-8 lg:h-16 bg-gradient-to-t from-[#a988d4] to-transparent opacity-40 hidden md:block"></div>
          </div>

          <div className="ml-auto flex items-center gap-6 pointer-events-auto relative" ref={menuRef}>
            <div className="hidden lg:flex items-center gap-4 mr-2">
              {socialLinks.map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-[#2d1b4e] hover:bg-[#a988d4] hover:text-white hover:border-[#a988d4] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title={social.label}
                >
                  <social.icon size={18} className="w-4 h-4" />
                </a>
              ))}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 lg:gap-3 bg-white/40 backdrop-blur-md pl-3 lg:pl-5 pr-2 py-1.5 lg:py-2 rounded-full border border-white/60 hover:bg-white/70 transition-all duration-300 shadow-sm hover:shadow-md group ${isMenuOpen ? 'bg-white/80 ring-2 ring-[#a988d4]/20' : ''}`}
            >
              <span className="text-xs lg:text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">Menu</span>
              <span className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center bg-[#a988d4] rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
              </span>
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-4 w-[280px] bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-2xl overflow-hidden p-2 z-50"
                >
                  <div className="flex flex-col gap-1">
                    {menuItems.map((item, i) => (
                      <Link key={item.label} href={item.href} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#a988d4]/10 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center text-[#a988d4] group-hover:bg-[#a988d4] group-hover:text-white transition-colors">
                          <item.icon size={16} />
                        </div>
                        <span className="text-sm font-bold text-[#2d1b4e] group-hover:translate-x-1 transition-transform">
                          {item.label}
                        </span>
                        <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#a988d4]" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/60 shadow-lg"
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
              <Link 
                href="/" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-[#2d1b4e] font-bold hover:text-[#a988d4] transition-colors"
              >
                <Home size={18} />
                <span className="hidden sm:inline">Albatross</span>
              </Link>

              <div className="flex items-center gap-3">
                {!isHomePage && (
                  <Link 
                    href="/" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-4 py-2 text-sm font-medium text-[#2d1b4e] hover:text-[#a988d4] transition-colors"
                  >
                    Home
                  </Link>
                )}
                <Link 
                  href="/app" 
                  className="px-4 py-2 bg-[#2d1b4e] text-white rounded-full text-sm font-bold hover:bg-[#a988d4] transition-colors flex items-center gap-2"
                >
                  Open App <ArrowRight size={14} />
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/60 hover:bg-white transition-colors"
                >
                  <span className="text-xs font-medium text-zinc-600">Menu</span>
                  <span className="w-6 h-6 flex items-center justify-center bg-[#a988d4] rounded-full text-white">
                    {isMenuOpen ? <X size={12} /> : <Menu size={12} />}
                  </span>
                </button>
              </div>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-4 mt-2 w-[280px] bg-white/95 backdrop-blur-xl rounded-2xl border border-white/60 shadow-2xl overflow-hidden p-2 z-50"
                  >
                    <div className="flex flex-col gap-1">
                      {menuItems.map((item, i) => (
                        <Link key={item.label} href={item.href} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#a988d4]/10 transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-[#a988d4]/10 flex items-center justify-center text-[#a988d4] group-hover:bg-[#a988d4] group-hover:text-white transition-colors">
                            <item.icon size={16} />
                          </div>
                          <span className="text-sm font-bold text-[#2d1b4e] group-hover:translate-x-1 transition-transform">
                            {item.label}
                          </span>
                          <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#a988d4]" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
