export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/80">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl text-stone-100 sm:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-stone-300 sm:text-base">{subtitle}</p>
    </div>
  );
}
