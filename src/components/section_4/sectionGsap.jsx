import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "one",
    image: "https://assets.codepen.io/16327/portrait-pattern-1.jpg",
    title: "Design Systems",
    text: "Building reusable, scalable component libraries that keep teams moving fast.",
  },
  {
    id: "two",
    image: "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
    title: "Motion & Interaction",
    text: "GSAP-driven animations that add life to interfaces without slowing them down.",
  },
  {
    id: "three",
    image: "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
    title: "E-commerce Builds",
    text: "Custom Shopify themes and storefronts tuned for conversion and speed.",
  },
  {
    id: "four",
    image: "https://assets.codepen.io/16327/portrait-pattern-4.jpg",
    title: "Frontend Engineering",
    text: "Pixel-accurate, performant React applications from design to deployment.",
  },
];

export default function StackingCards() {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardRefs.current;
    const triggers = [];

    cards.forEach((card, i) => {
      const wrapperEl = card.closest(".card-wrapper");

      let scale = 1;
      let rotation = 0;

      // Every card except the last one scales down and tilts back
      // as the NEXT card pins on top of it — creates the "stacked
      // deck" look. The last card stays full-size since nothing
      // covers it.
      if (i !== cards.length - 1) {
        scale = 0.92 + 0.02 * i;
        rotation = -6;
      }

      const tween = gsap.to(card, {
        scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperEl,
          // Card pins as soon as it reaches the top of the viewport,
          // and stays pinned/full-size for 90% of a viewport-height
          // worth of scroll before shrinking back for the next card.
          start: "top top",
          end: () => "+=" + window.innerHeight * 0.9,
          endTrigger: wrapper,
          scrub: true,
          pin: wrapperEl,
          pinSpacing: false,
          // markers: true,
          id: `stack-card-${i + 1}`,
        },
      });

      triggers.push(tween.scrollTrigger);
    });

    // Recalculate trigger positions/distances on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      triggers.forEach((t) => t && t.kill());
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="wrapper w-full overflow-hidden border-t-2 border-b-2 border-dashed border-gray-300"
    >
      <div className="max-w-3xl mx-auto px-5 md:w-4/5 md:px-8 lg:w-[70%] lg:px-12">
        {CARDS.map((c, i) => (
          <div
            key={c.id}
            className="card-wrapper w-full"
            style={{ perspective: "500px" }}
          >
            <div
              ref={(el) => (cardRefs.current[i] = el)}
              className="card w-full h-screen rounded-xl overflow-hidden flex flex-col bg-white shadow-xl shadow-black/10 will-change-transform"
            >
              {/* Image — majority of card */}
              <div
                className="flex-1 bg-cover bg-no-repeat bg-top"
                style={{ backgroundImage: `url(${c.image})` }}
              />

              {/* Text block below image */}
              <div className="px-6 py-5 bg-white">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-1">
                  {c.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500">
                  {c.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}