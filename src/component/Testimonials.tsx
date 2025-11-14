import React, { useEffect, useRef, useState } from "react";
import { TESTIMONIALS_DATA } from "../libs";



export default function TestimonialSlider() {
  const [index, setIndex] = useState(0); // user-driven index
  const containerRef = useRef<HTMLDivElement | null>(null);

  // responsive items per view: 1 (mobile), 2 (sm), 3 (md+)
  const [itemsPerView, setItemsPerView] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Compute valid range and a clamped index for rendering only.
  const maxIndex = Math.max(0, TESTIMONIALS_DATA.length - itemsPerView);
  const clampedIndex = Math.min(Math.max(0, index), maxIndex);

  // Ensure user interactions never set an out-of-bound index:
  const goTo = (i: number) => {
    const next = Math.min(Math.max(0, i), maxIndex);
    setIndex(next);
  };

  // touch handling
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = touchStartX.current;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || touchStartX.current == null || touchCurrentX.current == null) {
      isDragging.current = false;
      return;
    }
    const diff = touchStartX.current - touchCurrentX.current;
    if (diff > 60) {
      // swipe left
      goTo(index + 1);
    } else if (diff < -60) {
      // swipe right
      goTo(index - 1);
    }
    isDragging.current = false;
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  // width / translate calculations
  const translatePercent = (clampedIndex * 100) / itemsPerView;
  const trackWidthPercent = (TESTIMONIALS_DATA.length * 100) / itemsPerView;

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-center text-3xl font-semibold font-poppins">What Our Students are saying about us</h2>
      <p className="text-center text-lg text-gray-500 mb-8 font-poppins">Testimonials</p>

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {TESTIMONIALS_DATA.map((t) => (
            <div key={t.id} className="px-2" style={{ width: `${100 / TESTIMONIALS_DATA.length}%` }}>
              <article className="h-full bg-linear-to-b from-primary-900 to-primary-100  text-white p-6 rounded-2xl shadow-xl min-h-[180px] flex flex-col justify-between">
                <p className="text-sm leading-relaxed font-poppins">{t.text}</p>
                <p className="font-semibold mt-4 text-right font-poppins">{t.name}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-3">
        {Array.from({ length: Math.max(1, TESTIMONIALS_DATA.length - itemsPerView + 1) }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full font-poppins transition-transform transform ${i === clampedIndex ? "scale-110 bg-green-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
