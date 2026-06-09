import { useEffect, useRef } from "react";
import techs from "./tech";
import "./section_4_stack.css";

const PATH_D =
  "M 1 209.434 C 58.5872 255.935 387.926 325.938 482.583 209.434 C 600.905 63.8051 525.516 -43.2211 427.332 19.9613 C 329.149 83.1436 352.902 242.723 515.041 267.302 C 644.752 286.966 943.56 181.94 995 156.5";

const VIEWBOX_W = 996;
const Y_MIN = -43;
const Y_MAX = 326;
const SZ_MIN = 28;
const SZ_MAX = 72;

export default function PhysicsTechStack() {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const marqueeEl = marqueeRef.current;

    if (!container || !marqueeEl) return;

    // Create hidden SVG path
    const tempSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    const tempPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    tempPath.setAttribute("d", PATH_D);
    tempSvg.appendChild(tempPath);

    tempSvg.style.cssText =
      "position:absolute;visibility:hidden;width:0;height:0;overflow:visible";

    document.body.appendChild(tempSvg);

    const pathLen = tempPath.getTotalLength();

    const sampleY = (pct) =>
      tempPath.getPointAtLength((pct / 100) * pathLen).y;

    const sizeFromY = (y) => {
      const n = Math.max(
        0,
        Math.min(1, (y - Y_MIN) / (Y_MAX - Y_MIN))
      );

      return SZ_MIN + n * (SZ_MAX - SZ_MIN);
    };

    const opacityFromY = (y) => {
      const n = Math.max(
        0,
        Math.min(1, (y - Y_MIN) / (Y_MAX - Y_MIN))
      );

      return 0.25 + n * 0.75;
    };

    const zFromY = (y) => {
      const n = Math.max(
        0,
        Math.min(1, (y - Y_MIN) / (Y_MAX - Y_MIN))
      );

      return Math.round(1 + n * 20);
    };

    const N = techs.length;
    const SPACING = 100 / N;

    const state = techs.map((_, i) => ({
      offset: (i * SPACING) % 100,
    }));

    const elPairs = techs.map((tech) => {
      const createLogo = (ghost) => {
        const el = document.createElement("div");

        el.className = "logo-item";
        el.setAttribute("aria-hidden", ghost);

        el.innerHTML = `
          <div class="icon-wrap">
            ${tech.svg}
          </div>
          <span class="logo-label">
            ${tech.name}
          </span>
        `;

        el.style.offsetPath = `path("${PATH_D}")`;

        container.appendChild(el);

        return el;
      };

      return {
        el: createLogo(false),
        ghost: createLogo(true),
      };
    });

    function applyAll() {
      state.forEach(({ offset }, i) => {
        const pct = ((offset % 100) + 100) % 100;

        const y = sampleY(pct);
        const sz = sizeFromY(y);
        const opacity = opacityFromY(y);
        const zIndex = zFromY(y);

        [elPairs[i].el, elPairs[i].ghost].forEach((node) => {
          node.style.offsetDistance = `${pct}%`;
          node.style.opacity = opacity;
          node.style.zIndex = zIndex;

          const wrap = node.querySelector(".icon-wrap");

          if (wrap) {
            wrap.style.width = `${sz}px`;
            wrap.style.height = `${sz}px`;
          }
        });
      });
    }

    function shiftAll(delta) {
      state.forEach((item) => {
        item.offset =
          ((item.offset + delta) % 100 + 100) % 100;
      });

      applyAll();
    }

    function pxToPct(px) {
      const rect = marqueeEl.getBoundingClientRect();

      return (
        (px / (rect.width / VIEWBOX_W) / VIEWBOX_W) *
        100
      );
    }

    let dragging = false;
    let velocity = 0;
    let lastX = 0;
    let lastT = 0;
    let momentum = 0;
    let coastRaf = null;
    let userActive = false;
    let idleTimer = null;

    const getX = (e) =>
      e.touches ? e.touches[0].clientX : e.clientX;

    const onStart = (e) => {
      dragging = true;

      lastX = getX(e);
      lastT = Date.now();

      velocity = 0;
      momentum = 0;

      cancelAnimationFrame(coastRaf);

      marqueeEl.classList.add("grabbing");

      userActive = true;

      clearTimeout(idleTimer);
    };

    const onMove = (e) => {
      if (!dragging) return;

      const x = getX(e);

      const now = Date.now();
      const dt = Math.max(1, now - lastT);

      velocity = (x - lastX) / dt;

      shiftAll(pxToPct(x - lastX));

      lastX = x;
      lastT = now;
    };

    const onEnd = () => {
      if (!dragging) return;

      dragging = false;

      marqueeEl.classList.remove("grabbing");

      momentum = velocity * 55;

      const coastLoop = () => {
        if (Math.abs(momentum) < 0.0008) return;

        momentum *= 0.93;

        shiftAll(pxToPct(momentum));

        coastRaf =
          requestAnimationFrame(coastLoop);
      };

      coastLoop();

      idleTimer = setTimeout(() => {
        userActive = false;
      }, 2500);
    };

    const autoDrift = () => {
      if (!dragging && !userActive) {
        shiftAll(0.014);
      }

      requestAnimationFrame(autoDrift);
    };

    marqueeEl.addEventListener(
      "mousedown",
      onStart
    );

    marqueeEl.addEventListener(
      "touchstart",
      onStart,
      { passive: true }
    );

    window.addEventListener(
      "mousemove",
      onMove
    );

    window.addEventListener(
      "touchmove",
      onMove,
      { passive: true }
    );

    window.addEventListener(
      "mouseup",
      onEnd
    );

    window.addEventListener(
      "touchend",
      onEnd
    );

    applyAll();
    autoDrift();

    return () => {
      marqueeEl.removeEventListener(
        "mousedown",
        onStart
      );

      marqueeEl.removeEventListener(
        "touchstart",
        onStart
      );

      window.removeEventListener(
        "mousemove",
        onMove
      );

      window.removeEventListener(
        "touchmove",
        onMove
      );

      window.removeEventListener(
        "mouseup",
        onEnd
      );

      window.removeEventListener(
        "touchend",
        onEnd
      );

      cancelAnimationFrame(coastRaf);

      document.body.removeChild(tempSvg);

      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="skills-root">
      <p className="eyebrow">
        Skills &amp; Tools
      </p>

      <h2 className="title">
        Tools I've picked up, broken,
        and learned to trust over time.
      </h2>

      <div
        ref={marqueeRef}
        className="marquee-outer"
      >
        <div className="marquee-inner">
          <svg
            className="path-svg"
            viewBox="0 0 996 330"
          >
            <path
              d="M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"
              fill="none"
              stroke="rgba(0,0,0,0.07)"
              strokeWidth="1"
              strokeDasharray="5 8"
            />
          </svg>

          <div ref={containerRef} />
        </div>

        <p className="drag-hint">
          YES, you can move this xD
        </p>
      </div>
    </section>
  );
}