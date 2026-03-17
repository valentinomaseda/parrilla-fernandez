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
    <section className="border-y border-brand-cream/10 bg-black/40 py-16">
      <p className="mb-10 text-center text-[11px] uppercase tracking-[0.3em] text-stone-500">
        Parrilla Fernández · Desde 1983
      </p>
      <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-stone-800">
        {[
          { value: 40, suffix: "", label: "Años de fuego", sub: "Fundada en 1983" },
          { value: 12, suffix: "k+", label: "Comensales felices", sub: "Familias y viajeros" },
          { value: 1, suffix: "", label: "Familia al frente", sub: "Misma cocina, misma pasión" },
        ].map((stat) => (
          <div key={stat.label} className="px-6 text-center">
            <p className="font-display text-6xl text-brand-cream sm:text-7xl">
              <Counter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">{stat.label}</p>
            <p className="mt-1 text-[11px] text-stone-600">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}