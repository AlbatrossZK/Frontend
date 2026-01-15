import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from 'react';
import { Link } from 'wouter';

const FOOTER_LINKS = [
  {
    title: 'Technologies',
    links: [
      { label: 'Agent', href: '/app/agent' },
      { label: 'Stealth Addresses', href: '/app/stealth' },
      { label: 'Payment Proof', href: '/app/proof' },
      { label: 'Confidential Transfer', href: '/app/transfer' },
      { label: 'ZK Access Pass', href: '/app/access' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'X', href: 'https://x.com/AlbatrossZK', isExternal: true }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#', isDisabled: true },
      { label: 'Home Page', href: '/' }
    ]
  }
];

type FooterLink = {
  label: string;
  href: string;
  isExternal?: boolean;
  isDisabled?: boolean;
};

export function AppFooter() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-16 md:pt-20 pb-8 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 mb-16 md:mb-24">
          
          {/* Brand Column */}
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold font-mono tracking-tight mb-4 flex items-center gap-2">
              <img 
                src="/assets/preloader-logo.png" 
                alt="Albatross" 
                className="h-8 w-auto brightness-0 invert opacity-80"
              />
              Albatross
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Privacy infrastructure for Solana. 
              Zero-knowledge cryptography meets user-friendly design.
            </p>
            
            {/* Social / Contact placeholder */}
            <div className="flex gap-4">
              <button onClick={() => setIsContactOpen(true)} className="h-10 px-4 rounded-full border border-white/10 bg-white/5 flex items-center justify-center gap-3 hover:bg-[#a988d4] hover:border-[#a988d4] transition-all group">
                <img src="/assets/popup-logo.png" alt="Albatross" className="h-4 w-auto brightness-0 invert" />
                <span className="text-sm font-medium text-white/70 group-hover:text-white">Contact Us</span>
                <ArrowUpRight size={16} className="text-white/50 group-hover:text-white group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap gap-12 md:gap-24">
            {FOOTER_LINKS.map((column, i) => (
              <div key={i}>
                <h3 className="font-mono text-[#a988d4] mb-6 text-sm">
                  [{column.title}]
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link: FooterLink, j) => (
                    <li key={j}>
                      {link.isExternal ? (
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                        >
                          {link.label}
                          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : link.isDisabled ? (
                        <span className="text-white/20 text-sm cursor-not-allowed flex items-center gap-2">
                          {link.label}
                          <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">Soon</span>
                        </span>
                      ) : (
                        <Link href={link.href} className="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-mono">
          <p>© 2026 Albatross. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      {/* Contact Popup Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-[#1a1a1a] text-white p-0 overflow-hidden border border-white/10 max-w-md shadow-2xl">
           <div className="p-12 text-center flex flex-col items-center justify-center min-h-[350px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a988d4]/10 to-transparent pointer-events-none"></div>
              <div className="flex flex-col items-center gap-6 mb-8 relative z-10">
                <img 
                  src="/assets/popup-logo.png" 
                  alt="Albatross" 
                  className="h-16 w-auto brightness-0 invert"
                />
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-1">
                  Albatross
                </h2>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 relative z-10">Get in Touch</h3>
              
              <a href="mailto:support@albatross.build" className="text-lg text-[#a988d4] hover:text-white border-b-2 border-[#a988d4]/30 hover:border-[#a988d4] pb-1 transition-colors font-medium relative z-10">
                support@albatross.build
              </a>
           </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
