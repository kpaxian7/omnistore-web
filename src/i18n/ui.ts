export const locales = ['zh-CN', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-CN';

export const localeMeta: Record<Locale, { label: string; htmlLang: string; href: string }> = {
  'zh-CN': { label: '简体中文', htmlLang: 'zh-CN', href: '/' },
  en: { label: 'English', htmlLang: 'en', href: '/en/' },
};

type Dict = {
  nav: { features: string; how: string; pricing: string; faq: string; download: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    platforms: string;
  };
  trust: { storeBoth: string; localEnc: string; oneClickTr: string; macWin: string };
  features: { eyebrow: string; title: string; subtitle: string };
  how: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { title: string; desc: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    yearlyHint: string;
    perMonth: string;
    perYear: string;
    quotaPerMonth: string;
    recommended: string;
    plans: {
      slug: 'free' | 'pro' | 'team';
      name: string;
      tagline: string;
      cta: string;
      features: string[];
    }[];
  };
  faq: { eyebrow: string; title: string; subtitle: string };
  cta: { title: string; subtitle: string; primary: string; secondary: string };
  footer: {
    product: string;
    downloadMac: string;
    downloadWin: string;
    company: string;
    docs: string;
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
};

export const ui: Record<Locale, Dict> = {
  'zh-CN': {
    nav: {
      features: '功能',
      how: '工作流',
      pricing: '定价',
      faq: '常见问题',
      download: '下载',
    },
    hero: {
      eyebrow: '为应用开发者打造',
      title: '一个工作台，搞定\nGoogle Play 与 App Store 的发布',
      subtitle:
        '元数据、多语言本地化、版本管理、素材与合规——全部在一个安静好用的桌面工具里完成。',
      primaryCta: '免费下载',
      secondaryCta: '看功能演示',
      platforms: '支持 macOS 与 Windows · 本地优先 · 凭据加密存储',
    },
    trust: {
      storeBoth: '支持 Google Play 与 App Store',
      localEnc: '凭据本地加密存储',
      oneClickTr: '一键多语言翻译',
      macWin: 'macOS / Windows 原生',
    },
    features: {
      eyebrow: '核心功能',
      title: '为发布流程的每个细节而设计',
      subtitle: '不堆砌功能，把每件事做对。',
    },
    how: {
      eyebrow: '工作流',
      title: '四步把一个版本送上架',
      subtitle: '从绑定账号到提交审核，整条路径都不离开 Releasy。',
      steps: [
        { title: '绑定账号', desc: '一次配置 Google 与 Apple 凭据，本地加密、不出本机。' },
        { title: '编辑元数据 & 本地化', desc: '统一编辑名称、描述、关键词，一键翻译多语言。' },
        { title: '上传素材与构建', desc: '截图与预览集中管理，构建包按版本追踪。' },
        { title: '校验并提交审核', desc: '提交前清单与跳转，少踩驳回坑。' },
      ],
    },
    pricing: {
      eyebrow: '定价',
      title: '为个人独立开发者到团队都准备好了',
      subtitle: '所有套餐都包含完整的元数据与发布管理；区别只在翻译额度与协作上。',
      monthly: '按月',
      yearly: '按年',
      yearlyHint: '年付立省 20%',
      perMonth: '/ 月',
      perYear: '/ 年',
      quotaPerMonth: '每月翻译额度',
      recommended: '推荐',
      plans: [
        {
          slug: 'free',
          name: 'Free',
          tagline: '足够你把第一个版本送上架。',
          cta: '免费下载',
          features: [
            '双商店统一工作台',
            '元数据 / 截图 / 版本管理',
            '每月 5,000 字翻译额度',
            '本地加密凭据',
          ],
        },
        {
          slug: 'pro',
          name: 'Pro',
          tagline: '为多版本、多语言的独立开发者准备。',
          cta: '升级到 Pro',
          features: [
            '包含 Free 全部功能',
            '每月 200,000 字翻译额度',
            '高级合规检查与提交清单',
            '优先邮件支持',
          ],
        },
        {
          slug: 'team',
          name: 'Team',
          tagline: '更高额度与团队协作（即将到来）。',
          cta: '加入候补',
          features: [
            '包含 Pro 全部功能',
            '每月 1,000,000 字翻译额度',
            '团队成员与角色（开发中）',
            '共享凭据策略（开发中）',
          ],
        },
      ],
    },
    faq: {
      eyebrow: '常见问题',
      title: '想到的都先回答了',
      subtitle: '没回答到的，欢迎邮件联系。',
    },
    cta: {
      title: '把发布流程交给一个安静的工具',
      subtitle: '下载 Releasy，今天就把下一版本准备好。',
      primary: '免费下载',
      secondary: '查看定价',
    },
    footer: {
      product: '产品',
      downloadMac: '下载（macOS）',
      downloadWin: '下载（Windows）',
      company: '公司',
      docs: '文档',
      privacy: '隐私政策',
      terms: '服务条款',
      contact: '联系我们',
      rights: '保留所有权利',
    },
  },
  en: {
    nav: {
      features: 'Features',
      how: 'How it works',
      pricing: 'Pricing',
      faq: 'FAQ',
      download: 'Download',
    },
    hero: {
      eyebrow: 'For app developers',
      title: 'One workspace for\nGoogle Play and App Store releases.',
      subtitle:
        'Metadata, localization, versioning, assets and compliance — all in one quiet desktop tool.',
      primaryCta: 'Download free',
      secondaryCta: 'See it in action',
      platforms: 'macOS & Windows · local-first · encrypted credentials',
    },
    trust: {
      storeBoth: 'Google Play + App Store',
      localEnc: 'Local-encrypted credentials',
      oneClickTr: 'One-click localization',
      macWin: 'Native macOS / Windows',
    },
    features: {
      eyebrow: 'Features',
      title: 'Designed for every step of the release.',
      subtitle: 'Not more features. The right ones, done well.',
    },
    how: {
      eyebrow: 'How it works',
      title: 'Four steps from draft to review',
      subtitle: 'From credential setup to submission, everything stays inside Releasy.',
      steps: [
        { title: 'Connect stores', desc: 'Configure Google & Apple credentials once. Encrypted locally, never leaves your machine.' },
        { title: 'Edit metadata & localize', desc: 'Manage titles, descriptions, keywords in one place. Translate to many languages in one click.' },
        { title: 'Upload assets & builds', desc: 'Screenshots and previews managed centrally. Builds tracked per version.' },
        { title: 'Validate & submit', desc: 'A pre-submission checklist that catches issues before review does.' },
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'From solo indie to team',
      subtitle: 'Full metadata and release tooling on every plan. Translation quota and collaboration scale up.',
      monthly: 'Monthly',
      yearly: 'Yearly',
      yearlyHint: 'Save 20% yearly',
      perMonth: '/ mo',
      perYear: '/ yr',
      quotaPerMonth: 'Translation quota / month',
      recommended: 'Recommended',
      plans: [
        {
          slug: 'free',
          name: 'Free',
          tagline: 'Enough to ship your first release.',
          cta: 'Download free',
          features: [
            'Unified Play + App Store workspace',
            'Metadata / screenshots / versioning',
            '5,000 chars / month translation',
            'Local-encrypted credentials',
          ],
        },
        {
          slug: 'pro',
          name: 'Pro',
          tagline: 'Built for multi-version, multi-language indies.',
          cta: 'Upgrade to Pro',
          features: [
            'Everything in Free',
            '200,000 chars / month translation',
            'Advanced compliance checklist',
            'Priority email support',
          ],
        },
        {
          slug: 'team',
          name: 'Team',
          tagline: 'Higher quotas and collaboration (coming soon).',
          cta: 'Join waitlist',
          features: [
            'Everything in Pro',
            '1,000,000 chars / month translation',
            'Members and roles (in progress)',
            'Shared credential policy (in progress)',
          ],
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions we get asked',
      subtitle: 'Anything else? Drop us an email.',
    },
    cta: {
      title: 'A quiet tool for the loud part of shipping',
      subtitle: 'Download Releasy and start prepping your next release today.',
      primary: 'Download free',
      secondary: 'See pricing',
    },
    footer: {
      product: 'Product',
      downloadMac: 'Download (macOS)',
      downloadWin: 'Download (Windows)',
      company: 'Company',
      docs: 'Docs',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
      rights: 'All rights reserved',
    },
  },
};

export function t(locale: Locale): Dict {
  return ui[locale];
}

export function localizedPath(locale: Locale, path: string = '/'): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (locale === 'zh-CN') return `/${clean}`;
  return `/en/${clean}`;
}
