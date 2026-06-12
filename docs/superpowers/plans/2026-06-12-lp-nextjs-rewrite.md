# AI導入コンサルLP Next.js化 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 静的HTML LP（`index.html` 771行 + `styles-editorial.css` 44KB）を Next.js 16.2.9 + TypeScript + Tailwind v4 に1:1移植し、採用サイトの ui/ 部品を共有基盤として取り込み、GitHub Pages の同URLで公開する。

**Architecture:** 既存LPリポジトリ内に in-place 構築。CSSは `styles-editorial.css` をほぼ逐語で globals.css に取り込み（クラス名維持・Tailwind preflight 不使用）、マークアップはセクション単位の JSX コンポーネントに逐語変換。インラインJS 3機能（reveal / パーティクル / スクロール色補間）は client component に忠実移植。Phase 1 合格後、Phase 2 でデザイン技法（巨大背景番号・kicker・CountUp）を追加。

**Tech Stack:** Next.js 16.2.9 / React 19.2.4 / Tailwind CSS v4（@theme トークンのみ、preflight なし）/ TypeScript 5 / next/font（Google Fonts 5書体）/ GitHub Actions + actions/deploy-pages

**承認済み設計書:** `docs/superpowers/specs/2026-06-12-lp-nextjs-rewrite-design.md`

---

## 前提知識（実行者は最初に読むこと）

### パス

- **作業リポジトリ**: `/Users/takahiromiyamoto/Work/ai-solution-division/08-プロダクト/AI導入コンサル/`（以下「LP repo」。git remote = `AI-Solution-dep/ai-consulting-lp`）
- **移植元（採用サイト）**: `/Users/takahiromiyamoto/DEV/01.Company/recruitment_lp/`（以下「recruit」。**読み取り専用。一切変更しない**）
- 公開URL: `https://ai-solution-dep.github.io/ai-consulting-lp/`

### 現行 index.html の構造（行番号は移植元の正）

| 行範囲 | 内容 | 移植先コンポーネント |
|---|---|---|
| L1-14 | head メタ（title/description/OG） | `layout.tsx` の `metadata` |
| L15-19 | js-motion 付与スクリプト | `layout.tsx` `<head>` 内インラインscript |
| L22-66 | JSON-LD ×2（Service / FAQPage） | `layout.tsx` `<head>` 内 |
| L69-84 | ヘッダー | `layout/SiteHeader.tsx` |
| L88-107 | Hero | `sections/Hero.tsx` |
| L109-129 | Problem | `sections/Problem.tsx` |
| L131-152 | OutcomeStrip | `sections/OutcomeStrip.tsx` |
| L154-179 | Why | `sections/Why.tsx` |
| L181-207 | Comparison（AI研修との違い・idなし） | `sections/Comparison.tsx` |
| L209-249 | Saas | `sections/Saas.tsx` |
| L251-306 | Stories | `sections/Stories.tsx` |
| L309-312 | MidCta | `sections/MidCta.tsx` |
| L314-350 | Program | `sections/Program.tsx` |
| L352-388 | Deliverables | `sections/Deliverables.tsx` |
| L390-394 | **narrow-down（セクション外の独立div。見落とし注意）** | `sections/NarrowDown.tsx` |
| L396-430 | Price | `sections/Price.tsx` |
| L432-472 | NextStep（id=next） | `sections/NextStep.tsx` |
| L474-499 | Security | `sections/Security.tsx` |
| L501-535 | Faq（native `<details>`、JSなし） | `sections/Faq.tsx` |
| L537-550 | FinalCta（id=cta） | `sections/FinalCta.tsx` |
| L552-575 | フッター | `layout/SiteFooter.tsx` |
| L578-642 | JS① reveal（data-reveal 24種 + stagger + data-reveal-img） | `components/PageEffects.tsx` |
| L643-740 | JS② ヒーローパーティクル | `sections/HeroParticles.tsx` |
| L741-768 | JS③ スクロール色補間（--page-bg） | `components/PageEffects.tsx` |

### HTML→JSX 変換ルール（全セクション共通）

index.html に**インラインstyleとSVGは1つも無い**（検証済み）ので、変換は以下だけ:

1. `class=` → `className=`
2. `<img ...>` → `<img ... />`（self-close）。`<br>` → `<br />`
3. `fetchpriority="high"` → `fetchPriority="high"`
4. 画像パス `./assets/...` → `{asset("/assets/...")}`（`@/lib/asset` をimport）
5. HTMLコメント `<!-- -->` → `{/* */}`（または削除）
6. テキスト・属性値・リンクURL（Spirリンク含む）は**一字も変えない**。`&amp;` 等のエンティティもそのまま
7. `<details>` の動作はネイティブのまま（Reactで状態管理しない）

### 検証コマンド（全タスク共通）

