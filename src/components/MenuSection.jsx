import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { menuSections } from "../data/menuData";

export default function MenuSection() {
  const [active, setActive] = useState(menuSections[0].id);
  const activeSection = menuSections.find((section) => section.id === active);

  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="Menu resumido"
        title="Sabores de fogon y mesa familiar"
        subtitle="Una seleccion clasica de la casa con productos frescos, cocciones cuidadas y porciones para compartir."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {menuSections.map((section) => {
          const isActive = section.id === active;
          return (
            <button
              key={section.id}
              onClick={() => setActive(section.id)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                isActive
                  ? "border-fire bg-ember text-white shadow-glow"
                  : "border-stone-700/80 bg-black/30 text-stone-300 hover:border-gold/60"
              }`}
            >
              <p className="font-display text-2xl">{section.label}</p>
              <p className="mt-1 text-sm text-stone-400">{section.items.length} opciones</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-gold/20 bg-gradient-to-br from-stone-900 to-black p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {activeSection.items.map((item) => (
              <article key={item.name} className="rounded-2xl border border-stone-800 bg-black/30 p-5">
                <h3 className="font-display text-2xl text-stone-100">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{item.detail}</p>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
