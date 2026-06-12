// import gsap from "gsap";
// import { useEffect, useRef } from "react";


// const SectionGsap = () => {
//   const containerRef = useRef(null);
//   const boxRef = useRef(null);

//   useEffect(() => {
//     const setOriginAndAnimate = () => {
//       const container = containerRef.current;
//       const box = boxRef.current;
//       if (!container || !box) return;

//       const containerRect = container.getBoundingClientRect();
//       const boxRect = box.getBoundingClientRect();

//       const originX = containerRect.left + containerRect.width / 2 - boxRect.left;
//       const originY = containerRect.top + containerRect.height / 2 - boxRect.top;

//       gsap.set(box, { transformOrigin: `${originX}px ${originY}px` });

//       gsap.to(box, {
//         rotation: 27,
//         x: 10,
//         duration: 1,
//         ease: "elastic.out(1, 0.3)",
//         repeat: -1,
//         yoyo: true,
//       });
//     };

//     setOriginAndAnimate();
//     window.addEventListener("resize", setOriginAndAnimate);

//     return () => {
//       window.removeEventListener("resize", setOriginAndAnimate);
//       if (boxRef.current) gsap.killTweensOf(boxRef.current);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative min-h-[89vh]">
//       <div
//         ref={boxRef}
//         className="box absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-white"
//       ></div>
//     </div>
//   );
// };

// export default SectionGsap;


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

      // Every card except the last one scales/tilts slightly as it stacks
      if (i !== cards.length - 1) {
        scale = 0.9 + 0.025 * i;
        rotation = -10;
      }

      const tween = gsap.to(card, {
        scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperEl,
          start: `top ${60 + 10 * i}%`,
          end: "bottom 550px",
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

    return () => {
      triggers.forEach((t) => t && t.kill());
    };
  }, []);

  return (
    <>
      {/* Top spacer — gives scroll room before the section starts pinning */}
      <div className="w-full min-h-screen" />

      <div
        ref={wrapperRef}
        className="wrapper w-full min-h-screen pt-24 pb-12 border-t-2 border-b-2 border-dashed border-gray-300"
      >
        <div className="max-w-3xl mx-auto px-5 md:w-4/5 md:px-8 lg:w-[70%] lg:px-12">
          {CARDS.map((c, i) => (
            <div
              key={c.id}
              className="card-wrapper w-full mb-12 last:mb-0"
              style={{ perspective: "500px" }}
            >
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                className="card w-full h-[480px] rounded-xl overflow-hidden flex flex-col bg-white shadow-xl shadow-black/10 will-change-transform"
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

      {/* Bottom spacer — allows the last card's pin to release cleanly */}
      <div className="w-full min-h-screen" />
    </>
  );
};