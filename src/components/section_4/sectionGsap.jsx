import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tuning knobs for the stack effect — every card but the last shrinks and
// tilts back slightly more than the one above it.
const MIN_SCALE = 0.92;
const SCALE_STEP = 0.02;
const TILT_ROTATION_X = -6;
const PIN_SCROLL_DISTANCE_RATIO = 0.9;

const IMAGE_WIDTHS = [480, 768, 1170];

function buildSrcSet(url) {
  return IMAGE_WIDTHS.map((w) => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(
    ", "
  );
}

const CARDS = [
  {
    id: "one",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1170&q=80",
    title: "Design Systems",
    text: "Building reusable, scalable component libraries that keep teams moving fast.",
  },
  {
    id: "two",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Motion & Interaction",
    text: "GSAP-driven animations that add life to interfaces without slowing them down.",
  },
  {
    id: "three",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "E-commerce Builds",
    text: "Custom Shopify themes and storefronts tuned for conversion and speed.",
  },
  {
    id: "four",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1170&q=80",
    title: "Frontend Engineering",
    text: "Pixel-accurate, performant React applications from design to deployment.",
  },
];

export default function StackingCards() {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const cardWrapperRefs = useRef([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cards = cardRefs.current;
    const cardWrappers = cardWrapperRefs.current;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        const scale = isLast ? 1 : MIN_SCALE + SCALE_STEP * i;
        const rotationX = isLast ? 0 : TILT_ROTATION_X;

        gsap.to(card, {
          scale,
          rotationX,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: cardWrappers[i],
            start: "top top",
            end: () => `+=${window.innerHeight * PIN_SCROLL_DISTANCE_RATIO}`,
            endTrigger: wrapper,
            scrub: true,
            pin: cardWrappers[i],
            pinSpacing: isLast,
            id: `stack-card-${i + 1}`,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-gradient-to-b from-violet-950 via-[#160a29] to-black">
      <div
        ref={wrapperRef}
        className="wrapper w-full pt-20 pb-20 md:pt-30 md:pb-30"
      >
        <div className="max-w-3xl mx-auto px-5 md:w-4/5 md:px-8 lg:w-[70%] lg:px-12">
          {CARDS.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => (cardWrapperRefs.current[i] = el)}
              className="card-wrapper w-full mb-12"
              style={{ perspective: "500px" }}
            >
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                className="card w-full h-dvh rounded-xl overflow-hidden flex flex-col bg-white shadow-xl shadow-black/10 will-change-transform"
              >
                {/* Image — majority of card */}
                <img
                  src={c.image}
                  srcSet={buildSrcSet(c.image)}
                  sizes="(min-width: 1024px) 70vw, (min-width: 768px) 80vw, 100vw"
                  alt={c.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  className="flex-1 min-h-0 w-full object-cover object-top bg-gray-100"
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
    </div>
  );
}
