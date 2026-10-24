# OmniStore 落地页 PRD（当前状态存档）

> 日期：2026-06-09
> 性质：**现状快照**——记录官网落地页已落地的形态、信息架构与内容，作为后续迭代基线。
> 关系：在 `landing-plan.md`（最初方案）基础上记录实际实现状态。
> 本次更新：换新品牌标识（favicon/apple-touch/OG/manifest + Nav/Footer logo）、标题改 **Poppins Light** + 品牌名 Releasy 斜体、Hero 大标题换行修复；并把法务页/联系方式的过时信息（DeepL→OpenRouter、omnistore.app→releasy.tools）订正。
> 语言：沟通中文；代码/标识符英文；面向全球开发者，内容中英双语。

---

## 1. 定位

**Releasy**（Release easy；Electron 桌面应用，内部项目代号 OmniStore）的对外营销落地页。核心目标：讲清楚是什么/解决什么痛点 → 展示功能 → 定价 + 转化（下载免费 / 升级 Pro）。不承载账号/支付结算（在后端，见 `../omnistore-server`）。

## 2. 技术栈（已落地）

| 维度 | 选型 |
|---|---|
| 框架 | **Astro** v6（营销站默认零 JS、SEO/Lighthouse 最佳） |
| 交互区块 | **React** islands（`Pricing.tsx` 月/年切换、`Faq.tsx` 手风琴） |
| 样式 | **Tailwind CSS** + `src/styles/global.css`；标题字体 **Poppins Light**（本地 `public/fonts/*.ttf` + `@font-face`），品牌名 **Releasy 斜体** |
| 内容 | **Astro Content Collections**（JSON + zod schema，`src/content.config.ts`） |
| 图标 | lucide-react（与桌面端一致） |
| i18n | 路由 `/`(zh-CN 默认) 与 `/en`(English)，字典 `src/i18n/ui.ts` |
| 其它 | `@astrojs/mdx`（法务页）、`@astrojs/sitemap` |

脚本：`npm run dev` / `npm run build`（`astro check && astro build`）/ `npm run preview`。

## 3. 信息架构（单页长滚动 + 锚点）

`src/pages/index.astro`（zh）与 `src/pages/en/index.astro`（en）拼装区块（`src/components/`）：

1. **Nav**（Logo｜功能｜定价｜FAQ｜语言切换｜下载）
2. **Hero**（价值主张 + 主/次 CTA + 产品大图，配 `AppMock.astro`；大标题按 `\n` 分行 + `text-wrap: pretty`，产品名不拆行）
3. **TrustBar**（信任徽标条）
4. **Features**（功能区块，`FeatureIcon.astro` + Content Collections 驱动）
5. **HowItWorks**（工作流时间线）
6. **Pricing**（套餐表 + 月/年切换，React island）
7. **Faq**（常见问题手风琴，React island）
8. **CTA**（结尾下载/开始）
9. **Footer**

布局壳 `src/layouts/{BaseLayout,LegalLayout}.astro`。

## 4. 内容（Content Collections，中英各一套）

- `content/features/{zh,en}-0X-*.json` × 6：双商店统一工作台 / 一键本地化 / 版本管理 / 元数据与素材 / 合规与提交前检查 / 凭据安全。
- `content/faq/{zh,en}-0X-*.json` × 6：支持哪些商店 / 数据安全 / 翻译引擎 / Windows 支持 / 免费版限制 / 升级退订。
- `content/plans/{free,pro,team}.json`：套餐（名称/价格/每月翻译额度/功能要点/CTA）。
- 改文案/加条目不动布局代码。

## 5. 法务 / SEO

- 法务页：`pages/{privacy,terms}.mdx` 与 `pages/en/{privacy,terms}.mdx`（`LegalLayout`）。
- SEO：每页 title/description、sitemap（`@astrojs/sitemap`）；`src/env.d.ts` 类型。

## 6. 环境变量（见 `.env.example`，均 `PUBLIC_` 前缀）

`PUBLIC_BACKEND_URL`、`PUBLIC_DOWNLOAD_MAC_URL`、`PUBLIC_DOWNLOAD_WIN_URL`、`PUBLIC_STRIPE_PAYMENT_LINK`、`PUBLIC_PLAUSIBLE_DOMAIN`。

## 7. 与其它项目衔接

- **后端**（`../omnistore-server`）：定价/额度来源（未来 `GET /v1/config`）、升级走 Stripe Payment Link 或 `/v1/billing/checkout`。落地页只读不写。
- **桌面端**：下载安装包链接（mac `.dmg` / win `.exe`）；分发走官网直下（非商店，详见对话记录）。
- 品牌：图标、配色、lucide 图标、安静克制气质与桌面端延续。

## 8. 部署（已上线）

- **域名**：`https://www.releasy.tools`（裸域 `releasy.tools` 与 http 80 均 301 跳到 www）；产品对外品牌 **Releasy**（Release easy；OmniStore 仅为内部项目代号，站点文案已统一为 Releasy）。`astro.config.mjs` 的 `site` 已设为该域名（影响 canonical/sitemap/OG）。品牌标识（favicon 16/32、apple-touch-icon、OG 图 `og.png`、PWA `site.webmanifest` + 192/512 图标、Nav/Footer logo）均已换为 Releasy 新标识。
- **服务器**：**`jp2`**（`64.176.51.21`，Vultr，Ubuntu 24.04，nginx 1.24；SSH 别名 `ssh jp2`）。2026-10 从旧服务器 `jp`（`38.47.125.171`）迁移而来，站点目录与 nginx 配置路径不变；旧服务器已停用，不要再往 `jp` 部署。站点走 Cloudflare 橙云代理，DNS 指向 Cloudflare 而非服务器 IP。
- **方式**：`astro build` 出纯静态 `dist/`；jp2 上 nginx **静态 root** 直接服务，约定与隔壁项目一致：`root /etc/nginx/deployment/releasy/dist`（参照 `kpaxian.io`：`/etc/nginx/deployment/kpaxian/dist`）。
- **流程**：本地 `npm run build` → `rsync -az dist/ jp2:/etc/nginx/deployment/releasy/dist/` → 服务器 `nginx -t && systemctl reload nginx`。nginx 配置 `/etc/nginx/conf.d/releasy.tools.conf`（Let's Encrypt 证书 + `try_files $uri $uri/ /index.html` + 静态资源 30d 缓存）。
- **法务页**：`/privacy`、`/terms`（中），`/en/privacy`、`/en/terms`（英）已写充实，覆盖真实数据流（OAuth 登录拿邮箱、服务端翻译把文案发 **OpenRouter**、商店凭据本地加密不出本机）；联系邮箱 `hello@releasy.tools`。

## 9. 状态 / 待办

区块/内容/中英双语/定价切换/FAQ/法务页已具备并上线。后续：
- 真实产品截图替换占位（从桌面端截「制作截图浮层 / 操作台 / 本地化」）。
- 定价数据接后端 `GET /v1/config`（或先写死）；CTA 接 Stripe Payment Link / 后端 checkout。
- 下载分发链接（GitHub Releases / 对象存储）按平台高亮。
- OG 图、结构化数据、Lighthouse 调优、埋点（Plausible/Vercel Analytics）。
- CI 自动构建 + 部署（当前为手动 rsync）。
