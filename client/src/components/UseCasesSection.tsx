import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const USE_CASES = [
  {
    category: 'DEFI',
    title: 'Private Trading',
    description: 'Execute trades without revealing your strategy or wallet balance to the public.',
  },
  {
    category: 'DAO',
    title: 'Anonymous Voting',
    description: 'Prove membership and vote without linking your identity to your holdings.',
  },
  {
    category: 'PAYROLL',
    title: 'Confidential Payments',
    description: 'Pay contributors without exposing salary information on-chain.',
  }
];

export function UseCasesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".use-cases-header", {
        scrollTrigger: {
          trigger: ".use-cases-section",
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".use-case-card", {
        scrollTrigger: {
          trigger: ".use-cases-grid",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="use-cases-section relative w-full py-16 md:py-24 overflow-hidden text-[#2d1b4e] flex flex-col justify-center min-h-[60vh]">
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/use-cases-bg.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col justify-center h-full">
        
        <div className="use-cases-header mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-[#2d1b4e]">
            [Built for Every Use Case]
          </h2>
          <p className="text-base md:text-lg font-medium opacity-70 mb-8 max-w-2xl mx-auto">
            From DeFi traders to DAOs, Albatross provides the privacy layer Solana needs.
          </p>
          <Link href="/app" className="bg-[#a988d4] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#9676c0] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#a988d4]/30 inline-flex items-center gap-2">
            Explore Modules
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="use-cases-grid w-full flex flex-wrap justify-center gap-6 md:gap-8">
          {USE_CASES.map((item, i) => (
            <div 
              key={i} 
              className="use-case-card w-full md:w-[320px] h-auto md:h-[220px] flex-shrink-0 p-6 flex flex-col justify-between group border-l-2 border-[#a988d4]/30 hover:border-[#a988d4] transition-colors duration-300 bg-white/20 hover:bg-white/40 backdrop-blur-sm"
            >
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a988d4] mb-3 block opacity-80">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-[#2d1b4e]">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-70 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
