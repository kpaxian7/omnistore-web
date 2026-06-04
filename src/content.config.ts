import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const features = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/features' }),
  schema: z.object({
    locale: z.enum(['zh-CN', 'en']),
    order: z.number(),
    icon: z.string(),
    title: z.string(),
    summary: z.string(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({
    locale: z.enum(['zh-CN', 'en']),
    order: z.number(),
    question: z.string(),
    answer: z.string(),
  }),
});

const plans = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/plans' }),
  schema: z.object({
    slug: z.enum(['free', 'pro', 'team']),
    order: z.number(),
    priceMonthlyUSD: z.number(),
    priceYearlyUSD: z.number(),
    translationQuotaPerMonth: z.number(),
    recommended: z.boolean().optional(),
    ctaHref: z.string().optional(),
  }),
});

export const collections = { features, faq, plans };
