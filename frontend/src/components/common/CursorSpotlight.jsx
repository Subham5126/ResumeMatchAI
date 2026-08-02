import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPARKLE_COLORS = ["#818cf8", "#c084fc", "#fbbf24", "#34d399", "#38bdf8"];

export default function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState([]);
  const [clickBursts, setClickBursts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const lastSparkleTime = useRef(0);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      const x = e.clientX;
      const y = e.clientY;

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x, y });

        // Throttle sparkle creation to every 35ms for silky 60fps performance
        const now = Date.now();
        if (now - lastSparkleTime.current > 35) {
          lastSparkleTime.current = now;

          const newSparkle = {
            id: now + Math.random(),
            x: x + (Math.random() * 16 - 8),
            y: y + (Math.random() * 16 - 8),
            size: Math.random() * 8 + 4,
            color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
            rotation: Math.random() * 180,
          };

          setSparkles((prev) => [...prev.slice(-15), newSparkle]);
        }

        // Check if cursor is hovering over interactive elements
        const target = e.target;
        if (
          target &&
          (target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.closest("button") ||
            target.closest("a") ||
            target.classList.contains("cursor-pointer") ||
            target.classList.contains("card-hover-effect"))
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      });
    };

    const handleMouseDown = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const burstId = Date.now();

      // Generate 8 directional sparkle particles for click burst
      const burstParticles = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const distance = Math.random() * 35 + 25;
        return {
          id: `${burstId}-${i}`,
          x: x,
          y: y,
          targetX: x + Math.cos(angle) * distance,
          targetY: y + Math.sin(angle) * distance,
          size: Math.random() * 8 + 5,
          color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
        };
      });

      setClickBursts((prev) => [...prev.slice(-16), ...burstParticles]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block select-none">
      {/* 1. Pure Ambient Radial Glow Light Beam */}
      <motion.div
        className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.22)_0%,rgba(168,85,247,0.12)_40%,transparent_70%)] blur-3xl"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
          scale: isHovered ? 1.35 : 1,
        }}
        transition={{
          type: "spring",
          damping: 32,
          stiffness: 220,
          mass: 0.5,
        }}
      />

      {/* 2. Floating Cursor Sparkle Trail */}
      <AnimatePresence>
        {sparkles.map((sp) => (
          <motion.div
            key={sp.id}
            initial={{ opacity: 1, scale: 0.2, x: sp.x, y: sp.y, rotate: sp.rotation }}
            animate={{
              opacity: 0,
              scale: 1.1,
              y: sp.y - 18,
              rotate: sp.rotation + 90,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: sp.size,
              height: sp.size,
              pointerEvents: "none",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={sp.color}
              className="w-full h-full drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3. Global Click Burst Particle Explosion */}
      <AnimatePresence>
        {clickBursts.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.3, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 1.2,
              x: p.targetX,
              y: p.targetY,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              pointerEvents: "none",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={p.color}
              className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
