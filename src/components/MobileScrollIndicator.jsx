import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mapeo de IDs de tus secciones a nombres legibles
const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "historia", label: "Nuestra Historia" },
  { id: "menu", label: "Menú" },
  { id: "galeria", label: "Galería" },
  { id: "automovilismo", label: "Cuna de Campeones" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "turismo", label: "Turismo" },
  { id: "reviews", label: "Reseñas" },
];

export default function MobileScrollIndicator() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar la píldora al scrollear
      setIsVisible(true);

      // Reset hide timeout (use ref so it's stable across renders)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsVisible(false), 2000);

      // Use requestAnimationFrame for cheaper, consistent updates
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        let current = "";
        // Use the upper third of the viewport as the read point
        const readPoint = window.innerHeight / 3;

        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // rect.top/rect.bottom are relative to viewport
          if (readPoint >= rect.top && readPoint < rect.bottom) {
            current = section.label;
            break;
          }
        }

        // Update state (React ignores identical values)
        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once to initialize on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeSection]);

  return (
    <AnimatePresence>
      {isVisible && activeSection && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          // Solo se ve en mobile (md:hidden) y queda fija debajo del navbar
          className="fixed top-24 left-0 right-0 z-40 flex justify-center pointer-events-none md:hidden"
        >
          <div className="bg-stone-900/80 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] px-5 py-2 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-cream">
              {activeSection}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
