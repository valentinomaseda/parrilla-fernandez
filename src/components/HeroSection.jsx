import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const heroImage = "https://images.unsplash.com/photo-1679711246825-1f2bd51b16d0?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image moves up slower than scroll — classic parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Fade out content as user scrolls
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "12%"]);

  return (
    <header
      id="inicio"
      ref={ref}
      className="relative isolate min-h-screen scroll-mt-24 overflow-hidden"
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0 h-[130%] w-full"
        style={{ y: imageY }}
      >
        <img
          src={heroImage}
          alt="Parrilla encendida con brasas"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/65 via-wood-dark/55 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(140,45,43,0.45),transparent_42%),radial-gradient(circle_at_84%_72%,rgba(245,181,145,0.14),transparent_34%)]" />

      {/* Content with fade-out on scroll */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-6 py-24 sm:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-brand-cream"
        >
          49 años de tradición parrillera
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="font-display text-5xl leading-none text-white sm:text-7xl"
        >
          Parrilla Fernández
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mt-3 text-2xl md:text-3xl text-brand-cream italic font-display"
        >
          Donde el fuego habla.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-stone-200 sm:text-lg"
        >
          Especialistas en Cocción a la Estaca, brasas nobles y recetas de familia.
          Desde 1977 celebramos 49 años de tradición en Arrecifes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <a
            className="btn"
            href="https://wa.me/5492478460000?text=Hola%20Parrilla%20Fernandez,%20quiero%20reservar%20una%20mesa"
            target="_blank"
            rel="noreferrer"
          >
            RESERVAR MESA
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
              Desliza
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-stone-400 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}