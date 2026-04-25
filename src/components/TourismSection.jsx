import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Compass,
} from "lucide-react";

const defaultPlaces = [
  {
    id: "plaza_mitre",
    name: "Plaza Bartolomé Mitre",
    tagline: "Plaza histórica",
    description:
      "Plaza histórica en el centro de la ciudad, punto de encuentro y actividades culturales.",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0808018686535!2d-60.11133978951736!3d-34.06744287303924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99ddcebfc1b49%3A0x1468be4a515ae23b!2sPlaza%20Bartolom%C3%A9%20Mitre!5e0!3m2!1ses-419!2sar!4v1775602311289!5m2!1ses-419!2sar",
    images: ["/mitre.webp", "/Arco-pLAZA.webp", "/Arrecifes-Iglesia-768x431.webp"],
  },
  {
    id: "molino_harinero",
    name: "Molino Harinero",
    tagline: "Ruinas históricas",
    description:
      "Restos del antiguo molino; un punto de interés arqueológico y fotográfico único a orillas del río.",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6609.72026413217!2d-60.11456870356957!3d-34.07309955979357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99de6e77501f3%3A0x4754ba6078f6e767!2sViejo%20Molino%20Harinero!5e0!3m2!1ses-419!2sar!4v1775602707775!5m2!1ses-419!2sar",
    images: [
      "public/arrecifes-molino-768x517.webp",
      "public/arrecifes-molino-2-edited-1-768x1024.webp",
      "public/arrecifes-molino-3.webp",
    ],
  },
  {
    id: "circuito_costanero",
    name: "Circuito Costanero",
    tagline: "Automovilismo y naturaleza",
    description:
      'El Circuito "Daniel Alberti" es un espacio recreativo y automovilístico destacado, situado a orillas del río Arrecifes. Es punto de encuentro clave para competencias zonales.',
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.972072701342!2d-60.10400121531138!3d-34.075323631286366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99deed033714f%3A0x2558615062181b4f!2sCircuito%20Costanero%20de%20Arrecifes%20%22Daniel%20Alberti%22!5e0!3m2!1ses-419!2sar!4v1775602751711!5m2!1ses-419!2sar",
    images: ["/circuito.webp", "/circuito2.webp", "/circuito3.webp"],
  },
  {
    id: "museo_arrecifes",
    name: "Centro Cultural",
    tagline: "Cultura y patrimonio",
    description:
      "Ubicado en el antiguo mercado municipal, es el epicentro del patrimonio histórico y artístico local. Alberga gran parte de la historia automovilística de la ciudad.",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.188810014646!2d-60.11063188951747!3d-34.06467387304029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99ddb46ccd783%3A0xa8bfe36efe0de6c6!2sCentro%20Cultural%20Arrecifes!5e0!3m2!1ses-419!2sar!4v1775602911087!5m2!1ses-419!2sar",
    images: ["public/Centro-Cultural.webp", "/museo.webp", "/museo2.webp"],
  },
  {
    id: "tajamar",
    name: "Tajamar",
    tagline: "Espacio natural",
    description:
      "Las Ruinas del Tajamar son los vestigios de una antigua esclusa del proyectado Canal del Norte, construida a principios del siglo XX para navegación.",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.855882997149!2d-60.11603888951706!3d-34.073208473037056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99d78edd8404b%3A0xcc1fc7af6faf1b82!2sEl%20TAJAMAR!5e0!3m2!1ses-419!2sar!4v1775602978056!5m2!1ses-419!2sar",
    images: [
      "public/Arrecifes-Tajamar-768x432.webp",
      "public/Tajamar.webp",
      "public/tajamar3.webp",
    ],
  },
  {
    id: "balneario",
    name: "Balneario Municipal",
    tagline: "Punto para tomar mate",
    description:
      "Un lugar ideal para tomar un mate en familia, con sombra natural y mesas para disfrutar del ambiente. Lugar tradicional para paseos al aire libre.",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.786902829132!2d-60.11088902573761!3d-34.074976547881995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99de61c019159%3A0xede8923320cb5b8b!2sBalneario%20Municipal%20de%20Arrecifes!5e0!3m2!1ses-419!2sar!4v1775603018074!5m2!1ses-419!2sar",
    images: [
      "/balneario2.webp",
      "public/balneario-noche-768x960.webp",
      "public/balneario3.webp",
    ],
  },
];

// Limpiador de rutas de imagen (para evitar errores con el prefijo "public/")
const cleanImgPath = (img) =>
  img?.startsWith("public/") ? `/${img.replace(/^public\//, "")}` : img;

