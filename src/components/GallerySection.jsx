import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const galleryItems = [
  {
    title: "Coccion a la estaca",
    image:
      "estaca.jpg",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "Chimenea encendida",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70",
    span: "sm:col-span-1",
  },
  {
    title: "Mesas de madera",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=70",
    span: "sm:col-span-1",
  },
  {
    title: "Mistica fierrera",
    image:
      "auto.jpg",
    span: "sm:col-span-2",
  },
];

export default function GallerySection() {
  return (
    <section id="galeria" className="noise-dark mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="Galeria"
        title="Inmersion visual"
        subtitle="Fuego real, madera, humo y detalles que cuentan por que esta parada es leyenda en Ruta 51."
      />

      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.figure
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl border border-brand-cream/20 ${item.span}`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-sm text-brand-cream">
              {item.title}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
