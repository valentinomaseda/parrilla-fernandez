import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useState } from "react";
import { X } from "lucide-react";
import { getPosterPathFromVideo, isVideoMediaPath } from "../utils/media";
import DeferredVideo from "./DeferredVideo";

const galleryItems = [
  {
    title: "Mística fierrera",
    media: "/Parrilla Fernandez Rell Bajada 1.mp4",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "Cocción a la estaca",
    media: "/Parri Historia 3.mp4",
    span: "sm:col-span-1",
    poster: "/estaca.webp",
  },
  {
    title: "Chimenea encendida",
    media: "/Parri Historia 1.mp4",
    span: "sm:col-span-1",
  },
  {
    title: "Mesas de madera",
    media: "/Parri Historia 2.mp4",
    span: "sm:col-span-1",
  },
  {
    title: "Momentos inolvidables",
    media: "/Cumple.mp4",
    span: "sm:col-span-1",
  },
  {
    title: "Sabores únicos",
    media: "/C1180.mp4",
    span: "sm:col-span-1",
  },
  {
    title: "Cortes seleccionados",
    media: "/Historia Carne.mp4",
    span: "sm:col-span-1",
  },
  {
    title: "Parrillada completa",
    media: "/Parri Historia 1  (1).mp4",
    span: "sm:col-span-1",
  },
  {
    title: "Bodega de vinos",
    media: "/vinos.webp",
    span: "sm:col-span-1",
  },
  {
    title: "Variedad de vinos",
    media: "/vinos2.webp",
    span: "sm:col-span-1",
  },
];

const wineItems = [
  { title: "Escorihuela Gascón", media: "/gascon1.webp", span: "sm:col-span-2 sm:row-span-2" },
  { title: "Nuevas incorporaciones", media: "/gascon2.webp", span: "sm:col-span-1" },
  { title: "Brindis ideal", media: "/gascon3.webp", span: "sm:col-span-1" },
  { title: "En su punto justo", media: "/gascon4.webp", span: "sm:col-span-1" },
  { title: "Maridaje perfecto", media: "/gascon5.webp", span: "sm:col-span-1" },
  { title: "Detalles que cuentan", media: "/gascon6.webp", span: "sm:col-span-1" },
  { title: "Bodega exclusiva", media: "/gascon7.webp", span: "sm:col-span-1" },
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
        {galleryItems.map((item, index) => {
          const isVideo = isVideoMediaPath(item.media);
          const poster = item.poster || getPosterPathFromVideo(item.media);
          return (
            <motion.figure
              key={`gallery-${item.title}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-cream/20 ${item.span}`}
              onClick={() => handleImageClick(item.media, item.title)}
            >
              {isVideo ? (
                <DeferredVideo
                  src={item.media}
                  poster={poster}
                  preload="none"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={item.media}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}

              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-sm text-brand-cream">
                {item.title}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="Nueva Carta"
          title="Nuestros Vinos"
          subtitle="Descubrí nuestra exclusiva selección de vinos Escorihuela Gascón, el maridaje perfecto para nuestras carnes."
        />
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-3">
          {wineItems.map((item, index) => {
            const isVideo = isVideoMediaPath(item.media);
            const poster = item.poster || getPosterPathFromVideo(item.media);
            return (
              <motion.figure
                key={`wine-${item.title}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-cream/20 ${item.span}`}
                onClick={() => handleImageClick(item.media, item.title)}
              >
                {isVideo ? (
                  <DeferredVideo
                    src={item.media}
                    poster={poster}
                    preload="none"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.media}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}

                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-sm text-brand-cream">
                  {item.title}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
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
              {isVideoMediaPath(selectedImage) ? (
                <video
                  src={selectedImage}
                  poster={getPosterPathFromVideo(selectedImage)}
                  className="w-full rounded-2xl object-contain shadow-2xl"
                  style={{ maxHeight: "75vh" }}
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedImage}
                  alt={selectedTitle}
                  className="w-full rounded-2xl object-contain shadow-2xl"
                  style={{ maxHeight: "75vh" }}
                />
              )}
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
