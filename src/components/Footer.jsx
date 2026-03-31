import { Instagram, MapPin, Phone, Clock3, Facebook } from "lucide-react";

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
            href="https://wa.me/5492478403323?text=Hola%20Parrilla%20Fernández,%20quiero%20reservar%20una%20mesa"
            target="_blank"
            rel="noreferrer"
            className="btn mt-5 text-sm uppercase tracking-wide"
          >
            Reservar por WhatsApp
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cream/80">Navegación</p>
          <div className="mt-4 space-y-2 text-sm text-stone-300">
            <a href="#inicio" className="block transition hover:text-brand-cream">
              Inicio
            </a>
            <a href="#historia" className="block transition hover:text-brand-cream">
              Nuestra historia
            </a>
            <a href="#menu" className="block transition hover:text-brand-cream">
              Menú
            </a>
            <a href="#galeria" className="block transition hover:text-brand-cream">
              Galería
            </a>
            <a href="#automovilismo" className="block transition hover:text-brand-cream">
              Automovilismo
            </a>
            <a href="#ubicacion" className="block transition hover:text-brand-cream">
              Ubicación
            </a>
            <a href="#turismo" className="block transition hover:text-brand-cream">
              Turismo
            </a>
            <a href="#reviews" className="block transition hover:text-brand-cream">
              Reseñas
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cream/80">Contacto</p>
          <div className="mt-4 space-y-3 text-sm text-stone-300">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-red" /> Ruta 51 e Italia, Arrecifes
            </p>
            <a href="tel:+5492478403323" className=" flex items-center gap-2 transition hover:text-white">
              <Phone className="h-4 w-4 text-brand-red" /> +54 2478 40-3323
            </a>
            <a
              href="https://www.instagram.com/parrillafernandez1"
              target="_blank"
              rel="noreferrer"
              className=" flex items-center gap-2 transition hover:text-white"
            >
              <Instagram className="h-4 w-4 text-brand-red" /> @parrillafernandez1
            </a>
            <a
              href="https://www.facebook.com/parrillafernandez1"
              target="_blank"
              rel="noreferrer"
              className=" flex items-center gap-2 transition hover:text-white"
            >
              <Facebook className="h-4 w-4 text-brand-red" /> Parrilla Fernández
            </a>
            <p className="flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 text-brand-red" />
              <span>Mar-Dom: 12:00-16:00 y 20:00-00:00</span>
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
