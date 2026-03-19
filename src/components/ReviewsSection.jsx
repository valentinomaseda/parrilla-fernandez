import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

function FilledStar({ size = 16, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.866 1.402-8.168L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
  )
}

const sampleReviews = [
  {
    id: 1,
    name: 'María López',
    date: 'Mar 2024',
    rating: 5,
    text: 'Excelente parrilla: sabor auténtico y atención cálida. Volveremos seguro.'
  },
  {
    id: 2,
    name: 'Juan Pérez',
    date: 'Ene 2024',
    rating: 5,
    text: 'La mejor cocción a la estaca de la zona. Recomendado para reuniones familiares.'
  },
  {
    id: 3,
    name: 'Lucía Gómez',
    date: 'Nov 2023',
    rating: 4,
    text: 'Muy buena experiencia; las porciones son generosas y el ambiente agradable.'
  },
  {
    id: 4,
    name: 'Carlos Díaz',
    date: 'Oct 2023',
    rating: 5,
    text: 'Servicio ágil y cortes excelentes. Arrecifes, cuna de campeones, también se come bien aquí.'
  },
  {
    id: 5,
    name: 'Ana Ruiz',
    date: 'Ago 2023',
    rating: 5,
    text: 'Atención de primera y sabores con tradición. Imperdible.'
  },
  {
    id: 6,
    name: 'Pedro Martín',
    date: 'May 2023',
    rating: 4,
    text: 'Buena relación calidad-precio; volveré a probar el asado a la estaca.'
  }
]

export default function ReviewsSection({ reviews = sampleReviews }) {
  const isDark = true // this section uses wood-dark background per spec

  return (
    <section id='reviews' className="w-full bg-wood-dark text-brand-cream font-sans py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-semibold">Lo que dicen nuestros comensales</h2>
          <p className="mt-2 text-sm text-brand-cream/90">Opiniones reales de quienes ya vivieron la experiencia</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.995 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              tabIndex={0}
              className="rounded-3xl bg-wood-dark/70 border border-brand-cream/10 p-6 shadow-md hover:shadow-2xl transition-shadow duration-200 will-change-transform focus:outline-none focus:ring-4 focus:ring-brand-cream/20"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-semibold">{r.name}</h3>
                  <div className="text-xs text-brand-cream/80">{r.date}</div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < r.rating ? (
                      <FilledStar key={i} size={16} className="text-brand-cream" />
                    ) : (
                      <Star key={i} size={16} className="text-brand-cream/30" />
                    )
                  )}
                </div>
              </div>

              <p className="text-sm text-brand-cream/90">{r.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Parrilla+Fernandez+Arrecifes" 
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-brand-cream text-wood-dark font-semibold px-6 py-3 rounded-full shadow-md"
          >
            Ver más en Google Reviews
          </a>
        </div>
      </div>
    </section>
  )
}
