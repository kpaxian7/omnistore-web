# OmniStore 落地页（Landing Page）方案（开发交接文档）

> 用途：可直接作为「新开对话/新建仓库」的开发起点，定义 OmniStore 官网落地页的选型、信息架构、内容、设计、对接与里程碑。
> 读者：实现这个落地页的开发者（或 AI agent）。
> 语言：沟通用中文；代码、标识符用英文。

---

## 0. 背景与目标

OmniStore 是一个 **Electron 桌面应用**，帮开发者打通 **Google Play + App Store** 的发布流程（元数据管理、多语言本地化一键翻译、版本管理、素材/截图、合规检查、提交审核）。

本项目是它的**对外营销落地页**，核心目标：

1. **讲清楚是什么 / 解决什么痛点**（首屏大图 + 价值主张）。
2. **展示功能**（功能具体介绍，图文/截图驱动）。
3. **定价 + 转化**（pricing + 下载/升级 CTA）。

成功指标：访客 → 下载（免费）/ 升级（Pro）。落地页只负责「看懂 + 行动」，不承载复杂业务（账号、支付结算在后端，见 `backend-plan.md`）。

非目标（本期不做）：用户后台/仪表盘、博客系统、文档站（可后续单独做）。

---

## 1. 技术栈（已定）

| 维度 | 选型 | 备注 |
|---|---|---|
| 框架 | **Astro**（默认）/ Next.js（备选） | 营销站默认零 JS、SEO/Lighthouse 最佳；要长成带 auth/dashboard 的 web app 才选 Next.js |
| UI 库 | **React**（作为 Astro islands 按需用） | 团队已熟 React；交互区块（定价切换、轮播、视频）用 island |
| 样式 | **Tailwind CSS** | 快速、一致；配少量 design tokens |
| 内容 | **Astro Content Collections（MD/MDX）** | features / faq / plans 数据驱动，改文案不动代码 |
| i18n | astro 的 i18n 路由（`/` 中文、`/en` 英文） | 目标是全球 App 开发者，建议中英双语 |
| 动画 | 克制：CSS + 必要处 Framer Motion(island) | 不要花哨 |
| 图标 | lucide（与桌面端一致） | 视觉延续 |
| 部署 | **Vercel** 或 **Cloudflare Pages** | 静态 + 边缘，自动 CI |
| 邮件订阅 | Resend / Formspree（可选） | 留资 / 更新通知 |
| 分析 | Plausible 或 Vercel Analytics | 隐私友好、看转化 |

> 为什么 Astro 而不是 Next.js：落地页 95% 是静态内容，Astro 默认不发 JS、首屏最快、SEO 最好，交互处用 React island 即可；Next.js 更适合「要继续长成有登录/后台的 web 应用」。两者 MVP 都能做，按是否会成长为 web app 取舍（见待定项）。
> 为什么不直接 Framer/Webflow：你是开发者、要可控和可版本化；代码方案长期更灵活。

---

## 2. 信息架构（单页 + 锚点）

单页长滚动 + 顶部导航锚点（移动端汉堡菜单）。从上到下：

1. **顶部导航**：Logo｜功能｜定价｜FAQ｜文档(可选)｜语言切换｜「下载」按钮
2. **Hero 首屏大图**：价值主张 + 副标题 + 主 CTA（下载/免费开始）+ 次 CTA（看功能）+ 产品大图/截图（或 30s 短演示）
3. **信任条**（可选）：「支持 Google Play & App Store」「凭据本地加密存储」等一行徽标
4. **核心功能介绍**：4–6 个 feature block（图文左右交替）
5. **工作流 How it works**：setup → 元数据/本地化 → 素材 → 部署提交（呼应 app 的实际工作流）
6. **定价 Pricing**：套餐表 + 月/年切换 + CTA
7. **FAQ**：常见问题手风琴
8. **结尾 CTA**：再次「下载 / 开始」
9. **Footer**：下载（mac/win）｜文档｜隐私政策｜联系｜版权

---

## 3. 各区块内容（结合 OmniStore 实际功能）

