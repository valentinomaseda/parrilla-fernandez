import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nuestra historia", href: "#historia" },
  { label: "Menú", href: "#menu" },
  { label: "Galería", href: "#galeria" },
  { label: "Automovilismo", href: "#automovilismo" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Turismo", href: "#turismo" },
  { label: "Reseñas", href: "#reviews" },
];

const reserveHref =
  "https://wa.me/5492478403323?text=Hola%20Parrilla%20Fernandez,%20quiero%20reservar%20una%20mesa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio"); // Estado para el Scroll Spy

  const handleLinkClick = () => setOpen(false);

  // Lógica para detectar en qué sección estamos
  useEffect(() => {
    const rafRef = { current: null };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // El punto de lectura: un tercio del viewport desde arriba
        const readPoint = window.innerHeight / 3;
        let current = "";

        for (const link of links) {
          const id = link.href.substring(1);
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (readPoint >= rect.top && readPoint < rect.bottom) {
            current = id;
            break;
          }
        }

        if (current) setActiveSection(current);
      });
    };

    handleScroll(); // inicializar
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/70 to-transparent">
      <div style={{ position: "relative" }} className="mx-auto max-w-6xl px-4 pt-3 sm:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-brand-cream/20 bg-black/55 px-3 py-2 backdrop-blur-md">
          
          <a
            href="#inicio"
            className="shrink-0 group"
            aria-label="Ir al inicio"
          >
            <img
              src="/logo.png"
              alt="Parrilla Fernandez"
              className="h-14 w-auto sm:h-16 transition-transform duration-500 group-hover:scale-110"
            />
          </a>

          {/* Enlaces Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition duration-300 ${
                    isActive ? "text-brand-cream" : "text-stone-300 hover:text-brand-cream"
                  }`}
                >
                  {link.label}
                  {/* Subrayado animado (LayoutId hace que se deslice entre links) */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-brand-red"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            <a
              href={reserveHref}
              target="_blank"
              rel="noreferrer"
              className="btn ml-1 text-xs uppercase tracking-wider"
            >
              Reservar
            </a>
          </div>

          {/* Menú Hamburguesa Mobile */}
          <motion.button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/40 text-stone-100 md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.span
              initial={false}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex items-center"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </motion.button>
        </div>

        {/* Desplegable Mobile */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              className="mt-2 rounded-2xl border border-brand-cream/20 bg-black/85 p-3 backdrop-blur-md md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col gap-2">
                {links.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand-red/15 text-brand-red" // Resaltado en Mobile si está activo
                          : "text-stone-200 hover:bg-stone-900 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <a
                  href={reserveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn ml-1 mt-2 text-xs uppercase tracking-wider text-center"
                >
                  Reservar
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}