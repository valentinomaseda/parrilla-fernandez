const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menu", href: "#menu" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Ubicacion", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-black/65 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:px-10">
        <a href="#inicio" className="shrink-0" aria-label="Ir al inicio">
          <img src="/logo.png" alt="Parrilla Fernandez" className="h-12 w-auto sm:h-14" />
        </a>

        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-xs sm:gap-2 sm:text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-3 py-1.5 font-medium text-stone-200 transition hover:border-gold/50 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
