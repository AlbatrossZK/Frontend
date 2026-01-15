import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STATS = [
  { value: '5', label: 'PRIVACY MODULES', sub: 'Agent, Stealth, Proof, Transfer, Access' },
  { value: 'ZK', label: 'PROOF SYSTEM', sub: 'Zero-knowledge verification' },
  { value: '100%', label: 'ON-CHAIN', sub: 'Fully decentralized on Solana' },
];

const LOGOS = Array(10).fill('/assets/flower-icon.webp');

export function StatsAndLogos() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marqueeContent = marqueeRef.current?.querySelector('.marquee-content');
      if (marqueeContent) {
        const content = marqueeContent.innerHTML;
        marqueeContent.innerHTML = content + content + content + content;
        
        gsap.to(marqueeContent, {
          xPercent: -25,
          ease: "none",
          duration: 80, 
          repeat: -1,
        });
      }

      gsap.fromTo(".stats-section", 
        { 
          clipPath: "inset(0 0 100% 0)",
        },
        {
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 90%",
            end: "top 20%",
            scrub: 1,
          },
          clipPath: "inset(0 0 0% 0)",
          ease: "none"
        }
      );

      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from([".stats-divider", ".logos-container"], {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 50%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section relative w-full bg-[#a988d4] text-white py-12 md:py-16 overflow-hidden" ref={marqueeRef}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-center gap-2">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-2">{stat.value}</h3>
              <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/70">{stat.label}</p>
              <p className="text-xs md:text-sm text-white/50">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="stats-divider w-full h-px bg-white/20 mb-12 md:mb-16"></div>

        <div className="logos-container flex flex-col gap-6 md:gap-8">
          <p className="text-xs md:text-sm font-medium pl-4 text-white/60 text-center md:text-left">Powered by cutting-edge cryptography...</p>
          
          <div className="w-full overflow-hidden mask-gradient-x">
            <div className="marquee-content flex gap-16 items-center w-max pl-4">
              {LOGOS.map((src, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  <img 
                    src={src} 
                    alt="Partner Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
