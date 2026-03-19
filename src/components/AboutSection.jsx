import { motion } from "framer-motion";

const aboutImage =
  "/aboutus.jpg";

export default function AboutSection() {
  return (
    <section id="historia" className="scroll-mt-24 about-texture text-wood-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-red/90">
            El corazón de Arrecifes
          </p>
          <h2 className="mt-3 text-4xl leading-tight text-wood-dark sm:text-5xl">
            49 años de fuego y tradicion
          </h2>
          <p className="mt-5 text-base leading-relaxed text-wood-dark/85">
            Parrilla Fernandez nacio al calor de la estaca y la mesa larga. Durante cuatro
            decadas fuimos testigos de encuentros familiares, festejos y sobremesas que se
            volvieron parte de la memoria de la ruta.
          </p>
          <p className="mt-4 text-base leading-relaxed text-wood-dark/85">
            Somos punto de encuentro de corredores de carreras, equipos y apasionados del
            automovilismo. En la mistica de la Cuna de Campeones, cada corte sale con respeto,
            tiempo y brasas vivas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="overflow-hidden rounded-2xl border border-wood-dark/20"
        >
          <img
            src={aboutImage}
            alt="Historia de parrilla tradicional argentina"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover sepia-[0.28] saturate-[1.1]"
          />
        </motion.div>
      </div>
    </section>
  );
}
