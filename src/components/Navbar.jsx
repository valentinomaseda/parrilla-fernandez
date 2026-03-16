import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nuestra historia", href: "#historia" },
  { label: "Menu", href: "#menu" },
  { label: "Galeria", href: "#galeria" },
  { label: "Ubicacion", href: "#ubicacion" },
];

const reserveHref =
  "https://wa.me/5492478460000?text=Hola%20Parrilla%20Fernandez,%20quiero%20reservar%20una%20mesa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/70 to-transparent">
      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-brand-cream/20 bg-black/55 px-3 py-2 backdrop-blur-md">
          <a href="#inicio" className="shrink-0" aria-label="Ir al inicio">
            <img src="/logo.png" alt="Parrilla Fernandez" className="h-10 w-auto sm:h-11" />
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
              className="ml-1 rounded-full border border-brand-cream/80 bg-brand-red px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-glow transition hover:bg-[#7a2523]"
            >
              Reservar
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/40 text-stone-100 md:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="mt-2 rounded-2xl border border-brand-cream/20 bg-black/85 p-3 backdrop-blur-md md:hidden"
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
                onClick={handleLinkClick}
                className="mt-1 inline-flex items-center justify-center rounded-xl border border-brand-cream/80 bg-brand-red px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-glow transition hover:bg-[#7a2523]"
              >
                Reservar
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
