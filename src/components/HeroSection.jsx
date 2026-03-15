import { motion } from "framer-motion";

const heroImage =
  "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1800&q=70";

export default function HeroSection() {
  return (
    <header id="inicio" className="relative isolate min-h-[92vh] scroll-mt-24 overflow-hidden">
      <img
        src={heroImage}
        srcSet={`${heroImage}&w=900 900w, ${heroImage}&w=1400 1400w, ${heroImage}&w=1800 1800w`}
        sizes="100vw"
        alt="Parrilla encendida con brasas"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-coal" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(185,28,28,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(201,168,106,0.16),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-start justify-center px-6 py-24 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-gold"
        >
          Fuego, tradicion y hospitalidad
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
          Donde el fuego habla. Desde 1983 manteniendo la tradicion en Arrecifes.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          href="https://wa.me/5492478460000?text=Hola%20Parrilla%20Fernandez,%20quiero%20reservar%20una%20mesa"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center rounded-full border border-gold/70 bg-fire px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-red-700"
        >
          Reservar Mesa
        </motion.a>
      </div>
    </header>
  );
}
