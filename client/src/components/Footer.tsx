import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from 'react';
import { Link } from 'wouter';

const FOOTER_LINKS = [
  {
    title: 'Protocol',
    links: [
      { label: 'Open App', href: '/app' },
      { label: '$ALBA Token', href: '/alba-token' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Jobs', href: '/jobs' },
      { label: 'X', href: 'https://x.com/AlbatrossZK', isExternal: true }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '#contact', isContact: true }
    ]
  }
];

type FooterLink = {
  label: string;
  href: string;
  isExternal?: boolean;
  isContact?: boolean;
};

export function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer className="w-full bg-[#2d1b4e] text-white pt-16 md:pt-20 pb-8 px-4 md:px-8 border-t border-[#a988d4]/20">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 mb-16 md:mb-24">
          
          {/* Brand Column */}
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold font-mono tracking-tight mb-4 flex items-center gap-2">
              Albatross
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Privacy infrastructure for Solana. 
              Zero-knowledge cryptography meets user-friendly design.
            </p>
            
            {/* Social / Contact placeholder */}
            <div className="flex gap-4">
              <button onClick={() => setIsContactOpen(true)} className="h-10 px-4 rounded-full border border-white/20 flex items-center justify-center gap-3 hover:bg-[#a988d4] hover:border-[#a988d4] transition-all group">
                <img src="/assets/popup-logo.png" alt="Albatross" className="h-4 w-auto brightness-0 invert" />
                <span className="text-sm font-medium">Contact Us</span>
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
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
                      {link.isContact ? (
                        <button 
                          onClick={() => setIsContactOpen(true)}
                          className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 group text-left"
                        >
                          {link.label}
                        </button>
                      ) : link.isExternal ? (
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                        >
                          {link.label}
                          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <a href={link.href} className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-mono">
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
        <DialogContent className="bg-transparent text-black p-0 overflow-hidden border-none max-w-md shadow-2xl">
           <div 
             className="p-16 text-center flex flex-col items-center justify-center min-h-[350px] relative bg-cover bg-center"
             style={{ backgroundImage: 'url(/assets/popup-bg.png)' }}
           >
              <div className="flex flex-col items-center gap-6 mb-8">
                <img 
                  src="/assets/popup-logo.png" 
                  alt="Albatross" 
                  className="h-16 w-auto"
                />
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-1">
                  Albatross
                </h2>
              </div>
              
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <a href="mailto:support@albatross.build" className="text-lg border-b-2 border-black/20 hover:border-black pb-1 transition-colors font-medium">
                support@albatross.build
              </a>
           </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
