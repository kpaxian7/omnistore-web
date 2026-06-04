import { useMemo, useState } from 'react';
import { ui, type Locale } from '../i18n/ui';

type PlanData = {
  slug: 'free' | 'pro' | 'team';
  order: number;
  priceMonthlyUSD: number;
  priceYearlyUSD: number;
  translationQuotaPerMonth: number;
  recommended?: boolean;
};

type Props = {
  locale: Locale;
  plans: PlanData[];
  downloadHref: string;
  stripePaymentLink: string;
  contactHref: string;
};

function formatQuota(n: number, locale: Locale): string {
  if (n >= 1_000_000) return locale === 'zh-CN' ? `${n / 1_000_000} 百万字` : `${n / 1_000_000}M chars`;
  if (n >= 1_000) return locale === 'zh-CN' ? `${(n / 1000).toLocaleString()} 千字` : `${(n / 1000).toLocaleString()}K chars`;
  return locale === 'zh-CN' ? `${n.toLocaleString()} 字` : `${n.toLocaleString()} chars`;
}

export default function Pricing({ locale, plans, downloadHref, stripePaymentLink, contactHref }: Props) {
  const tr = ui[locale].pricing;
  const [yearly, setYearly] = useState(false);

  const ctaHref = (slug: PlanData['slug']) => {
    if (slug === 'free') return downloadHref;
    if (slug === 'pro') return stripePaymentLink;
    return contactHref;
  };

  const ordered = useMemo(() => [...plans].sort((a, b) => a.order - b.order), [plans]);

  return (
    <section id="pricing" className="section">
      <div className="container-page">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{tr.eyebrow}</p>
          <h2 className="h-section mt-3">{tr.title}</h2>
          <p className="lede mt-4">{tr.subtitle}</p>

          <div className="mt-8 inline-flex items-center rounded-full border border-brand-line bg-white p-1 text-sm">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 transition ${!yearly ? 'bg-brand-ink text-white' : 'text-brand-subtle hover:text-brand-ink'}`}
              aria-pressed={!yearly}
            >
              {tr.monthly}
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-1.5 transition ${yearly ? 'bg-brand-ink text-white' : 'text-brand-subtle hover:text-brand-ink'}`}
              aria-pressed={yearly}
            >
              {tr.yearly}
            </button>
          </div>
          <p className="mt-2 text-xs text-brand-mute">{tr.yearlyHint}</p>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
          {ordered.map((plan) => {
            const i = ordered.findIndex((p) => p.slug === plan.slug);
            const meta = tr.plans[i];
            const isFree = plan.slug === 'free';
            const price = yearly ? Math.round(plan.priceYearlyUSD / 12) : plan.priceMonthlyUSD;
            const period = yearly ? tr.perYear : tr.perMonth;
            const totalYearly = plan.priceYearlyUSD;
            const recommended = plan.recommended;

            return (
              <article
                key={plan.slug}
                className={`relative flex flex-col rounded-2xl border bg-white p-7 transition ${recommended ? 'border-brand-ink shadow-card' : 'border-brand-line'}`}
              >
                {recommended && (
                  <span className="absolute -top-3 right-6 rounded-full bg-brand-ink px-3 py-1 text-xs font-medium text-white">
                    {tr.recommended}
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-brand-ink">{meta.name}</h3>
                  <p className="mt-1 text-sm text-brand-subtle">{meta.tagline}</p>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-brand-ink">
                    {isFree ? (locale === 'zh-CN' ? '免费' : 'Free') : `$${price}`}
                  </span>
                  {!isFree && <span className="text-sm text-brand-mute">{tr.perMonth}</span>}
                </div>
                {!isFree && yearly && (
                  <p className="mt-1 text-xs text-brand-mute">
                    ${totalYearly}
                    {period}
                  </p>
                )}

                <p className="mt-4 text-xs uppercase tracking-wider text-brand-mute">
                  {tr.quotaPerMonth}
                </p>
                <p className="text-sm font-medium text-brand-ink">{formatQuota(plan.translationQuotaPerMonth, locale)}</p>

                <ul className="mt-6 space-y-2 text-sm text-brand-subtle">
                  {meta.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-brand-ink" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={ctaHref(plan.slug)}
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${recommended ? 'bg-brand-ink text-white hover:bg-black' : 'border border-brand-line bg-white text-brand-ink hover:bg-brand-paper'}`}
                  data-analytics={`pricing-${plan.slug}`}
                >
                  {meta.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
