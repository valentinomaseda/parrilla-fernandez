import { Instagram, MapPin, Phone, Clock3 } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-stone-800 bg-black/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="#inicio" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="Parrilla Fernández" className="h-12 w-auto" />
            <span className="font-display text-3xl text-stone-100">Parrilla Fernández</span>
          </a>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
            Donde el fuego habla desde 1977. Cocina de tradición, cortes premium y una experiencia
            familiar para quienes pasan por Arrecifes.
          </p>

          <a
            href="https://wa.me/5492478460000?text=Hola%20Parrilla%20Fernández,%20quiero%20reservar%20una%20mesa"
            target="_blank"
            rel="noreferrer"
            className="btn mt-5 text-sm uppercase tracking-wide"
          >
            Reservar por WhatsApp
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cream/80">Navegacion</p>
          <div className="mt-4 space-y-2 text-sm text-stone-300">
            <a href="#inicio" className="block transition hover:text-brand-cream">
              Inicio
            </a>
            <a href="#menu" className="block transition hover:text-brand-cream">
              Menu
            </a>
            <a href="#experiencia" className="block transition hover:text-brand-cream">
              Experiencia
            </a>
            <a href="#ubicacion" className="block transition hover:text-brand-cream">
              Ubicacion
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cream/80">Contacto</p>
          <div className="mt-4 space-y-3 text-sm text-stone-300">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-red" /> Ruta 51 e Italia, Arrecifes
            </p>
            <a href="tel:+542478460000" className=" flex items-center gap-2 transition hover:text-white">
              <Phone className="h-4 w-4 text-brand-red" /> +54 2478 46-0000
            </a>
            <a
              href="https://www.instagram.com/parrillafernandez1"
              target="_blank"
              rel="noreferrer"
              className=" flex items-center gap-2 transition hover:text-white"
            >
              <Instagram className="h-4 w-4 text-brand-red" /> @parrillafernandez1
            </a>
            <p className="flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 text-brand-red" />
              <span>Mar-Sab: 12:00-15:00 y 20:00-00:00 | Dom: 12:00-15:30</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} Parrilla Fernández. Todos los derechos reservados.</p>
          <p>Hecho con tradición, fuego y buena mesa.</p>
        </div>
      </div>

    </footer>
  );
}
