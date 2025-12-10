import { useState, useLayoutEffect, useRef } from 'react';
import { Preloader } from '@/components/Preloader';
import { ThreeBackground } from '@/components/ThreeBackground';
import { ImageSlider } from '@/components/ImageSlider';
import gsap from 'gsap';
import { ArrowRight, Menu } from 'lucide-react';

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  useLayoutEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Helper for text splitting (simplified for hero)
      const splitText = (selector: string, type: 'chars' | 'words' = 'chars') => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
           const text = (el as HTMLElement).innerText;
           (el as HTMLElement).innerHTML = '';
           if (type === 'chars') {
             text.split('').forEach(char => {
               const span = document.createElement('span');
               span.innerText = char === ' ' ? '\u00A0' : char;
               span.style.display = 'inline-block';
               span.className = 'hero-char';
               (el as HTMLElement).appendChild(span);
             });
           } else {
             // simple word split
             text.split(' ').forEach(word => {
               const span = document.createElement('span');
               span.innerText = word + '\u00A0';
               span.style.display = 'inline-block';
               (el as HTMLElement).appendChild(span);
             });
           }
        });
        return document.querySelectorAll(`${selector} .hero-char`);
      };

      // Initial states
      gsap.set(".divider", { scaleY: 0, transformOrigin: "top" });
      gsap.set("[data-fade-in]", { 
        filter: "blur(30px)", 
        opacity: 0,
        y: (i, el) => el.getAttribute("data-fade-in") === "down" ? -100 : 0,
        x: (i, el) => el.getAttribute("data-fade-in") === "left" ? 100 : 0
      });

      // Animate Hero
      const h1Chars = splitText('h1', 'chars');
      
      tl.to(".divider", {
        scaleY: 1,
        duration: 0.5,
        ease: "back.inOut"
      }, "+=0.5")
      .to("[data-fade-in]", {
        y: 0,
        x: 0,
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.25,
        ease: "power4.inOut",
        stagger: 0.08
      }, "<-0.25")
      .from(h1Chars, {
        xPercent: -100,
        opacity: 0,
        ease: "power2.inOut",
        stagger: {
          each: 0.02,
          from: "random"
        },
        duration: 0.5
      }, "<0.55")
      .from(".sub-title", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.inOut"
      }, "-=0.75");

    }, heroRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white text-zinc-900 font-sohne">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Background is always present but revealed after preloader */}
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Main Content */}
      <div ref={heroRef} className={`relative z-10 w-full h-full transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 w-full h-[200px] z-20 bg-gradient-to-b from-white/60 to-transparent pointer-events-none">
          <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-[1fr_2fr_1fr] items-start gap-6 mt-8 pointer-events-auto">
            <div className="logo" data-fade-in="down">
              <span className="text-2xl font-bold tracking-tight text-[#a988d4]">ALBATROSS</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 font-bold text-center">
              <p className="max-w-[430px] text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium" data-fade-in="down">
                Elegance in Flight. Majesty in Motion.
              </p>
              <div className="divider w-[1px] h-16 bg-gradient-to-t from-[#a988d4] to-transparent opacity-40"></div>
            </div>

            <button className="ml-auto flex items-center gap-3 bg-white/40 backdrop-blur-md pl-5 pr-2 py-2 rounded-full border border-white/60 hover:bg-white/70 transition-all duration-300 shadow-sm hover:shadow-md group" data-fade-in="down">
              <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">Menu</span>
              <span className="w-8 h-8 flex items-center justify-center bg-[#a988d4] rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                <Menu size={16} />
              </span>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative flex flex-col justify-end min-h-screen pb-24 px-8 max-w-[1440px] mx-auto pointer-events-none">
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end w-full pointer-events-auto">
            
            {/* Left Column: Slider + Title */}
            <div className="flex flex-col gap-12 w-full">
               {/* Single Image positioned above title, wider and slightly higher */}
               <div className="w-full max-w-[650px] mb-4" data-fade-in="right">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm bg-white/10 relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2072&auto=format&fit=crop" 
                      alt="Scenic View" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#a988d4]/20 to-transparent pointer-events-none" />
                  </div>
               </div>

               <div className="flex flex-col gap-6">
                  <p className="sub-title max-w-[280px] text-zinc-600 text-lg font-medium leading-[140%] tracking-tight">
                    Explore the unseen horizons where the sky meets the sea.
                  </p>
                  <h1 className="text-[clamp(3.5rem,9vw,10rem)] font-bold leading-[85%] tracking-[-0.04em] text-[#a988d4] -ml-4 mix-blend-multiply">
                    ALBATROSS
                  </h1>
               </div>
            </div>

            {/* Right Column: Original Card */}
            <div className="relative max-w-[320px] w-full rounded-2xl bg-white/40 backdrop-blur-sm shadow-[0_20px_40px_-15px_rgba(169,136,212,0.3)] border border-white/50 p-2 lg:mb-4" data-fade-in="left">
              
              <div className="aspect-[4/5] rounded-xl overflow-hidden relative group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Albatross view" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#a988d4]/40 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                 
                 <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-white text-sm font-medium drop-shadow-md">Discover the Journey</p>
                 </div>
              </div>

              <div className="flex justify-between items-center px-2 pt-3 pb-1">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Next Flight</span>
                    <span className="text-sm font-bold text-zinc-800">Dec 12, 2025</span>
                 </div>
                 
                <button className="flex items-center gap-2 bg-[#a988d4] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#9676c0] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#a988d4]/30">
                  <span>Book</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
