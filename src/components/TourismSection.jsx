import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Trophy, X, ChevronLeft, ChevronRight } from 'lucide-react'

const defaultPlaces = [
  {
    id: 'plaza_mitre',
    name: 'Plaza Bartolomé Mitre',
    tagline: 'Plaza histórica',
    description: 'Plaza histórica en el centro de la ciudad, punto de encuentro y actividades culturales.',
    iframeSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0809752052883!2d-60.11133442455219!3d-34.067438429374256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b99ddcebfc1b49%3A0x1468be4a515ae23b!2sPlaza%20Bartolom%C3%A9%20Mitre!5e0!3m2!1ses-419!2sar!4v1773949319055!5m2!1ses-419!2sar',
    images: [
      '/mitre.jpg',
      '/Arco-pLAZA.jpg',
      '/Arrecifes-Iglesia-768x431.jpg',
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxImages, setLightboxImages] = useState([])

  const activePlace = arrecifesPlaces.find((p) => p.id === activePlaceId) || arrecifesPlaces[0]

  const toggle = (id) => setActivePlaceId((prev) => (prev === id ? null : id))

  useEffect(() => {
    if (!lightboxOpen) return
    function onKey(e) {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => Math.min(i + 1, lightboxImages.length - 1))
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, lightboxImages.length])

  const openLightbox = (images, idx = 0) => {
    const normalized = (images || []).map((img) => (img?.startsWith('public/') ? `/${img.replace(/^public\//, '')}` : img))
    setLightboxImages(normalized)
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const showPrev = () => setLightboxIndex((i) => Math.max(i - 1, 0))
  const showNext = () => setLightboxIndex((i) => Math.min(i + 1, lightboxImages.length - 1))

  return (
    <section id="turismo" className="w-full noise-dark relative bg-grain [background-size:8px_8px] text-brand-cream font-display py-10 px-4 md:px-8 text-base md:text-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
        {/* Left: Accordion */}
        <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="ml-0 inline-flex items-center gap-3">
                <Trophy className="text-brand-cream" size={28} />
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight">Cuna de Campeones</span>
              </span>
            </div>
            <span className='text-2xl md:text-3xl font-semibold'>Lugares de interés</span>
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
                        <div className="text-xl md:text-2xl font-semibold">{place.name}</div>
                        <div className="text-base text-brand-cream/90">{place.tagline}</div>
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
                        <p className="mb-3 text-base">{place.description}</p>
                        {/* Mobile visuals: show gallery + map under the item on small screens */}
                        <div className="md:hidden mt-3">
                          <div className="grid grid-cols-3 gap-2 h-40 rounded-2xl overflow-hidden">
                            {(place.images || []).slice(0, 3).map((img, i) => {
                              const src = img?.startsWith('public/') ? `/${img.replace(/^public\//, '')}` : img
                              const spanClass = i === 0 ? 'col-span-2 row-span-2' : ''
                              return (
                                <motion.figure
                                  key={i}
                                  initial={{ opacity: 0, y: 12 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, amount: 0.25 }}
                                  transition={{ duration: 0.35, delay: i * 0.04 }}
                                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-cream/20 ${spanClass}`}
                                  onClick={() => openLightbox((place.images || []).slice(0, 3), i)}
                                >
                                  <img
                                    src={src}
                                    alt={`${place.name} ${i + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                  />
                                </motion.figure>
                              )
                            })}
                          </div>

                          <div className="mt-3 h-48 rounded-2xl overflow-hidden">
                              <iframe
                                title={`Ubicación de ${place.name} en Arrecifes`}
                                src={place.iframeSrc ? place.iframeSrc : `https://www.google.com/maps?q=${place.coords?.lat},${place.coords?.lng}&output=embed`}
                                className="w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                              />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        {/* Right: Visuals */}
        <div className="space-y-4 hidden md:block">
          <div className="rounded-3xl bg-wood-dark/60 p-4 shadow-lg border border-brand-cream/10">
            <div className="grid grid-cols-3 gap-2 h-48 md:h-64 rounded-2xl overflow-hidden">
              {(activePlace.images || []).slice(0, 3).map((img, i) => {
                const src = img?.startsWith('public/') ? `/${img.replace(/^public\//, '')}` : img
                const spanClass = i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''
                return (
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-brand-cream/20 ${spanClass}`}
                    onClick={() => openLightbox((activePlace.images || []).slice(0, 3), i)}
                  >
                    <img
                      src={src}
                      alt={`${activePlace.name} ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </motion.figure>
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
                title={`Ubicación de ${activePlace.name} en Arrecifes`}
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
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mx-4 w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -right-3 -top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-brand-cream/30 bg-stone-900 text-stone-200 shadow-lg transition hover:bg-stone-800"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative overflow-hidden rounded-2xl bg-black">
                <img src={lightboxImages[lightboxIndex]} alt={`Imagen ${lightboxIndex + 1}`} className="w-full rounded-2xl object-contain shadow-2xl" style={{ maxHeight: '75vh' }} />

                {lightboxImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
                      onClick={showPrev}
                      aria-label="Imagen anterior"
                      disabled={lightboxIndex === 0}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
                      onClick={showNext}
                      aria-label="Imagen siguiente"
                      disabled={lightboxIndex === lightboxImages.length - 1}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              <p className="mt-4 text-center font-display text-xl text-brand-cream">{activePlace?.name}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
