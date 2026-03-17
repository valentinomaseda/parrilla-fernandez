import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useState } from "react";
import { X } from "lucide-react";

const galleryItems = [
  {
    title: "Cocción a la estaca",
    image: "/estaca.jpg",
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
    title: "Mística fierrera",
    image: "/auto.jpg",
    span: "sm:col-span-2",
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleImageClick = (image, title) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedTitle("");
  };

  return (
    <section
      id="galeria"
      className="noise-dark mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:px-10"
    >
      <SectionHeading
        eyebrow="Galería"
        title="Inmersión visual"
        subtitle="Fuego real, madera, humo y detalles que cuentan por qué esta parada es leyenda en Ruta 51."
      />

      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.figure
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-cream/20 ${item.span}`}
            onClick={() => handleImageClick(item.image, item.title)}
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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mx-4 w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-brand-cream/30 bg-stone-900 text-stone-200 shadow-lg transition hover:bg-stone-800"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={selectedImage}
                alt={selectedTitle}
                className="w-full rounded-2xl object-contain shadow-2xl"
                style={{ maxHeight: "75vh" }}
              />
              <p className="mt-4 text-center font-display text-xl text-brand-cream">
                {selectedTitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}