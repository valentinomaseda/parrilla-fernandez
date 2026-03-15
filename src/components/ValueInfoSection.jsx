import { Flame, Armchair, Soup } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const features = [
  {
    title: "Chimenea",
    text: "Salon calido con fuego real en temporada, ideal para noches frias.",
    icon: Flame,
  },
  {
    title: "Asientos al aire libre",
    text: "Patio amplio para disfrutar la parrilla con aire de campo.",
    icon: Armchair,
  },
  {
    title: "Buffet",
    text: "Opciones de acompanamientos y ensaladas para toda la mesa.",
    icon: Soup,
  },
];

export default function ValueInfoSection() {
  return (
    <section
      id="experiencia"
      className="mx-auto max-w-6xl scroll-mt-24 rounded-3xl border border-brand-red/30 bg-[linear-gradient(120deg,rgba(44,16,15,0.95),rgba(26,22,20,0.95)),radial-gradient(circle_at_2px_2px,rgba(245,181,145,0.06)_1px,transparent_0)] px-6 py-20 [background-size:auto,8px_8px] sm:px-10"
    >
      <SectionHeading
        eyebrow="Experiencia"
        title="Mucho mas que una comida"
        subtitle="Cada espacio fue pensado para que la sobremesa se extienda con comodidad, calor y buen servicio."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="rounded-2xl border border-brand-cream/25 bg-black/35 p-6"
            >
              <Icon className="h-8 w-8 text-brand-cream" />
              <h3 className="mt-4 font-display text-3xl text-stone-100">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">{feature.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
