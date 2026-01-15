import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const FEATURES = [
  {
    id: '01',
    title: 'Albatross Agent',
    description: 'Uncensored AI assistant powered by x402 micropayments. Ask anything with complete privacy - no logs, no restrictions.',
    link: 'Pay-per-message AI',
    href: '/app/agent'
  },
  {
    id: '02',
    title: 'Stealth Addresses',
    description: 'Generate one-time receiving addresses with rotating keys. Receive payments without linking transactions to your identity.',
    link: 'Anonymous receiving',
    href: '/app/stealth'
  },
  {
    id: '03',
    title: 'Payment Proofs',
    description: 'Create time-bounded proofs that you paid someone without revealing transaction details. Shareable verification links.',
    link: 'Prove without revealing',
    href: '/app/proof'
  },
  {
    id: '04',
    title: 'Confidential Transfers',
    description: 'Send Token-2022 USDC with hidden amounts and encrypted memos. Native Solana privacy using the confidential transfer extension.',
    link: 'Hidden amounts on-chain',
    href: '/app/transfer'
  }
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".features-header", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="features-section relative w-full py-20 md:py-32 overflow-hidden text-[#2d1b4e]">
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/features-bg.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8">
        
        <div className="features-header mb-12 md:mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono mb-4 md:mb-6 tracking-tight">
            [Why Albatross]
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed opacity-80">
            The only protocol that refuses to compromise between privacy and usability on Solana.
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {FEATURES.map((feature, i) => (
            <Link 
              key={i}
              href={feature.href}
              className="feature-card group relative p-6 md:p-8 lg:p-12 rounded-lg bg-[#e9d5ff]/40 border border-[#a988d4]/20 hover:bg-[#e9d5ff]/60 transition-colors duration-300 backdrop-blur-md cursor-pointer"
              data-testid={`feature-card-${feature.id}`}
            >
              <div className="flex flex-col h-full justify-between gap-8">
                <div>
                  <span className="inline-block text-lg font-mono opacity-50 mb-6">[{feature.id}]</span>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg leading-relaxed opacity-80 font-medium">
                    {feature.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} />
                  <span>{feature.link}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
