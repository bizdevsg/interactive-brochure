import { riskContent as c } from "../data/content";
import { SLIDES, slideMeta } from "../data/slides";

export function RiskSlide() {
  return (
    <div className="relative pb-4 pt-6">
      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-danger">
        <span aria-hidden className="h-px w-3 bg-danger" />
        {slideMeta("risk").category}
      </div>
      <h1 className="relative mt-4 text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight">
        {c.titleLead} <span className="text-gold">{c.titleHighlight}</span>{" "}
        {c.titleTail}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        {c.description}
      </p>

      <section
        aria-labelledby="risk-statement-title"
        className="mt-6 rounded-[1.25rem] border border-red-500/60 bg-gradient-to-b from-[#260d0d] to-[#120909] p-5"
      >
        <h2
          id="risk-statement-title"
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-red-400"
        >
          <span aria-hidden className="size-2 rounded-full bg-red-500" />
          {c.statementLabel}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white">{c.statement}</p>
      </section>

      <div className="mt-5 space-y-4">
        {c.items.map((item, index) => (
          <article
            key={item.id}
            className="rounded-[1.25rem] border border-gold/20 bg-gradient-to-b from-[#1b1811] to-[#0b0a08] p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold tracking-[0.18em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-gold/50 bg-gold/10 px-2 py-1 text-[9px] font-bold tracking-[0.16em] text-[#f8d56b]">
                {c.verifyBadge}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-white">{item.title}</h2>
            <p className="mt-3 text-sm font-bold leading-relaxed text-[#f8d56b]">
              {item.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted">{c.docMissing}</p>
    </div>
  );
}
