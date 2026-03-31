import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { menuSections } from "../data/menuData";

export default function MenuSection() {
  const [active, setActive] = useState(menuSections[0].id);
  const activeSection = menuSections.find((section) => section.id === active);

  const handleToggle = (id) => {
    // Si tocás el que ya está activo, lo cierra (lo pasa a null). Si no, lo abre.
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="Menú resumido"
        title="Sabores de fogón y mesa familiar"
        subtitle="Una selección clásica de la casa con productos frescos, cocciones cuidadas y porciones para compartir."
      />

      {/* Contenedor principal: Lista vertical en Mobile, Grilla en Desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4">
        {menuSections.map((section) => {
          const isActive = section.id === active;
          return (
            <div key={section.id} className="flex flex-col">
              {/* Botón de la categoría */}
              <button
                onClick={() => handleToggle(section.id)}
                className={`rounded-2xl border px-5 py-4 text-left transition flex items-center justify-between ${
                  isActive
                    ? "border-brand-red bg-ember text-white shadow-glow"
                    : "border-stone-700/80 bg-black/30 text-stone-300 hover:border-brand-cream/60"
                }`}
              >
                <div>
                  <p className="font-display text-2xl">{section.label}</p>
                  <p className={`mt-1 text-sm ${isActive ? 'text-white/80' : 'text-stone-400'}`}>
                    {section.items.length} opciones
                  </p>
                </div>
                {/* Flecha indicadora (solo visible en Mobile) */}
                <div
                  className={`lg:hidden transition-transform duration-300 ${
                    isActive ? "rotate-180 text-brand-cream" : "text-stone-500"
                  }`}
                >
                  <ChevronDown size={22} />
                </div>
              </button>

              {/* CONTENIDO MOBILE (Acordeón desplegable) */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="pt-4 pb-2 grid gap-4 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <article
                          key={item.name}
                          className="flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-black/35 sm:flex-row"
                        >
                          <div className="h-48 w-full sm:h-auto sm:w-44 sm:flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-5">
                            <h3 className="font-display text-2xl text-brand-cream">{item.name}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-stone-300">{item.detail}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* CONTENIDO DESKTOP (Contenedor fijo abajo, oculto en Mobile) */}
      <div className="hidden lg:block">
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="mt-8 rounded-3xl border border-brand-cream/20 bg-gradient-to-br from-stone-900 to-black p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {activeSection.items.map((item) => (
                  <article
                    key={item.name}
                    className="flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-black/35 sm:flex-row"
                  >
                    <div className="h-40 w-full sm:h-auto sm:w-44 sm:flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-2xl text-brand-cream">{item.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-300">{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>

              {/* CTA futuro */}
              <div className="mt-10 flex justify-center">
                {/* Botón de ver menú completo */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}