```bash
cd "/Users/takahiromiyamoto/Work/ai-solution-division/08-プロダクト/AI導入コンサル"
npm run build        # エラーゼロで完走すること
```

---

# Phase 1: 1:1移植

### Task 1: Next.js プロジェクトのスキャフォールド

**Files:**
- Create: `package.json`, `tsconfig.json`, `postcss.config.mjs`, `next.config.ts`, `src/app/layout.tsx`（仮）, `src/app/page.tsx`（仮）, `src/app/globals.css`（仮）
- Modify: `.gitignore`

- [ ] **Step 1: package.json を作成**

```json
{
  "name": "ai-consulting-lp",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:static": "BUILD_STATIC=true next build",
    "build:pages": "BUILD_STATIC=true NEXT_PUBLIC_BASE_PATH=/ai-consulting-lp next build"
  },
  "dependencies": {
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: tsconfig.json を作成**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

- [ ] **Step 3: postcss.config.mjs を作成**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 4: next.config.ts を作成**（recruit の構成を流用）

```ts
import type { NextConfig } from "next";

// GitHub Pages への静的書き出し（BUILD_STATIC=true のときのみ有効）
const isStatic = process.env.BUILD_STATIC === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = isStatic
  ? {
      output: "export",
      images: { unoptimized: true },
      basePath: basePath || undefined,
      assetPrefix: basePath || undefined,
      trailingSlash: true,
    }
  : {};

export default nextConfig;
```

- [ ] **Step 5: 仮の app ファイルを作成**

`src/app/globals.css`:
```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
```

`src/app/layout.tsx`:
```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="editorial-lp">{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:
```tsx
export default function Home() {
  return <main>scaffold ok</main>;
}
```

- [ ] **Step 6: .gitignore に追記**

既存 `.gitignore` の末尾に以下を追加（既存行は変更しない）:

```
node_modules/
.next/
out/
next-env.d.ts
*.tsbuildinfo
```

- [ ] **Step 7: install と build 検証**

```bash
cd "/Users/takahiromiyamoto/Work/ai-solution-division/08-プロダクト/AI導入コンサル"
npm install
npm run build
```
Expected: `✓ Compiled successfully`（警告は許容、エラーは不可）

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tsconfig.json postcss.config.mjs next.config.ts src/ .gitignore
git commit -m "feat: Next.js 16 + TypeScript + Tailwind v4 スキャフォールド"
```

---

### Task 2: globals.css — トークン定義と現行CSSの取り込み

**Files:**
- Modify: `src/app/globals.css`

**方針:** Tailwind preflight は**読み込まない**（現行CSSは `.editorial-lp` スコープの自前リセットを持ち、preflight を足すと見た目が変わるリスクがあるため）。`@theme` トークンは Phase 2 で ui/ 部品が使うための定義であり、Phase 1 の見た目には影響しない。

- [ ] **Step 1: @theme トークンを追記**

globals.css の `@import` 群の直後に追加:

```css
/* ===== デザイントークン（採用サイト ui/ 部品互換。値はLPブランド） ===== */
@theme {
  --color-brand: #C8102E;
  --color-brand-dark: #9A0E26;
  --color-ink: #0F0F10;
  --color-body: #2A2A2D;
  --color-muted: #6B6B70;
  --color-line: #D8D2C7;
  --color-paper: #FAF8F5;
  --color-cream: #F2EDE4;
  --color-gold: #B08D57;

  --font-serif: var(--font-noto-serif-jp), "Noto Serif JP", serif;
  --font-sans: var(--font-noto-sans-jp), "Noto Sans JP", sans-serif;
  --font-mono: var(--font-public-sans), "Public Sans", sans-serif;
  --font-display: var(--font-libre-bodoni), "Libre Bodoni", serif;

  --radius-card: 2px;
}
```

- [ ] **Step 2: styles-editorial.css を全文取り込み**

```bash
cd "/Users/takahiromiyamoto/Work/ai-solution-division/08-プロダクト/AI導入コンサル"
# 1行目の @import url('https://fonts.googleapis.com/...') を除いた全文を追記
sed '/@import url/d' styles-editorial.css >> src/app/globals.css
```

- [ ] **Step 3: フォント変数5つを next/font 変数参照に差し替え**

globals.css 内（旧 styles-editorial.css L24-28 由来の箇所）を編集:

```css
  --font-serif-en: var(--font-libre-bodoni), 'Noto Serif JP', serif;
  --font-sans-en: var(--font-public-sans), 'Noto Sans JP', sans-serif;
  --font-serif-jp: var(--font-noto-serif-jp), serif;
  --font-sans-jp: var(--font-noto-sans-jp), sans-serif;
  --font-hand: var(--font-caveat), cursive;
```

- [ ] **Step 4: build 検証 → Commit**

```bash
npm run build   # Expected: PASS
git add src/app/globals.css
git commit -m "feat: globals.css に @theme トークンと現行LPのCSS全文を移植"
```

---

### Task 3: layout.tsx — フォント・メタデータ・JSON-LD・js-motion

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: layout.tsx を完成形に書き換え**

```tsx
import type { Metadata } from "next";
import { Libre_Bodoni, Public_Sans, Noto_Serif_JP, Noto_Sans_JP, Caveat } from "next/font/google";
import "./globals.css";

const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-bodoni",
  display: "swap",
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: false,
});
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI業務自動化支援｜Google Workspace・kintone・freeeなど業務アプリ連携 | JQIT",
  description:
    "Google Workspace、kintone、freee、LINE WORKS、Chatwork など、いま使っている業務アプリをそのままに、毎日の手作業を一か月で「動く自動化」に変える導入支援。",
  openGraph: {
    title: "AI業務自動化支援｜JQIT",
    description:
      "Claude / Codex と API・GAS連携で、Google Workspace・kintone・freee など既存SaaSをまたぐ手作業を減らします。",
    type: "website",
    images: ["https://ai-solution-dep.github.io/ai-consulting-lp/assets/generated/10-og.png"],
  },
  twitter: { card: "summary_large_image" },
};

