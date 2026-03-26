import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Flag, Play, Maximize2 } from "lucide-react";

const pilotProfiles = [
  {
    id: "canapino",
    name: "Agustín Canapino",
    title: "El Titán",
    image: "/canapino-cara.jpg",
    bio: "El máximo referente del TC moderno y embajador arrecifeño en el mundo. Agustín llevó nuestra bandera a la IndyCar, demostrando la vigencia de la escuela de nuestra ciudad.",
    stats: ["Tetracampeón de TC", "Campeón de STC2000", "Piloto IndyCar"],
  },
  {
    id: "di-palma",
    name: "Luis Rubén Di Palma",
    title: "El Loco",
    image: "/di palma.jpg",
    bio: "El máximo ícono de Arrecifes. Un piloto que no solo ganaba en todas las categorías, sino que construía sus propios autos. Su mística es el cimiento de nuestra identidad.",
    stats: [
      "Leyenda del Automovilismo",
      "Múltiple Campeón Nacional",
      "Constructor de Éxitos",
    ],
  },
  {
    id: "froilan",
    name: "José Froilán González",
    title: "The Pampas Bull",
    image: "/froilan.jpg",
    bio: "El hombre que cambió la historia de Ferrari al darle su primera victoria en la F1. Un arrecifeño que conquistó Europa y se codeó con Fangio en la cima del mundo.",
    stats: [
      "1° Victoria Ferrari F1",
      "Subcampeón Mundial F1",
      "Ganador de Le Mans",
    ],
  },
  {
    id: "fontana",
    name: "Norberto Fontana",
    title: "El Gigante",
    image: "/fontana.jpg",
    bio: "Ex piloto de Fórmula 1 y uno de los talentos más puros que ha dado esta tierra. Su versatilidad y garra lo llevaron a dominar tanto el TC como el TC2000.",
    stats: ["Piloto F1 Sauber", "Campeón de TC", "Multicampeón TC2000"],
  },
  {
    id: "pairetti",
    name: "Carlos Pairetti",
    title: "Il Matto",
    image: "/pairetti.jpg",
    bio: "Famoso por dominar el legendario 'Trueno Naranja'. Pairetti fue audacia pura y uno de los pilotos más carismáticos que pasaron por nuestras mesas en Arrecifes.",
    stats: [
      "Campeón de TC 1968",
      "Hito con el Trueno Naranja",
      "Protagonista de Película",
    ],
  },
  {
    id: "trosset",
    name: "Nicolás Trosset",
    title: "Niki",
    image: "/trosset.jpg",
    bio: "Heredero de una dinastía de campeones y orgullo actual de Arrecifes. Niki mantiene viva la tradición de la ciudad en los puestos de vanguardia del Turismo Carretera.",
    stats: ["Ganador en TC", "Campeón TC Pista", "Presente de la Cuna"],
  },
];

const wallItems = [
  {
    id: 1,
    title: "Agustín Canapino",
    media: "/canap.mp4",
    type: "video",
    poster: "/estaca.jpg",
    isVertical: true,
  },
  {
    id: 2,
    title: "",
    media: "/auto.jpg",
    type: "img",
    isVertical: false,
  },
  {
    id: 3,
    title: "",
    media: "/sector-automovilismo.jpg",
    type: "img",
    isVertical: false,
  },
  {
    id: 4,
    title: "",
    media: "/canapino-parri.jpg",
    type: "img",
    isVertical: false,
  },
  {
    id: 5,
    title: "",
    media: "/canapino-auto.jpg",
    type: "img",
    isVertical: false,
  },
  {
    id: 6,
    title: "",
    media: "/quique.jpg",
    type: "img",
    isVertical: false,
  },
  {
    id: 7,
    title: "",
    media: "/parri-copas.jpg",
    type: "img",
    isVertical: false,
  },  
];

