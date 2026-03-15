import { Clock3, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function LocationHoursSection() {
  return (
    <section id="ubicacion" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="Ubicacion y horarios"
        title="Parada obligada en la ruta"
        subtitle="Estamos en un punto estrategico para familias, viajeros y amantes de la parrilla tradicional."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="overflow-hidden rounded-3xl border border-stone-700/60"
        >
          <iframe
            title="Mapa Parrilla Fernandez"
            src="https://www.google.com/maps?q=Ruta+51+e+Italia,+Arrecifes&output=embed"
            className="h-80 w-full border-0 sm:h-[26rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-gold/20 bg-stone-950/70 p-6"
        >
          <div className="mb-6 flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-fire" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Direccion</p>
              <p className="mt-2 text-base text-stone-200">Ruta 51 e Italia, Arrecifes</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-5 w-5 text-fire" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Horarios</p>
              <ul className="mt-2 space-y-2 text-sm text-stone-300">
                <li>Martes a Sabado: 12:00 a 15:00 y 20:00 a 00:00</li>
                <li>Domingo: 12:00 a 15:30</li>
                <li>Lunes: Cerrado</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
