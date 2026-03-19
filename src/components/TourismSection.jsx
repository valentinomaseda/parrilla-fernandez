import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'

const defaultPlaces = [
  {
    id: 'plaza_mitre',
    name: 'Plaza Bartolomé Mitre',
    tagline: 'Plaza histórica',
    description: 'Plaza histórica en el centro de la ciudad, punto de encuentro y actividades culturales.',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0809752052883!2d-60.11133442455219!3d-34.067438429374256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99ddcebfc1b49%3A0x1468be4a515ae23b!2sPlaza%20Bartolom%C3%A9%20Mitre!5e0!3m2!1ses-419!2sar!4v1773949319055!5m2!1ses-419!2sar',
    images: [
      '/Arco-pLAZA.jpg',
      '/Arrecifes-Iglesia-768x431.jpg',
      '/mitre.jpg'
    ]
  },
  {
    id: 'molino_harinero',
    name: 'Molino Harinero (Ruinas)',
    tagline: 'Ruinas históricas',
    description: 'Restos del antiguo molino; punto de interés arqueológico y fotográfico.',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1702.1967544972163!2d-60.10828007563649!3d-34.07314867673113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1773949362010!5m2!1ses-419!2sar',
    images: [
      'public/arrecifes-molino-768x517.jpg',
      'public/arrecifes-molino-2-edited-1-768x1024.jpg',
      'public/arrecifes-molino-3.jpg'
    ]
  },
  {
    id: 'circuito_costanero',
    name: 'Circuito Costanero',
    tagline: 'Automovilismo y naturaleza',
    description: 'El Circuito Costanero “Daniel Alberti” en Arrecifes, Buenos Aires, es un espacio recreativo y automovilístico destacado, situado a orillas del río Arrecifes. Es un punto de encuentro clave para competencias zonales, exhibiciones y eventos turísticos como la Fiesta Provincial del Automovilismo, ofreciendo un entorno natural con parrillas y senderos.',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.4521944212793!2d-60.108721078411634!3d-34.07314073558418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99deed033714f%3A0x2558615062181b4f!2sCircuito%20Costanero%20de%20Arrecifes%20%22Daniel%20Alberti%22!5e0!3m2!1ses-419!2sar!4v1773949389801!5m2!1ses-419!2sar',
    images: [
      '/circuito.jpg',
      '/circuito2.jpg',
      '/circuito3.jpg'
    ]
  },
  {
    id: 'museo_arrecifes',
    name: 'Museo de Arrecifes (Centro Cultural)',
    tagline: 'Cultura y patrimonio',
    description: 'El Centro Cultural de Arrecifes, situado en el antiguo mercado municipal, es el epicentro del patrimonio histórico y artístico local. Alberga gran parte de la hisotria automovilística de la ciudad.',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.188983344558!2d-60.11062652455238!3d-34.06466942923005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99ddb46ccd783%3A0xa8bfe36efe0de6c6!2sCentro%20Cultural%20Arrecifes!5e0!3m2!1ses-419!2sar!4v1773949425687!5m2!1ses-419!2sar',
    images: [
      'public/Centro-Cultural.jpg',
      '/museo.jpg',
      '/museo2.jpg'
    ]
  },
  {
    id: 'tajamar',
    name: 'Tajamar',
    tagline: 'Espacio natural',
    description: 'Las Ruinas del Tajamar en Arrecifes, Buenos Aires, son los vestigios de una antigua esclusa del proyectado Canal del Norte, construida a principios del siglo XX para navegación y generación eléctrica.',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8560563477754!2d-60.11603352455197!3d-34.073204029674564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99d78edd8404b%3A0xcc1fc7af6faf1b82!2sEl%20TAJAMAR!5e0!3m2!1ses-419!2sar!4v1773949464667!5m2!1ses-419!2sar',
    images: [
      'public/Arrecifes-Tajamar-768x432.jpg',
      'public/Tajamar.jpg',
      'public/tajamar3.jpg'
    ]
  },
  {
    id: 'balneario',
    name: 'Balneario Municipal',
    tagline: 'Punto para tomar mate',
    description:
      'Un lugar ideal para tomar un mate en familia, con sombra natural y mesas para disfrutar del ambiente. Lugar tradicional para paseos y actividades al aire libre.',
    coords: { lat: -34.064, lng: -60.474 },
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.7971488854946!2d-60.10982752455192!3d-34.07471392975307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99de61c019159%3A0xede8923320cb5b8b!2sBalneario%20Municipal%20de%20Arrecifes!5e0!3m2!1ses-419!2sar!4v1773949492786!5m2!1ses-419!2sar',
    images: [
      '/balneario2.jpg',
      'public/balneario-noche-768x960.jpg',
      'public/balneario3.jpg',
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
                        {/* botones removidos: no realizaban acción */}
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
              {(activePlace.images || []).slice(0, 3).map((img, i) => {
                const src = img?.startsWith('public/') ? `/${img.replace(/^public\//, '')}` : img
                const spanClass = i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''
                return (
                  <div key={i} className={`${spanClass} relative w-full h-full overflow-hidden rounded-lg`}>
                    <img
                      src={src}
                      alt={`${activePlace.name} ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                )
              })}
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
                src={activePlace.iframeSrc ? activePlace.iframeSrc : `https://www.google.com/maps?q=${activePlace.coords?.lat},${activePlace.coords?.lng}&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