export default function RacingLegacy() {
  const [activePilot, setActivePilot] = useState(pilotProfiles[0]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <section
      id="automovilismo"
      className="relative overflow-hidden bg-wood-dark py-24 text-stone-100"
    >
      <div className="absolute inset-0 noise-dark opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* CABECERA */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3 text-brand-cream">
            <Flag size={20} className="text-brand-red animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] italic">
              Cuna de Campeones
            </span>
          </div>
          <h2 className="font-display text-5xl text-brand-cream sm:text-6xl italic">
            Mística de Rectas <span className="text-stone-100">y Brasas</span>
          </h2>
        </div>

        {/* FILA 1: Selector y Ficha Técnica */}
        <div className="mb-20 space-y-12 overflow-visible">
          {/* Selector de Chips (CORREGIDO: py-4 para evitar desborde de escala) */}
          <div className="flex overflow-x-auto py-4 pb-8 px-10 lg:mx-0 lg:px-0 lg:flex-wrap lg:justify-start gap-5 scrollbar-hide">
            {pilotProfiles.map((pilot) => (
              <button
                key={pilot.id}
                onClick={() => setActivePilot(pilot)}
                className={`transform-gpu origin-left flex flex-shrink-0 items-center gap-4 p-2 pr-6 rounded-2xl border-2 transition-all duration-300 ${
                  activePilot.id === pilot.id
                    ? "border-brand-red bg-brand-red/10 shadow-[0_0_25px_rgba(140,45,43,0.4)] scale-105 text-brand-cream z-10"
                    : "border-white/10 bg-white/5 opacity-60 hover:opacity-100 hover:border-white/20"
                }`}
              >
                <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/20 pointer-events-none">
                  <img
                    src={pilot.image}
                    alt={pilot.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left pointer-events-none">
                  <p
                    className={`text-[14px] font-bold leading-none ${activePilot.id === pilot.id ? "text-brand-cream" : "text-stone-300"}`}
                  >
                    {pilot.name}
                  </p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1 italic font-semibold">
                    {pilot.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Ficha Grande del Piloto */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePilot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-stone-900/40 rounded-[3rem] p-8 lg:p-12 border border-white/5 backdrop-blur-sm shadow-2xl"
            >
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <img
                    src={activePilot.image}
                    alt={activePilot.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 text-brand-red mb-4">
                    <div className="h-[2px] w-12 bg-brand-red hidden lg:block" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                      Legado de Arrecifes
                    </span>
                  </div>
                  <h3 className="font-display text-5xl text-brand-cream italic lg:text-7xl">
                    {activePilot.name}
                  </h3>
                  <p className="text-stone-400 text-xl font-medium italic mt-2">
                    {activePilot.title}
                  </p>
                </div>

                <p className="text-stone-300 text-xl lg:text-2xl leading-relaxed max-w-4xl font-light italic">
                  "{activePilot.bio}"
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  {activePilot.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl"
                    >
                      <Trophy size={18} className="text-brand-red" />
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-200">
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* FILA 2: Muro de Recuerdos */}
        <div className="pt-16 border-t border-white/5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 mb-10 text-center lg:text-left">
            Archivo Visual de Boxes
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
            {wallItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedMedia(item)}
                className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/5 bg-stone-900 shadow-2xl transition-all duration-500 hover:border-brand-red/40 ${
                  item.isVertical ? "lg:row-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="h-full w-full relative">
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.media}
                        poster={item.poster}
                        className={`${item.isVertical ? "h-full w-full object-contain" : "h-full w-full object-cover"} grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700`}
                        muted
                        loop
                        autoPlay
                        playsInline
                      />
                      <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md p-3 rounded-full text-brand-cream opacity-70 group-hover:opacity-100 transition-opacity">
                        <Play size={18} fill="currentColor" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.media}
                      alt={item.title}
                      className={`${item.isVertical ? "h-full w-full object-contain" : "h-full w-full object-cover"} grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="font-display text-2xl text-brand-cream translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative bg-stone-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 ${
                selectedMedia.isVertical
                  ? "max-w-md w-full"
                  : "max-w-6xl w-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute right-6 top-6 z-50 p-3 bg-black/60 text-brand-cream rounded-full hover:bg-brand-red transition-all"
              >
                <X size={24} />
              </button>
              {selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.media}
                  className="w-full h-auto max-h-[85vh] object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedMedia.media}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
