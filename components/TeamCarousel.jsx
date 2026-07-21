"use client";

import { useRef, useState, useEffect } from "react";
import TeamCard from "./TeamCard";

export default function TeamCarousel({ members }) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag to scroll logic
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Wheel to horizontal scroll logic
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // If the scroll is mostly vertical
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const isAtStart = el.scrollLeft <= 0;
        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

        // Allow vertical page scroll if we are at the edges
        if (e.deltaY < 0 && isAtStart) return;
        if (e.deltaY > 0 && isAtEnd) return;

        // Otherwise, hijack the scroll and move horizontally
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    // We must use a non-passive listener to be able to call e.preventDefault()
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  if (!members || members.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl py-16 text-center text-slate-500 border border-dashed border-slate-200">
        The core team is currently being assembled.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex w-full gap-6 overflow-x-auto px-4 pb-8 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {members.map((member) => (
          <div key={member._id.toString()} className="w-[240px] shrink-0">
            {/* Disable pointer events on the card while dragging so users don't accidentally click links */}
            <div className={isDragging ? "pointer-events-none" : ""}>
              <TeamCard member={member} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