// index.html L15-19 と同一（reduced-motion でなければ js-motion を付与）
const motionScript = `if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion');}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${libreBodoni.variable} ${publicSans.variable} ${notoSerifJP.variable} ${notoSansJP.variable} ${caveat.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD_SERVICE }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD_FAQ }}
        />
      </head>
      <body className="editorial-lp">{children}</body>
    </html>
  );
}
```

`JSON_LD_SERVICE` / `JSON_LD_FAQ` は **index.html L22-52 と L53-66 の `<script type="application/ld+json">` の中身を逐語コピー**して、layout.tsx 冒頭（import 直後）に文字列定数として定義する:

```tsx
const JSON_LD_SERVICE = `{ ...L23-51の中身を逐語... }`;
const JSON_LD_FAQ = `{ ...L54-65の中身を逐語... }`;
```

注意: テンプレートリテラル内にバッククォートや `${` が含まれないことを確認（JSON-LDは純粋なJSONなので通常含まれない）。

- [ ] **Step 2: build 検証（フォント落とし穴の最優先確認）**

```bash
npm run build
```
Expected: PASS。**フォント解決エラー（500/Unknown font）が出た場合**は設計書リスク表に従い、該当フォントだけ globals.css 冒頭への Google Fonts `@import` 復活にフォールバックし、その旨をコミットメッセージに記録する。

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: layout.tsx に next/font 5書体・メタデータ・JSON-LD・js-motion を移植"
```

---

### Task 4: lib と ui/ 部品のコピー（採用サイトから）

**Files:**
- Create: `src/lib/cn.ts`, `src/lib/asset.ts`, `src/components/ui/`（7ファイル）

- [ ] **Step 1: コピー実行**

```bash
RECRUIT=/Users/takahiromiyamoto/DEV/01.Company/recruitment_lp
LP="/Users/takahiromiyamoto/Work/ai-solution-division/08-プロダクト/AI導入コンサル"
mkdir -p "$LP/src/lib" "$LP/src/components/ui"
cp "$RECRUIT/src/lib/cn.ts" "$RECRUIT/src/lib/asset.ts" "$LP/src/lib/"
cp "$RECRUIT/src/components/ui/"{Button,Container,SectionHead,FadeIn,CountUp,GeoBackdrop,GeoMark}.tsx "$LP/src/components/ui/"
```

- [ ] **Step 2: import 解決の確認**

ui/ 部品が `@/lib/cn` 等を import している場合、Task 1 の tsconfig paths（`@/*`）で解決される。`next` や recruit 固有の import（`@/lib/content` 等）が残っていればその部品のみ該当行を確認し、**LPに存在しない依存があれば部品ごと保留にせず、依存箇所だけ自己完結に書き換える**（例: content 由来の型を local type に）。

```bash
grep -rn "from \"@/" "$LP/src/components/ui/" "$LP/src/lib/"
npm run build   # Expected: PASS
```

- [ ] **Step 3: Commit**

```bash
git add src/lib src/components/ui
git commit -m "feat: 採用サイトから ui/ 7部品と lib/cn,asset をコピー移植"
```

---

### Task 5: アセット移動と Header / Footer

**Files:**
- Create: `public/assets/`（既存 assets/ を git mv）, `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`

- [ ] **Step 1: アセットを public/ へ移動**

```bash
mkdir -p public
git mv assets public/assets
```

- [ ] **Step 2: SiteHeader.tsx を作成**（index.html L69-84 を変換ルールで逐語変換）

```tsx
import { asset } from "@/lib/asset";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="JQIT">
          <img src={asset("/assets/logo.png")} alt="JQIT" />
        </a>
        <nav className="nav" aria-label="ページ内ナビゲーション">
          <a href="#why">特長</a>
          <a href="#saas">対応アプリ</a>
          <a href="#stories">自動化例</a>
          <a href="#program">プログラム</a>
          <a href="#price">価格</a>
          <a href="#faq">FAQ</a>
          <a className="nav-cta" href="https://app.spirinc.com/t/qRgOv_0Sv6TwRrSmRqVmf/as/-zbXeo9kkaLolpsRibQ5j/confirm">無料相談</a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: SiteFooter.tsx を作成**（index.html L552-575 を同様に逐語変換。`<dl>` 構造・電話リンク・SNSリンク・コピーライト文をそのまま）

- [ ] **Step 4: build 検証 → Commit**

```bash
npm run build
git add public src/components/layout
git commit -m "feat: アセットを public/ へ移動し Header / Footer を移植"
```

---

### Task 6: PageEffects と HeroParticles（インラインJS 3機能の移植）

**Files:**
- Create: `src/components/PageEffects.tsx`, `src/components/sections/HeroParticles.tsx`

- [ ] **Step 1: PageEffects.tsx を作成**

index.html の JS①（L579-641: reveal）と JS③（L741-768: スクロール色補間）を `useEffect` に移植する。**targets 配列・しきい値・delay計算式は一字も変えない**:

```tsx
"use client";

import { useEffect } from "react";

export default function PageEffects() {
  // JS① スクロール連動リビール（index.html L579-641 と同一ロジック）
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // [セレクタ, グリッド内スタッガーの有無]
    const targets: Array<[string, boolean]> = [
      [".section-heading", false],
      [".section-num", false],
      [".problem__label", false],
      [".outcome-strip h2", false],
      [".comparison-table tbody tr", true],
      [".outcome-grid > article", true],
      [".problem__list li", true],
      [".problem__affinity", false],
      [".why-card", true],
      [".comparison-table-wrap", false],
      [".saas-card", true],
      [".story", true],
      [".program-card", true],
      [".timeline > div", true],
      [".deliverables-list li", true],
      [".deliverables-flow > div", true],
      [".narrow-down", false],
      [".price-headline > div", true],
      [".price-details article", true],
      [".layer-card", true],
      [".security-grid article", true],
      [".faq-item", true],
      [".mid-cta", false],
      [".cta .container", false],
    ];
    targets.forEach((t) => {
      const els = document.querySelectorAll<HTMLElement>(t[0]);
      els.forEach((el, i) => {
        el.setAttribute("data-reveal", "");
        if (t[1]) {
          el.style.setProperty("--reveal-delay", (Math.min(i % 6, 5) * 0.1).toFixed(1) + "s");
        }
      });
    });

    // Use Cases の画像はマスクワイプで見せる
    document.querySelectorAll(".story__image").forEach((img) => {
      img.setAttribute("data-reveal-img", "");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            // clip-pathで全隠しした子画像は交差判定が効かないため、親の発火に連動させる
            en.target.querySelectorAll("[data-reveal-img]").forEach((c) => c.classList.add("is-visible"));
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 0px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  // JS③ スクロール連動カラートランジション（index.html L741-768 と同一ロジック）
  // 原本では JS② と同一 IIFE 内（L644 の reduced-motion ガードの内側）のため、ここにもガードが必要
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stops: Array<[number, [number, number, number]]> = [
      [0.0, [250, 248, 245]], // --paper #FAF8F5
      [0.45, [246, 239, 228]], // 中間の温かい紙色
      [1.0, [237, 228, 211]], // 深い生成り #EDE4D3
    ];
    const body = document.body;
    let ticking = false;
    function lerpColor(p: number): number[] {
      for (let i = 1; i < stops.length; i++) {
        if (p <= stops[i][0]) {
          const a = stops[i - 1];
          const b = stops[i];
          const t = (p - a[0]) / (b[0] - a[0]);
          return [0, 1, 2].map((k) => Math.round(a[1][k] + (b[1][k] - a[1][k]) * t));
        }
      }
      return stops[stops.length - 1][1];
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        const c = lerpColor(p);
        body.style.setProperty("--page-bg", `rgb(${c[0]},${c[1]},${c[2]})`);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
```

- [ ] **Step 2: HeroParticles.tsx を作成**

index.html L647-738 のパーティクルロジックを移植。canvas は ref で持ち、hero 要素は `canvas.closest(".hero")` で取得。**数値（粒子数式・LINK_DIST=120・速度±0.35・赤比率0.12・色 rgba(200,16,46,0.5) / rgba(15,15,16,0.4)）は一切変えない**:

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    if (!canvas || !hero || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; red: boolean };
    let particles: P[] = [];
    let running = false;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const LINK_DIST = 120;

    function resize() {
      W = hero!.clientWidth;
      H = hero!.clientHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(32, Math.min(90, Math.floor((W * H) / 19000)));
      particles = [];
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1 + Math.random() * 1.3,
          red: Math.random() < 0.12,
        });
      }
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // マウスからやわらかく逃げる
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = dx * dx + dy * dy;
        if (d < 19600) {
          // 140px
          const f = ((140 - Math.sqrt(d)) / 140) * 0.06;
          p.vx += dx * f * 0.02;
          p.vy += dy * f * 0.02;
        }
        p.vx = Math.max(-0.5, Math.min(0.5, p.vx));
        p.vy = Math.max(-0.5, Math.min(0.5, p.vy));
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }
      // 接続線
      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i];
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx!.strokeStyle = `rgba(15, 15, 16, ${(0.13 * (1 - d / LINK_DIST)).toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
      }
      // 粒子
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx!.fillStyle = p.red ? "rgba(200, 16, 46, 0.5)" : "rgba(15, 15, 16, 0.4)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    // ヒーローが画面外のときは描画停止
    const io = new IntersectionObserver((entries) => {
      entries[0].isIntersecting ? start() : stop();
    });
    io.observe(hero);
    resize();
    start();

    return () => {
      stop();
      io.disconnect();
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />;
}
```

- [ ] **Step 3: build 検証 → Commit**

```bash
npm run build
git add src/components/PageEffects.tsx src/components/sections/HeroParticles.tsx
git commit -m "feat: reveal・スクロール色補間・パーティクルJSを client component に移植"
```

---

### Task 7: セクション移植①（Hero / Problem / OutcomeStrip）+ page.tsx 組み立て開始

**Files:**
- Create: `src/components/sections/Hero.tsx`, `Problem.tsx`, `OutcomeStrip.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Hero.tsx を作成**（index.html L88-107。完成形を示す — 他セクションもこの要領）

```tsx
import { asset } from "@/lib/asset";
import HeroParticles from "./HeroParticles";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroParticles />
      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__issue">
            <span>JQIT AI Automation</span>
          </div>
          <h1 id="hero-title"><span className="hero-title__line"><span className="accent">転記・確認・通知、</span></span><br />もう手でやらない。<br /><span className="hero-title__answer">それ、AIで<span className="underline-hand">減らせます</span>。</span></h1>
          <p className="hero__lead">気づいている。この作業、人がやらなくていいはずだと。<br />その感覚は正しい。新しいシステムの導入などはいりません。<br />いまのアプリをそのままに、一か月で動く自動化のひな形まで作ります。<br />相談だけでも大丈夫。技術的なことは、すべてこちらが引き受けます。<br /><span className="accent">まず30分、話してみてください。</span></p>
          <div className="hero__actions">
            <a className="button button--primary" href="https://app.spirinc.com/t/qRgOv_0Sv6TwRrSmRqVmf/as/-zbXeo9kkaLolpsRibQ5j/confirm">30分の無料相談を予約する</a>
            <a className="button button--secondary" href="#stories">自動化例を見る</a>
          </div>
        </div>
        <figure className="hero__visual">
          <img src={asset("/assets/generated/01-hero.png")} alt="経営者とコンサルタントが同じPC画面を見ながら業務の自動化を検討している様子" loading="eager" fetchPriority="high" />
          <figcaption className="hero__caption">問うのは使い方ではなく、減らし方。一か月で、一緒に決めます。</figcaption>
        </figure>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Problem.tsx（L109-129）/ OutcomeStrip.tsx（L131-152）を変換ルールどおり逐語変換で作成**

画像があれば `asset()` を通す。それ以外の変更は禁止。

- [ ] **Step 3: page.tsx を組み立て**

```tsx
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageEffects from "@/components/PageEffects";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import OutcomeStrip from "@/components/sections/OutcomeStrip";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <OutcomeStrip />
      </main>
      <SiteFooter />
      <PageEffects />
    </>
  );
}
```

- [ ] **Step 4: 目視スモーク → Commit**

```bash
npm run dev   # localhost:3000 で Hero〜OutcomeStrip の見た目・パーティクル・revealを確認
npm run build
git add src/components/sections src/app/page.tsx
git commit -m "feat: Hero / Problem / OutcomeStrip を移植し page.tsx を組み立て"
```

---

### Task 8: セクション移植②（Why / Comparison / Saas）

**Files:**
- Create: `src/components/sections/Why.tsx`（L154-179）, `Comparison.tsx`（L181-207）, `Saas.tsx`（L209-249）
- Modify: `src/app/page.tsx`（3コンポーネントを `<OutcomeStrip />` の後に追加）

- [ ] **Step 1: 3セクションを変換ルールどおり逐語変換で作成**（Comparison は `<table>` を含む。`<tbody>` 等の構造を崩さない）
- [ ] **Step 2: page.tsx に追加 → build → Commit**

```bash
npm run build
git add src/components/sections src/app/page.tsx
git commit -m "feat: Why / Comparison / Saas セクションを移植"
```

---

### Task 9: セクション移植③（Stories / MidCta / Program）

**Files:**
- Create: `src/components/sections/Stories.tsx`（L251-306）, `MidCta.tsx`（L309-312）, `Program.tsx`（L314-350）
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 3セクションを逐語変換で作成**（Stories は `.story__image` 画像5枚 — `asset()` を忘れない。`data-reveal-img` は **JSXに書かない**。PageEffects が実行時に付与する）
- [ ] **Step 2: page.tsx に追加 → build → Commit**

```bash
git commit -m "feat: Stories / MidCta / Program セクションを移植"
```

---

### Task 10: セクション移植④（Deliverables / NarrowDown / Price）

**Files:**
- Create: `src/components/sections/Deliverables.tsx`（L352-388）, `NarrowDown.tsx`（L390-394）, `Price.tsx`（L396-430）
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 3つを逐語変換で作成**。NarrowDown は `<section>` ではなく `<div class="narrow-down" role="note">` — そのまま div で:

```tsx
export default function NarrowDown() {
  return (
    <div className="narrow-down" role="note">
      <p><strong>相談だけでもOK</strong>。「何から手をつければいいか」の整理にも、お気軽にお使いください。</p>
      <a className="button button--primary" href="https://app.spirinc.com/t/qRgOv_0Sv6TwRrSmRqVmf/as/-zbXeo9kkaLolpsRibQ5j/confirm">30分の無料相談を予約する</a>
    </div>
  );
}
```

- [ ] **Step 2: page.tsx に追加 → build → Commit**

```bash
git commit -m "feat: Deliverables / narrow-down / Price を移植"
```

---

### Task 11: セクション移植⑤（NextStep / Security / Faq / FinalCta）— 全15セクション完成

**Files:**
- Create: `src/components/sections/NextStep.tsx`（L432-472）, `Security.tsx`（L474-499）, `Faq.tsx`（L501-535）, `FinalCta.tsx`（L537-550）
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 4セクションを逐語変換で作成**（Faq の `<details class="faq-item">` は `<details className="faq-item">` のままネイティブ動作。open 属性の初期値があれば `open` をそのまま）
- [ ] **Step 2: page.tsx 完成**（最終構成: Hero / Problem / OutcomeStrip / Why / Comparison / Saas / Stories / MidCta / Program / Deliverables / NarrowDown / Price / NextStep / Security / Faq / FinalCta の順）
- [ ] **Step 3: 全文言の逐語チェック**

```bash
# 旧HTMLとJSXのテキストノード差分を機械チェック（日本語文字列の集合比較）
cd "/Users/takahiromiyamoto/Work/ai-solution-division/08-プロダクト/AI導入コンサル"
python3 - <<'EOF'
import re, pathlib
def texts(s):
    s = re.sub(r'<script[\s\S]*?</script>', '', s)
    s = re.sub(r'<style[\s\S]*?</style>', '', s)
    s = re.sub(r'<[^>]+>', '\n', s)
    return set(t.strip() for t in s.split('\n') if re.search(r'[ぁ-んァ-ヶ一-龠]', t))
old = texts(pathlib.Path('index.html').read_text())
new = set()
for f in pathlib.Path('src').rglob('*.tsx'):
    s = f.read_text()
    s = re.sub(r'\{[^}]*\}', '\n', s)
    s = re.sub(r'<[^>]+>', '\n', s)
    new |= set(t.strip() for t in s.split('\n') if re.search(r'[ぁ-んァ-ヶ一-龠]', t))
missing = [t for t in old - new if len(t) > 3]
print('JSX側に見つからない旧文言:', len(missing))
for t in sorted(missing)[:30]: print(' -', t)
EOF
```
Expected: `JSX側に見つからない旧文言: 0`（JSON-LD由来・改行分割由来の誤検出は目視で除外可）

- [ ] **Step 4: build → Commit**

```bash
npm run build
git add src
git commit -m "feat: 全15セクションの移植完了"
```

---

### Task 12: 静的書き出しとスクリーンショット比較（合格ゲート1）

- [ ] **Step 1: 静的ビルド + ローカル配信**

```bash
npm run build:static          # basePathなし版（比較用）
npx serve@latest out -l 3100 &
```

- [ ] **Step 2: 本番とローカルのフルページスクリーンショットを 375px / 1280px で取得・比較**

Playwright（`npx playwright screenshot` または agent-browser スキル）で以下4枚を取得:
- `http://localhost:3100/` @ 375×812, 1280×900（full page）
- `https://ai-solution-dep.github.io/ai-consulting-lp/` @ 同条件

画像を並べて目視 + 差分確認。**フォントレンダリング・余白・色・画像・セクション順が一致していること**。アニメーションの途中状態による差は `prefers-reduced-motion` をエミュレートして再取得し排除する。

- [ ] **Step 3: 差分があれば修正 → 再比較のループ**（修正のたびにコミット）
- [ ] **Step 4: 合格時点で Commit**

```bash
git add -A && git commit -m "test: 本番とのスクリーンショット比較に合格"
```

---

### Task 13: 独立レビューと動作確認（合格ゲート2）

- [ ] **Step 1: ui-reviewer サブエージェントによる独立レビュー**（Agent tool, subagent_type="ui-reviewer"）。ローカル `http://localhost:3100/` を対象に、モバイル375px含む全セクションを監査させる
- [ ] **Step 2: reduced-motion 確認** — エミュレーション有効時: reveal/パーティクル/ヒーローアニメが無効で全コンテンツ即時表示
- [ ] **Step 3: JS無効確認** — `data-reveal` が付与されないため全コンテンツが最初から表示されること（ブラウザでJS無効化 or `curl localhost:3100 | grep data-reveal` が0件であることを確認）
- [ ] **Step 4: 指摘があれば修正してゲート1から再実行。合格でCommit**

---

### Task 14: 旧ファイル削除とドキュメント更新

**Files:**
- Delete: `index.html`, `index-editorial.html`, `index-v2.html`〜`index-v5.html`, `styles.css`, `styles-editorial.css`
- Modify: `README.md`, `NOTES.md`

- [ ] **Step 1: 旧静的ファイルを削除**（git履歴に残る。`design-system/` と `screenshots/` は残す）

```bash
git rm index.html index-editorial.html index-v2.html index-v3.html index-v4.html index-v5.html styles.css styles-editorial.css
```

- [ ] **Step 2: README.md を新構成（Next.js / 開発・ビルド・デプロイ手順 / ロールバック手順）に更新。NOTES.md の Spir 手順は維持**
- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "chore: 旧静的ファイルを削除しREADMEを更新"
```

---

### Task 15: GitHub Actions デプロイと Pages 切り替え

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: deploy.yml を作成**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build:pages
      - run: touch out/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit & push**

```bash
git add .github && git commit -m "ci: GitHub Pages デプロイワークフローを追加"
git push origin main
```

- [ ] **Step 3: Pages のソースを GitHub Actions に切り替え**

```bash
gh api repos/AI-Solution-dep/ai-consulting-lp/pages -X PUT -f build_type=workflow
gh run watch --repo AI-Solution-dep/ai-consulting-lp   # ワークフロー完了を待つ
```

- [ ] **Step 4: 本番確認**

`https://ai-solution-dep.github.io/ai-consulting-lp/` をブラウザで開き、全セクション・画像・パーティクル・reveal・Spirリンクを確認。**basePath起因の画像404が無いこと**（DevTools Network で確認）。

問題があれば: `gh api repos/AI-Solution-dep/ai-consulting-lp/pages -X PUT -f build_type=legacy` + 直前コミットへ revert で旧静的サイトに復帰できる。

---

# Phase 2: デザイン技法追加（Phase 1 本番確認後に着手）

### Task 16: Tailwind utilities 用の border 互換ルール

**Files:**
- Modify: `src/app/globals.css`

preflight を読み込んでいないため、Tailwind の `border` utility（ui/Button の outline variant 等）が効くように互換ルールを追加する。

- [ ] **Step 1: globals.css の @theme 直後に追加**

```css
/* Tailwind preflight 非使用のための最小互換（border utility 用） */
@layer base {
  *, ::before, ::after {
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
  }
}
```

- [ ] **Step 2: スクリーンショット比較（Task 12 と同手順・ローカルのみ）で見た目が変わっていないことを確認 → Commit**

```bash
git commit -am "feat: Tailwind utilities 用の border 互換ルールを追加"
```

---

### Task 17: 極薄の巨大背景番号 + ホバーで赤点灯

**Files:**
- Modify: `src/components/sections/OutcomeStrip.tsx`, `src/components/sections/Program.tsx`, `src/app/globals.css`

- [ ] **Step 1: CSS を globals.css 末尾に追加**

```css
/* ===== Phase 2: 極薄の巨大背景番号（採用サイト技法⑨⑬の移入） ===== */
.editorial-lp .num-bg {
  position: absolute;
  right: -6px;
  top: -24px;
  font-family: var(--font-serif-en);
  font-weight: 700;
  font-size: clamp(64px, 9vw, 110px);
  line-height: 1;
  letter-spacing: -0.02em;
  pointer-events: none;
  user-select: none;
  color: rgba(15, 15, 16, 0.05);
  transition: color 0.5s cubic-bezier(0.16, 0.84, 0.44, 1);
}
/* 暗地（outcome-strip は ink 背景）では白系の極薄に */
.editorial-lp .outcome-strip .num-bg { color: rgba(250, 248, 245, 0.07); }
.editorial-lp .outcome-grid > article:hover .num-bg { color: rgba(200, 16, 46, 0.28); }
.editorial-lp .program-card:hover .num-bg { color: rgba(200, 16, 46, 0.12); }
.editorial-lp .outcome-grid > article,
.editorial-lp .program-card { position: relative; overflow: hidden; }
```

注意: `.outcome-strip` の背景色を実装時に確認し、**明地なら** `.outcome-strip .num-bg` の白系ルールを削除して既定（ink 0.05）を使う。

- [ ] **Step 2: OutcomeStrip の各 `<article>` 先頭に背景番号を追加**

既存の `<h3><span className="num">01</span>...` は変更せず、article 直下に追加:

```tsx
<article>
  <span className="num-bg" aria-hidden="true">01</span>
  {/* 既存の中身そのまま */}
