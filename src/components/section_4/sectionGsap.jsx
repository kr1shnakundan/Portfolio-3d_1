import gsap from "gsap";
import { useEffect, useRef } from "react";


const SectionGsap = () => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const setOriginAndAnimate = () => {
      const container = containerRef.current;
      const box = boxRef.current;
      if (!container || !box) return;

      const containerRect = container.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      const originX = containerRect.left + containerRect.width / 2 - boxRect.left;
      const originY = containerRect.top + containerRect.height / 2 - boxRect.top;

      gsap.set(box, { transformOrigin: `${originX}px ${originY}px` });

      gsap.to(box, {
        rotation: 27,
        x: 10,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        repeat: -1,
        yoyo: true,
      });
    };

    setOriginAndAnimate();
    window.addEventListener("resize", setOriginAndAnimate);

    return () => {
      window.removeEventListener("resize", setOriginAndAnimate);
      if (boxRef.current) gsap.killTweensOf(boxRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[89vh]">
      <div
        ref={boxRef}
        className="box absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-white"
      ></div>
    </div>
  );
};

export default SectionGsap;