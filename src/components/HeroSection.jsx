import { motion } from "framer-motion";

const heroImage = "/estaca.jpg";

export default function HeroSection() {
  return (
    <header id="inicio" className="relative isolate min-h-screen scroll-mt-24 overflow-hidden">
      <img
        src={heroImage}
        alt="Parrilla encendida con brasas"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/65 via-wood-dark/55 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(140,45,43,0.45),transparent_42%),radial-gradient(circle_at_84%_72%,rgba(245,181,145,0.14),transparent_34%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-6 py-24 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-brand-cream"
        >
          40 anos de tradicion parrillera
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="font-display text-5xl leading-none text-white sm:text-7xl"
        >
          Parrilla Fernandez
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base text-stone-200 sm:text-lg"
        >
          Especialistas en Coccion a la Estaca, brasas nobles y recetas de familia.
          Desde 1983 celebramos 40 anos de tradicion en Arrecifes.
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
      </div>
    </header>
  );
}
