import { useState } from 'react';
import { ui, type Locale } from '../i18n/ui';

type Item = { question: string; answer: string };

type Props = {
  locale: Locale;
  items: Item[];
};

export default function Faq({ locale, items }: Props) {
  const tr = ui[locale].faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-brand-paper">
      <div className="container-page">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{tr.eyebrow}</p>
          <h2 className="h-section mt-3">{tr.title}</h2>
          <p className="lede mt-4">{tr.subtitle}</p>
        </header>

        <ul className="mx-auto mt-12 max-w-3xl divide-y divide-brand-line rounded-2xl border border-brand-line bg-white">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-analytics={`faq-${i}`}
                >
                  <span className="text-base font-medium text-brand-ink">{it.question}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-brand-subtle transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-6 text-sm leading-relaxed text-brand-subtle"
                >
                  {it.answer}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
