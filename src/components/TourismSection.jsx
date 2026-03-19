import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Info, Camera } from 'lucide-react'

const defaultPlaces = [
  {
    id: 'balneario',
    name: 'Balneario Municipal',
    tagline: 'Punto para tomar mate',
    description:
      'Amplias playas, sombra natural y mesas para disfrutar un mate en familia. Lugar tradicional para paseos y actividades al aire libre.',
    coords: { lat: -34.064, lng: -60.474 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop'
    ]
  },
  {
    id: 'museo',
    name: 'Museo Automovilístico',
    tagline: 'Cuna de Campeones',
    description:
      'Colección de autos clásicos y campeones; visitas guiadas y salas interactivas que relatan la historia del automovilismo local.',
    coords: { lat: -34.066, lng: -60.482 },
    images: [
      'https://images.unsplash.com/photo-1517949908114-4ef0e1b5af6a?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&q=80&auto=format&fit=crop'
    ]
  },
  {
    id: 'plaza',
    name: 'Plaza Principal / Parroquia',
    tagline: 'Corazón de la ciudad',
    description:
      'Plaza central arbolada, con monumentos históricos y la parroquia que preside el espacio público. Ideal para recorrer a pie y disfrutar eventos culturales.',
    coords: { lat: -34.062, lng: -60.478 },
    images: [
      'https://images.unsplash.com/photo-1504198458649-3128b932f49b?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473447191045-7a9b5b8b9d8f?w=1200&q=80&auto=format&fit=crop'
    ]
  }
]

export default function TourismSection({ arrecifesPlaces = defaultPlaces }) {
  const [activePlaceId, setActivePlaceId] = useState(arrecifesPlaces[0]?.id)

  const activePlace = arrecifesPlaces.find((p) => p.id === activePlaceId) || arrecifesPlaces[0]

  const toggle = (id) => setActivePlaceId((prev) => (prev === id ? null : id))

  return (
    <section id="turismo" className="w-full bg-wood-dark text-brand-cream font-display py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
        {/* Left: Accordion */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">Lugares de interés</h2>
          <p className="text-sm text-brand-cream/90 max-w-prose">Seleccioná un lugar para ver galerías y la ubicación en el mapa.</p>

          <div className="space-y-3">
            {arrecifesPlaces.map((place) => {
              const isActive = place.id === activePlaceId
              return (
                <div
                  key={place.id}
                  className="rounded-3xl bg-wood-dark/70 p-4 shadow-lg border border-brand-cream/10"
                >
                  <button
                    onClick={() => toggle(place.id)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-brand-cream/10 rounded-2xl">
                        <MapPin className="text-brand-cream" size={20} />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{place.name}</div>
                        <div className="text-sm text-brand-cream/90">{place.tagline}</div>
                      </div>
                    </div>
                    <div className="text-brand-cream/80">{isActive ? '−' : '+'}</div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden mt-3 text-sm"
                      >
                        <p className="mb-3">{place.description}</p>
                        <div className="flex gap-3">
                          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cream/10">
                            <Info size={16} /> Más info
                          </button>
                          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cream/10">
                            <Camera size={16} /> Ver galería
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Visuals */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-wood-dark/60 p-4 shadow-lg border border-brand-cream/10">
            <div className="grid grid-cols-3 gap-2 h-48 md:h-64 rounded-2xl overflow-hidden">
              {(activePlace.images || []).slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${activePlace.name} ${i + 1}`}
                  className={`object-cover w-full h-full ${i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg border border-brand-cream/10">
            <div className="bg-wood-dark/80 p-3 flex items-center gap-3">
              <MapPin size={18} />
              <div>
                <div className="font-semibold">{activePlace.name}</div>
                <div className="text-sm text-brand-cream/90">{activePlace.tagline}</div>
              </div>
            </div>
            <div className="w-full h-56 md:h-72">
              <iframe
                title={`map-${activePlace.id}`}
                src={`https://www.google.com/maps?q=${activePlace.coords.lat},${activePlace.coords.lng}&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
