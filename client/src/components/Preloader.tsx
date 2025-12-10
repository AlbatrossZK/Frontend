import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// Custom Ease from the provided script
CustomEase.create(
  "stutterEase",
  "M0,0 C0,0 0.052,0.1 0.152,0.1 0.242,0.1 0.299,0.349 0.399,0.349 0.586,0.349 0.569,0.596 0.67,0.624 0.842,0.671 0.95,0.95 1,1"
);

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // Ken Burns Effect on Mask Background Image only
      gsap.to(".mask-bg-image", {
        scale: 1.15,
        duration: 4,
        ease: "none"
      });

      // Simple reveal for the logo image
      tl.from(".preloader-logo-img", {
        y: 50,
        opacity: 0,
        scale: 0.9,
        ease: "back.out(1.7)", // Added a slight bounce for a "better" feel
        duration: 1,
      })
      .to(".preloader-logo-img", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8 
      })
      .to(".preloader-bg", {
        scaleX: 1,
        ease: "stutterEase",
        duration: 2.8
      })
      .to(".preloader-mask", {
        scale: 3,
        duration: 0.9,
        ease: "expoScale(0.5,7,power1.in)"
      })
      .to(
        ".preloader-bg, .preloader-logo, .preloader-progress-bar",
        {
          opacity: 0,
          duration: 0.85,
          ease: "power2.inOut"
        },
        "<"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 pointer-events-none text-zinc-800">
      {/* Background layer matching the home page animation palette - Reverted to light purple gradient */}
      <div className="preloader-progress-bar fixed inset-0 z-[100] bg-gradient-to-br from-[#f8f0ff] via-[#e9d5ff] to-[#d8b4fe]">
        <div className="preloader-bg fixed inset-0 bg-white origin-left scale-x-[0.2]"></div>
        <div className="preloader-logo flex w-full h-full items-center justify-center">
            {/* Replaced text with Image Logo */}
            <img 
              src="/assets/preloader-logo.png" 
              alt="Albatross Logo" 
              className="preloader-logo-img w-56 h-auto object-contain mix-blend-multiply" 
            />
        </div>
      </div>
      
      <div 
        className="preloader-mask fixed inset-0 z-[100] overflow-hidden"
        style={{
            mask: "linear-gradient(white, white), url('https://ik.imagekit.io/kg2nszxjp/ironstride-preloader/preloader-mask.svg') center/40% no-repeat",
            WebkitMask: "linear-gradient(white, white), url('https://ik.imagekit.io/kg2nszxjp/ironstride-preloader/preloader-mask.svg') center/40% no-repeat",
            maskComposite: "subtract",
            WebkitMaskComposite: "source-out" // fallback or different composite for webkit
        }}
      >
        {/* Mask Background Image with Effect */}
        <img 
          src="/assets/mask-bg.png" 
          alt="" 
          className="mask-bg-image absolute inset-0 w-full h-full object-cover origin-center"
        />
      </div>
    </div>
  );
}
