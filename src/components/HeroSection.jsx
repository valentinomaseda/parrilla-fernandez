import { motion } from "framer-motion";

const heroImage =
  "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1800&q=70";

export default function HeroSection() {
  return (
    <header id="inicio" className="relative isolate min-h-screen scroll-mt-24 overflow-hidden">
      <img
        src={heroImage}
        srcSet={`${heroImage}&w=900 900w, ${heroImage}&w=1400 1400w, ${heroImage}&w=1800 1800w`}
        sizes="100vw"
        alt="Parrilla encendida con brasas"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-wood-dark/90 via-wood-dark/55 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(140,45,43,0.28),transparent_40%),radial-gradient(circle_at_84%_72%,rgba(245,181,145,0.14),transparent_34%)]" />

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

        <motion.a
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          href="https://wa.me/5492478460000?text=Hola%20Parrilla%20Fernandez,%20quiero%20reservar%20una%20mesa"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center rounded-full border border-brand-cream/70 bg-brand-red px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-glow transition duration-300 hover:bg-[#7a2523]"
        >
          Reservar Mesa
        </motion.a>
      </div>
    </header>
  );
}