### 3.1 Hero（首屏大图）
- 主标题（示例，待定稿）：**「一个工作台，搞定 Google Play 与 App Store 的发布」**
- 副标题：元数据、多语言本地化、版本管理、素材与合规——全部在一个安静好用的桌面工具里完成。
- 主 CTA：**免费下载**（macOS / Windows）；次 CTA：**看功能演示**。
- 视觉：右侧/下方放**产品真机截图**（操作台界面）或短 GIF/视频。建议深色或浅灰背景突出截图。

### 3.2 核心功能 block（每个：图标 + 标题 + 1–2 句 + 截图）
1. **双商店统一工作台**：Google Play 与 App Store 一处管理，不再来回切后台。
2. **一键多语言本地化**：以主语言为源，添加多语言、一键翻译（推广文本/描述/关键词/新增内容），也可逐语言手改。
3. **版本管理与草稿**：按版本拉取、切换；临时保存可跨重启续编，改了不怕丢。
4. **元数据与素材**：名称/副标题/描述/分类、截图与预览，集中编辑、对照发布。
5. **合规与提交前检查**：提交审核前的清单与跳转，少踩驳回坑。
6. **凭据安全**：Google / Apple 凭据本地 `safeStorage` 加密，密钥不出本机/不进日志。

> 截图素材：从真实 app 截「操作台 / 本地化弹窗 / 版本切换」等，统一加圆角阴影。

### 3.3 工作流 How it works（3–4 步时间线）
绑定账号 → 编辑元数据 & 本地化 → 上传素材/构建 → 校验并提交审核。

### 3.4 定价 Pricing（见 §5）
### 3.5 FAQ（示例）
- 支持哪些商店？数据/密钥安全吗？翻译用什么引擎、要不要自带 key？支持 Windows 吗？免费版有什么限制？怎么升级/退订？

---

## 4. 设计 / 视觉规范