</article>
```
（02, 03 も同様。Program のカードには Week 番号 `01`〜`04` を同じ方法で追加）

- [ ] **Step 3: ローカルで確認（ホバー点灯・モバイル375pxではみ出さないこと）→ Commit**

```bash
git commit -am "feat: OutcomeStrip / Program に極薄の巨大背景番号を追加"
```

---

### Task 18: kicker（赤い極細線 + 英大文字ラベル）

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: 現行の英ラベル要素を確認**

```bash
grep -n "section-heading\|<small" src/components/sections/*.tsx | head -20
grep -n "\.section-heading small\|\.outcome-strip h2 small" src/app/globals.css | head
```

- [ ] **Step 2: 確認した実セレクタに対して赤線ルールを追加**（下は `.section-heading small` だった場合の例。実セレクタに合わせて適用）

```css
/* ===== Phase 2: kicker 赤線（採用サイト技法⑭の移入） ===== */
.editorial-lp .section-heading small,
.editorial-lp .outcome-strip h2 small {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.editorial-lp .section-heading small::before,
.editorial-lp .outcome-strip h2 small::before {
  content: "";
  width: 24px;
  height: 1px;
  background: var(--accent-red);
  flex: none;
}
```

- [ ] **Step 3: 全セクション見出しで線が出ること・折り返し崩れがないことを確認 → Commit**

```bash
git commit -am "feat: セクション英ラベルに kicker 赤線を追加"
```

---

### Task 19: CountUp（価格数値のカウントアップ）

**Files:**
- Modify: `src/components/sections/Price.tsx`

- [ ] **Step 1: Price 見出しの `20万円〜` の数値部分を CountUp に置換**

```tsx
import CountUp from "@/components/ui/CountUp";
// <span className="nowrap">20万円〜</span> を:
<span className="nowrap"><CountUp value="20" />万円〜</span>
```

注意: CountUp は recruit 由来の client component。SSR時は最終値を出すためチラつかない。フォント・サイズは親のCSSをそのまま継承する。

- [ ] **Step 2: スクロールで Price 到達時に 0→20 のカウントが1回再生されること、reduced-motion では即 20 表示を確認 → Commit**

```bash
git commit -am "feat: 価格数値に CountUp を配線"
```

---

### Task 20: Phase 2 検証とデプロイ

- [ ] **Step 1: スクリーンショット再取得**（375px / 1280px。Phase 2 の意図的変更点【背景番号・kicker・CountUp】以外に差分がないこと）
- [ ] **Step 2: ui-reviewer サブエージェントで再監査**（Phase 2 追加要素のモバイル崩れ・コントラストを重点確認）
- [ ] **Step 3: push → Actions 完了 → 本番確認**

```bash
git push origin main
gh run watch --repo AI-Solution-dep/ai-consulting-lp
```

- [ ] **Step 4: 記憶メモリの更新**（project_ai_consulting_business.md の「LP公開状態」に Next.js 化完了・リポジトリ構成変更を追記）

---

## 自己レビュー済み事項

- 全15セクション + narrow-down + header/footer + JS3機能 + head（meta/JSON-LD/js-motion）= index.html 771行の全構成要素をタスクに割当済み（行範囲表と突合）
- 旧 reveal の `data-reveal` は実行時付与のため、JS無効時に全表示というプログレッシブ・エンハンスメント特性は移植後も同一
- Tailwind preflight 非使用の決定により Phase 1 の見た目リスクを排除。Phase 2 で border 互換ルールのみ追加（Task 16）
- フォント解決失敗時のフォールバック手順を Task 3 に明記
- ロールバック手順（Pages build_type=legacy + revert）を Task 15 に明記
