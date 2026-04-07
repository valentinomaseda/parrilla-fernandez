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
            title="Ubicación Parrilla Fernández"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0526147197706!2d-60.096924725071716!3d-34.06816547315098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99d9546653315%3A0x92319b795174661a!2sParrilla%20Fern%C3%A1ndez!5e0!3m2!1ses-419!2sar!4v1775599057072!5m2!1ses-419!2sar"
            className="h-80 w-full border-0 sm:h-[26rem]"
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-brand-cream/20 bg-stone-950/70 p-6"
        >
          <div className="mb-6 flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-brand-red" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cream/80">Direccion</p>
              <p className="mt-2 text-base text-stone-200">Ruta 51 e Italia, Arrecifes</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 h-5 w-5 text-brand-red" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cream/80">Horarios</p>
              <ul className="mt-2 space-y-2 text-sm text-stone-300">
                <li>Martes a Domingo: 12:00 a 16:00 y 20:00 a 00:00</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