- 气质：**干净、克制、产品截图驱动**，和桌面端「安静工具」一脉相承，但比 app 更有营销张力。
- 色板：中性灰为主（#0a0a0a / #525252 / #f5f5f5）+ 一个品牌强调色（待定，建议沉稳的蓝或品牌黄，呼应图标）。深色 Hero 可选。
- 排版：无衬线（系统字体栈 / Inter）；大标题重、正文轻。
- 组件：圆角 12–16、轻阴影；按钮主深色(#171717)/次描边；feature 区块图文交替、留白充足。
- 响应式：移动优先；Hero 与 feature 在窄屏堆叠。
- 暗色模式：可选（v1 可只做浅色）。

> 可先出一版「设计稿 HTML / Figma」对齐像素，再实现（参考你之前 localization 弹窗的交付方式）。

---

## 5. 定价区与支付对接

套餐与额度**以 `backend-plan.md` 为准**（Free / Pro / 可选 Team；Pro = 更高每月翻译额度）。落地页定价区：

- 卡片式三列（或两列）：名称、价格、每月翻译额度、功能要点、CTA。
- **月/年切换**（年付折扣）——纯前端 toggle（React island）。
- CTA 行为（二选一，见待定项）：
  - **A·简单**：免费 → 跳「下载」；Pro → **Stripe Payment Link**（无需登录，付完引导下载/登录）。
  - **B·完整**：Pro → 跳后端 `/v1/billing/checkout`（需先登录，落地页内嵌登录或跳应用）。
- 价格/额度建议从**后端 `GET /v1/config` 拉取**（避免落地页与后端两处维护），或先写死常量、二期再接。

---

## 6. SEO / 性能 / 可访问性

- SEO：每页 `title`/`description`、Open Graph + Twitter Card、**OG 图**（Astro 可生成）、`sitemap.xml`、`robots.txt`、结构化数据（SoftwareApplication + Offer）。
- 性能：图片用 `astro:assets`（自动压缩/响应式/lazy）、字体子集化、首屏零阻塞 JS，目标 **Lighthouse 95+**。
- 可访问性：语义标签、对比度、键盘可达、`alt`、`prefers-reduced-motion`。

---

## 7. i18n（中英双语）

- 路由：`/`（zh-CN，默认）、`/en`（English）。
- 文案放 Content Collections / i18n 字典，组件无硬编码文案。
- 顶部语言切换；`hreflang` 标注。
- 面向全球开发者，英文版很重要；v1 至少中英。

---

## 8. 内容管理

- features / faq / plans 用 **Content Collections（MD/MDX + zod schema）**，改文案/加条目不动布局代码。
- 截图/视频放 `src/assets`，走 `astro:assets` 优化。
- 法务页（隐私政策、条款）用 MDX 单独页。

---

## 9. 转化与分析

- 关键事件埋点：Hero CTA 点击、下载点击（按平台 mac/win）、Pricing CTA、FAQ 展开。
- 工具：Plausible（隐私友好）或 Vercel Analytics。
- 下载链接策略：指向 GitHub Releases / 对象存储的安装包（mac `.dmg` / win `.exe`），按 UA 默认高亮当前平台。

---

## 10. 部署

- Vercel 或 Cloudflare Pages，连 Git 自动构建预览 + 生产。
- 自定义域名 + HTTPS；`/` 与 `/en` 均预渲染为静态。
- 环境变量（如有）：`PUBLIC_BACKEND_URL`、`PUBLIC_DOWNLOAD_MAC_URL`、`PUBLIC_DOWNLOAD_WIN_URL`、`PUBLIC_PLAUSIBLE_DOMAIN`、Stripe Payment Link 等。

---

## 11. 项目结构（Astro 建议）

```
landing/
  src/
    pages/
      index.astro            # 中文首页（拼装各 section）
      en/index.astro         # 英文首页
      privacy.mdx  terms.mdx
    components/
      Nav.astro  Hero.astro  Features.astro  HowItWorks.astro
      Pricing.tsx            # React island（月/年切换）
      Faq.tsx                # React island（手风琴）
      Footer.astro  CTA.astro
    content/
      features/*.md  faq/*.md  plans/*.md   # 数据驱动内容
      config.ts              # collections schema(zod)
    assets/                  # 截图/视频/og
    i18n/                    # 字典/工具
    styles/ global.css
  astro.config.mjs  tailwind.config.ts  package.json
```

---

## 12. 里程碑

- **M0 脚手架**：Astro + Tailwind + React 集成 + 部署管线（Vercel/CF）+ 基础 SEO（title/og/sitemap）。
- **M1 首屏 + 导航 + Footer**：Hero（含产品截图占位）、响应式、CTA 跳下载。
- **M2 功能区 + 工作流**：feature blocks（Content Collections 驱动）、How it works，真实截图替换占位。
- **M3 定价 + FAQ**：Pricing（月/年切换、CTA 接 Stripe Payment Link 或后端）、FAQ 手风琴。
- **M4 i18n + 打磨**：英文版、OG 图、Lighthouse 调优、埋点分析、法务页。

---

## 13. 与其它项目的衔接

- **后端**（`backend-plan.md`）：定价/额度来源（`GET /v1/config`）、升级走 `/v1/billing/checkout` 或 Stripe Payment Link。落地页只读不写。
- **桌面端**：下载安装包链接（mac/win）；「升级 Pro」后用户回桌面端登录使用额度。
- **品牌一致**：图标、配色、lucide 图标、安静克制的气质与 app 延续。

---

## 14. 待定决策

1. **框架**：Astro（默认、营销最优）还是 Next.js（要长成带登录/后台的 web app）？
2. **i18n**：v1 直接中英双语，还是先中文、二期加英文？
3. **定价 CTA**：A·Stripe Payment Link（无需登录、最简）还是 B·走后端 checkout（需登录）？
4. **定价数据来源**：从后端 `GET /v1/config` 动态拉，还是先写死常量？
5. **下载分发**：GitHub Releases / 对象存储 / 自建？是否需要自动更新页。
6. **暗色模式**：v1 做不做？
7. **仓库形态**：独立新仓 还是放进本 repo 的 `landing/` 子目录（monorepo）？
8. **域名 / 分析工具 / 强调色**：定一下。

---

## 附：交付要点速查

- 单页长滚动，区块：Nav → Hero → (信任条) → Features → How it works → Pricing → FAQ → CTA → Footer。
- Astro + Tailwind + React islands；内容 Content Collections；SEO/OG/sitemap 齐全；Lighthouse 95+。
- 定价对齐 `backend-plan.md`；下载/升级是核心转化；中英双语。
- 截图来自真实 app；视觉延续桌面端的安静气质 + 一个强调色。