export default function TourismSection({ arrecifesPlaces = defaultPlaces }) {
  const [activePlaceId, setActivePlaceId] = useState(arrecifesPlaces[0]?.id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  const activePlace =
    arrecifesPlaces.find((p) => p.id === activePlaceId) || arrecifesPlaces[0];

  const toggle = (id) => setActivePlaceId((prev) => (prev === id ? null : id));

  // Manejo del Lightbox con teclado
  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => Math.min(i + 1, lightboxImages.length - 1));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxImages.length]);

  const openLightbox = (images, idx = 0) => {
    setLightboxImages(images.map(cleanImgPath));
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const showPrev = () => setLightboxIndex((i) => Math.max(i - 1, 0));
  const showNext = () =>
    setLightboxIndex((i) => Math.min(i + 1, lightboxImages.length - 1));

  return (
    <section
      id="turismo"
      className="relative w-full bg-[#141211] py-24 px-6 md:px-10 overflow-hidden"
    >
      {/* Ruido de fondo */}
      <div className="absolute inset-0 noise-dark opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* CABECERA */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-brand-red mb-4">
            <Compass size={20} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Descubrí nuestra ciudad
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-brand-cream leading-none">
            Visitar <span className="text-stone-400 italic">Arrecifes</span>
          </h2>
        </header>

        {/* LAYOUT PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-start">
          {/* COLUMNA IZQUIERDA: ACORDEÓN */}
          <div className="lg:col-span-5 space-y-3">
            {arrecifesPlaces.map((place) => {
              const isActive = place.id === activePlaceId;
              return (
                <div
                  key={place.id}
                  className={`rounded-3xl border transition-all duration-300 ${isActive ? "bg-stone-900/60 border-brand-red/30 shadow-lg" : "bg-transparent border-white/5 hover:bg-white/[0.02]"}`}
                >
                  <button
                    onClick={() => toggle(place.id)}
                    className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center border transition-colors duration-300 shrink-0 ${isActive ? "bg-brand-red/10 border-brand-red text-brand-red" : "bg-white/5 border-white/10 text-stone-400"}`}
                      >
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3
                          className={`font-display text-2xl transition-colors duration-300 ${isActive ? "text-brand-cream" : "text-stone-300"}`}
                        >
                          {place.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-1 font-bold">
                          {place.tagline}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={isActive ? "text-brand-red" : "text-stone-500"}
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden px-5 lg:px-6 pb-6"
                      >
                        <p className="text-stone-300 text-sm leading-relaxed font-light mt-2 border-t border-white/5 pt-4">
                          {place.description}
                        </p>

                        {/* VISUALES MOBILE: Scroll horizontal de fotos + Mapa */}
                        <div className="lg:hidden mt-6 space-y-4">
                          <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
                            {place.images?.map((img, i) => (
                              <div
                                key={i}
                                className="relative h-32 w-48 shrink-0 snap-center rounded-2xl overflow-hidden cursor-pointer border border-white/10"
                                onClick={() => openLightbox(place.images, i)}
                              >
                                <img
                                  src={cleanImgPath(img)}
                                  alt=""
                                  className="w-full h-full object-cover absolute inset-0"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="h-48 w-full rounded-2xl overflow-hidden border border-white/10 relative">
                            <iframe
                              title={`Ubicación de ${place.name}`}
                              src={place.iframeSrc}
                              className="absolute inset-0 w-full h-full border-0 grayscale-[0.2] contrast-125"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* COLUMNA DERECHA: DESKTOP BENTO BOX (Sticky) */}
          <div className="hidden lg:block lg:col-span-7 sticky top-32 h-[calc(100vh-10rem)] max-h-[800px] min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlace.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full bg-stone-900/40 border border-white/5 rounded-[3rem] p-6 shadow-2xl flex flex-col gap-4 backdrop-blur-sm"
              >
                {/* Etiqueta de lugar */}
                <div className="absolute top-10 left-10 z-20 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
                  <MapPin size={16} className="text-brand-red" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-cream">
                    {activePlace.name}
                  </span>
                </div>

                {/* FIX: Se usa flex-1 y min-h-0 para que no rompa el contenedor */}
                {/* Mosaico de Imágenes (Bento) */}
                <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
                  {/* Foto Grande Izquierda */}
                  <div
                    className="col-span-2 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-white/10 min-h-0"
                    onClick={() => openLightbox(activePlace.images, 0)}
                  >
                    <img
                      src={cleanImgPath(activePlace.images?.[0])}
                      alt={activePlace.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  {/* 2 Fotos Chicas Derecha */}
                  <div className="col-span-1 grid grid-rows-2 gap-4 min-h-0">
                    <div
                      className="rounded-[1.5rem] overflow-hidden relative group cursor-pointer border border-white/10 min-h-0"
                      onClick={() => openLightbox(activePlace.images, 1)}
                    >
                      <img
                        src={cleanImgPath(activePlace.images?.[1])}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div
                      className="rounded-[1.5rem] overflow-hidden relative group cursor-pointer border border-white/10 min-h-0"
                      onClick={() => openLightbox(activePlace.images, 2)}
                    >
                      <img
                        src={cleanImgPath(activePlace.images?.[2])}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Mapa Interactivo Abajo */}
                <div className="flex-1 rounded-[2rem] overflow-hidden border border-white/10 relative group min-h-0">
                  <iframe
                    title={`Ubicación de ${activePlace.name}`}
                    src={activePlace.iframeSrc}
                    className="absolute inset-0 w-full h-full border-0 grayscale-[0.2] contrast-125"
                    loading="lazy"
                  />
                  {/* Overlay sutil para que el mapa no resalte demasiado hasta hacer hover */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 rounded-[2rem]" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl bg-stone-900 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 md:right-6 md:top-6 z-50 p-3 bg-black/60 text-brand-cream rounded-full hover:bg-brand-red transition-all"
              >
                <X size={24} />
              </button>

              <div className="relative aspect-[4/3] md:aspect-[16/9] w-full flex items-center justify-center bg-black">
                <img
                  src={lightboxImages[lightboxIndex]}
                  alt=""
                  className="w-full h-full object-contain"
                />

                {lightboxImages.length > 1 && (
                  <>
                    <button
                      onClick={showPrev}
                      disabled={lightboxIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-brand-red transition disabled:opacity-30 disabled:hover:bg-black/60"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      onClick={showNext}
                      disabled={lightboxIndex === lightboxImages.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-brand-red transition disabled:opacity-30 disabled:hover:bg-black/60"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-center pointer-events-none">
                <p className="font-display text-2xl md:text-3xl text-brand-cream">
                  {activePlace?.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-brand-red mt-2">
                  {lightboxIndex + 1} / {lightboxImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
