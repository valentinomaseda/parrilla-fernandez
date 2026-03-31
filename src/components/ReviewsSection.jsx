import React from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquareQuote } from 'lucide-react'

// Mantenemos el componente FilledStar pero le damos la opción de aceptar clases para el color
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
    date: 'Hace 2 meses',
    rating: 5,
    text: 'Excelente parrilla: sabor auténtico y atención cálida. El asado a la estaca te hace viajar en el tiempo. Volveremos seguro.'
  },
  {
    id: 2,
    name: 'Juan Pérez',
    date: 'Hace 4 meses',
    rating: 5,
    text: 'La mejor cocción a la estaca de la zona. Parada obligatoria en la Ruta 51. Recomendado para reuniones familiares.'
  },
  {
    id: 3,
    name: 'Lucía Gómez',
    date: 'Hace 6 meses',
    rating: 4,
    text: 'Muy buena experiencia; las porciones son muy generosas y el ambiente te hace sentir como en el patio de tu casa.'
  },
  {
    id: 4,
    name: 'Carlos Díaz',
    date: 'Hace 8 meses',
    rating: 5,
    text: 'Servicio ágil y cortes excelentes. Arrecifes, cuna de campeones, también se come de primera aquí. Las papas fritas son una locura.'
  },
  {
    id: 5,
    name: 'Ana Ruiz',
    date: 'Hace 1 año',
    rating: 5,
    text: 'Atención de primera y sabores con tradición. Se nota que hay oficio detrás de esos fierros.'
  },
  {
    id: 6,
    name: 'Pedro Martín',
    date: 'Hace 1 año',
    rating: 4,
    text: 'Buena relación calidad-precio. Un clásico que no falla nunca los domingos al mediodía.'
  }
]

export default function ReviewsSection({ reviews = sampleReviews }) {
  return (
    <section id='reviews' className="relative w-full bg-[#141211] py-24 px-6 md:px-10 overflow-hidden">
      {/* Ruido de fondo y gradiente sutil */}
      <div className="absolute inset-0 noise-dark opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-wood-dark to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Cabecera Editorial */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-brand-red mb-4">
              <MessageSquareQuote size={20} className="opacity-80" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">La voz de la mesa</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display text-brand-cream leading-tight">
              Testigos de<br/><span className="text-stone-100 italic">nuestra tradición</span>
            </h2>
          </div>
          
          <p className="text-stone-400 text-lg md:text-right max-w-sm font-light">
            Más de 40 años forjando amistades a través del fuego. Esto es lo que dicen quienes nos eligen.
          </p>
        </header>

        {/* CSS Columns (Masonry Layout nativo) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((r, idx) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              className="break-inside-avoid relative rounded-[2rem] bg-stone-900/40 border border-white/5 p-8 shadow-2xl backdrop-blur-sm hover:border-brand-red/30 transition-colors duration-300 group"
            >
              {/* Comillas decorativas de fondo */}
              <div className="absolute top-4 right-6 text-8xl font-display text-white/[0.02] pointer-events-none group-hover:text-brand-red/[0.05] transition-colors">
                "
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < r.rating ? (
                      <FilledStar key={i} size={14} className="text-brand-red" />
                    ) : (
                      <Star key={i} size={14} className="text-stone-700" />
                    )
                  )}
                </div>

                <p className="text-lg text-stone-200 leading-relaxed font-light italic mb-8">
                  "{r.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-wood-dark flex items-center justify-center border border-white/10 text-brand-cream font-display text-xl">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-cream tracking-wide">{r.name}</h3>
                    <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-0.5">{r.date}</div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action - Google Reviews */}
        <div className="mt-20 text-center">
          <a
            href="https://www.google.com/search?q=Parrilla+Fernandez+Arrecifes" 
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-transparent border border-brand-red/50 text-brand-cream font-bold px-8 py-4 rounded-full shadow-lg hover:bg-brand-red/10 hover:border-brand-red transition-all duration-300 text-sm uppercase tracking-widest group"
          >
            <span>Leer más testimonios</span>
            {/* Pequeña "G" simplificada para Google */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="opacity-80 group-hover:opacity-100">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}