import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Counter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="border-y border-brand-cream/5 bg-[#141211] py-16 sm:py-24 relative overflow-hidden">
      {/* Ruido de fondo para mantener la textura del sitio */}
      <div className="absolute inset-0 noise-dark opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <p className="mb-12 text-center text-[11px] font-black uppercase tracking-[0.4em] text-brand-red">
          Parrilla Fernández · Desde 1977
        </p>
        
        {/* Layout Responsivo: 1 columna en móvil, 3 en desktop */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
          {[
            { 
              value: 49, 
              suffix: "", 
              label: "Años de fuego", 
              sub: "Tradición ininterrumpida" 
            },
            { 
              value: 100, 
              suffix: "%", 
              label: "Fuego a leña", 
              sub: "Puro quebracho y espinillo" 
            },
            { 
              value: 1, 
              suffix: "", 
              label: "Familia al frente", 
              sub: "Misma receta, misma pasión" 
            },
          ].map((stat) => (
            <div key={stat.label} className="px-6 text-center group">
              <p className="font-display text-6xl text-brand-cream sm:text-7xl group-hover:scale-105 transition-transform duration-500">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.25em] text-stone-400">
                {stat.label}
              </p>
              <p className="mt-1.5 text-sm text-stone-500 italic font-light">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}