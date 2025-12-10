import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDE_IMAGES = [
  'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2072&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540339832862-43d6a7651b5f?q=80&w=2021&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop'
]

export function ImageSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    
    // Auto-play effect
    const intervalId = setInterval(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, 4000)

    return () => clearInterval(intervalId)
  }, [emblaApi, onSelect])

  return (
    <div className="relative group w-full max-w-[600px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm bg-white/10" data-fade-in="right">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {SLIDE_IMAGES.map((src, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
              <img
                className="block w-full h-full object-cover"
                src={src}
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#a988d4]/20 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 hover:scale-110 active:scale-95"
        onClick={scrollPrev}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 hover:scale-110 active:scale-95"
        onClick={scrollNext}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDE_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
