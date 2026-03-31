import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nuestra historia", href: "#historia" },
  { label: "Menu", href: "#menu" },
  { label: "Galeria", href: "#galeria" },
  { label: "Automovilismo", href: "#automovilismo" },
  { label: "Ubicacion", href: "#ubicacion" },
  { label: "Turismo", href: "#turismo" },
  { label: "Opiniones", href: "#reviews" },

];

const reserveHref =
  "https://wa.me/5492478403323?text=Hola%20Parrilla%20Fernandez,%20quiero%20reservar%20una%20mesa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

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

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-stone-200 transition hover:text-brand-cream"
              >
                {link.label}
              </a>
            ))}

            <a
              href={reserveHref}
              target="_blank"
              rel="noreferrer"
              className="btn ml-1 text-xs uppercase tracking-wider"
            >
              Reservar
            </a>
          </div>

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
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-stone-200 transition hover:bg-stone-900 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={reserveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn ml-1 text-xs uppercase tracking-wider"
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
