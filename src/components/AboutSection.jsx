import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { getPosterPathFromVideo } from "../utils/media";
import DeferredVideo from "./DeferredVideo";

const aboutVideo = "/Parri Historia 3.mp4";
const aboutPoster = getPosterPathFromVideo(aboutVideo);

export default function AboutSection() {
  return (
    <section
      id="historia"
      className="relative overflow-hidden about-texture text-wood-dark py-24 sm:py-32"
    >
      {/* Fondo sutil para separar la sección */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wood-dark/[0.02] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
          
          {/* COLUMNA DE TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:pr-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Flame className="text-brand-red animate-pulse" size={20} />
              <p className="text-xs font-black uppercase tracking-[0.35em] text-brand-red">
                El corazón de Arrecifes
              </p>
            </div>

            <h2 className="font-display text-5xl font-medium tracking-tight text-wood-dark sm:text-7xl mb-8 leading-[1.1]">
              49 años de <br />
              <span className="italic text-brand-red">fuego y tradición</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-wood-dark/80 font-light">
              <p>
                Parrilla Fernández nació hace 49 años, cuando Abel y Ester
                encendieron el primer fuego. Desde entonces, en Arrecifes, cuna de
                campeones, hemos servido mucho más que asados.
              </p>
              <p>
                Celebramos con amigos y familia, fin de semana tras fin de semana,
                compartiendo la pasión por los fierros y por la tradición. Aquí,
                cada plato cuenta la historia de quienes lo compartimos.
              </p>
              <p className="font-medium text-wood-dark italic text-xl mt-4 border-l-2 border-brand-red pl-4">
                Bienvenidos a nuestra mesa: donde la historia, como el fuego, nunca se apaga.
              </p>
            </div>
          </motion.div>

          {/* COLUMNA DE VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Contenedor del video con estilo retrato/editorial */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-wood-dark/20 border border-wood-dark/10 group">
              <DeferredVideo
                src={aboutVideo}
                poster={aboutPoster}
                preload="none"
                className="h-full w-full object-cover sepia-[0.15] saturate-[1.1] transition-transform duration-1000 group-hover:scale-105"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Sutil sombra interna para darle profundidad de marco */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-wood-dark/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Sello Flotante (Badge) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 bg-[#f4f0ea] rounded-full p-2 shadow-xl border border-wood-dark/5 flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 z-10"
            >
              <div className="w-full h-full rounded-full border border-dashed border-brand-red/40 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-brand-red font-black mb-1">
                  Desde
                </span>
                <span className="block font-display text-4xl sm:text-5xl text-wood-dark leading-none">
                  1977
                </span>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}