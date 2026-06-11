# 設計書: AI導入コンサルLP の Next.js + TypeScript 化

- 日付: 2026-06-12
- ステータス: 承認済み
- 対象リポジトリ: `AI-Solution-dep/ai-consulting-lp`（ローカル: `08-プロダクト/AI導入コンサル/`）
- 移植元: JQIT採用サイト `~/DEV/01.Company/recruitment_lp/`（Next.js 16.2.9 + React 19.2.4 + Tailwind v4 + TS5）
- 参考資料: 採用サイトデザインシステム設計書（designsystem.md）

## 1. 目的

静的HTML/CSS/JSのLPを採用サイトと同スタックに書き換え、デザインシステム部品
（`ui/` 7部品 + `lib/`）を共有基盤として取り込む。

### 確定済みの意思決定

| 論点 | 決定 |
|---|---|
| 共有方式 | **コピー移植**（vendoring）。パッケージ化・モノレポはしない |
| スコープ | **2フェーズ**: Phase 1 = 1:1移植 → 合格後 Phase 2 = デザイン技法追加 |
| 構造 | **ミニマル移植**。content.ts/JSON分離はせず、文言はコンポーネント内に逐語コピー |
| デプロイ | GitHub Pages 継続、公開URL不変（`https://ai-solution-dep.github.io/ai-consulting-lp/`） |
| ブランド | LPの赤 `#C8102E`・金 `#B08D57`・フォント5書体は維持（採用サイトの `#e60012` に揃えない） |

## 2. Phase 1: 1:1移植

### 2.1 成功基準

- 見た目・文言・写真・モーションが現行LP（QA済み・2026-06-11公開版）と視覚的に同一
- 公開URL不変、JSON-LD・OGP・メタデータ維持
- reduced-motion / JS無効時のフォールバック維持
- スクリーンショット比較（375px / 1280px、全15セクション）+ ui-reviewer 独立レビューに合格

### 2.2 ディレクトリ構成

```
ai-consulting-lp/
├── .github/workflows/deploy.yml   … push to main → build → actions/deploy-pages
├── next.config.ts                 … output: "export", basePath: "/ai-consulting-lp"
├── src/app/
│   ├── layout.tsx                 … next/font 5書体 + metadata + JSON-LD
│   ├── page.tsx                   … 15セクションを順に配置
│   └── globals.css                … @theme トークン + LP固有モーションCSS
├── src/components/
│   ├── ui/                        … 採用サイト7部品をそのままコピー
│   │     Button / Container / SectionHead / FadeIn / CountUp / GeoBackdrop / GeoMark
│   ├── sections/                  … LP 15セクション + HeroParticles
│   │     Hero / Problem / OutcomeStrip / Why / Comparison（AI研修との違い）/ Saas /
│   │     Stories / MidCta / Program / Deliverables / Price / NextStep /
│   │     Security / Faq / FinalCta
│   └── layout/                    … Header / Footer
├── src/lib/                       … cn.ts / asset.ts（採用サイトからコピー）
└── public/assets/                 … 現行 assets/ の画像を移動
```

### 2.3 デザイントークン（globals.css @theme）

採用サイトの `globals.css` をベースに以下へ差し替える。

| トークン | 値 | 由来（現行CSS変数） |
|---|---|---|
| `--color-brand` | `#C8102E` | `--accent-red` |
| `--color-gold` | `#B08D57` | `--accent-gold` |
| `--color-ink` | `#0F0F10` | `--ink` |
| `--color-paper` | `#FAF8F5` | `--paper` |
| `--color-paper-warm` | `#F2EDE4` | `--paper-warm` |

文字階層・罫線色など現行 `styles-editorial.css` の他のCSS変数も @theme に吸い上げる。
共通イージング `cubic-bezier(0.16, 0.84, 0.44, 1)` を採用サイトから持ち込む。

### 2.4 フォント

現行のCSS `@import`（Google Fonts）を `next/font/google` に置換する。

| 書体 | weight | preload |
|---|---|---|
| Libre Bodoni | 400/500/600/700 + italic | true（英字ディスプレイは即時必要） |
| Public Sans | 300–700 | true |
| Noto Serif JP | 400–900 | false（和文巨大プリロード回避） |
| Noto Sans JP | 300–900 | false |
| Caveat | 500/600/700 | true |

⚠️ 設計書の落とし穴④（turbopack のフォント在庫に無い書体は500エラー）があるため、
**最初のビルドでフォント解決を最優先で検証**する。

### 2.5 モーション移植マッピング

| 現行実装 | 移植先 |
|---|---|
| hero-wipe / hero-rise / hero-img-zoom / header-drop（@keyframes） | globals.css にCSSごと移植 |
| underline-draw（マーカースイープ） | globals.css に移植 |
| スクロールリビール（インラインJS + IO） | **採用サイト `FadeIn` に置換**（IO + reduced-motion検知 + 1.2sフォールバック） |
| ヒーローパーティクル（インラインJS canvas） | `HeroParticles.tsx` としてReact化（現行ロジックを忠実移植、LP配色維持） |
| reduced-motion ガード | CSS `@media` + JS `matchMedia` の両方を維持 |

### 2.6 デプロイ

- `output: "export"` + `basePath: "/ai-consulting-lp"`。画像パスは `lib/asset.ts` ヘルパで統一
- `.nojekyll` を out/ に含める
- GitHub Actions: push to main → `next build` → `actions/upload-pages-artifact` → `actions/deploy-pages`
- Pages ソースを「ブランチ直配信」→「GitHub Actions」へ1回だけ切り替え（`gh api` で実行）
- ロールバック: 直前コミットへ revert + Pages ソースを戻せば旧静的サイトに復帰可能

### 2.7 旧ファイルの扱い

- `index.html` / `index-editorial.html` / `index-v2〜v5.html` / `styles*.css` は削除（git履歴に残る）
- `assets/` の画像は `public/assets/` へ移動
- `README.md` / `NOTES.md` は新構成に合わせて更新

## 3. Phase 2: デザイン技法追加（Phase 1 合格後）

採用サイトデザインシステムから移入。優先順:

1. **極薄の巨大背景番号 + ホバーで赤点灯** — OutcomeStrip（01-03）/ Program（Week 01-04）。
   Libre Bodoni ディスプレイ数字、`opacity 0.05` → hover で薄赤
2. **kicker（赤24px極細線 + 英大文字ラベル）** — 既存の `<small>` 英ラベルに `::before` の赤線を追加
3. **CountUp** — 「6部署」「106名」等の数値。ui/ にコピー済みの部品を配線
4. **罫線グリッド（1px gap）/ reveal-mask（見出し行せり上げ）** — 効果を見て判断

**使わないもの**: GeoMark / GeoBackdrop（LPの「AIっぽさ排除・手書き感」方針と衝突。
部品としては ui/ に保持し、削除はしない）

## 4. やらないこと（YAGNI）

- 共有npmパッケージ化・モノレポ化
- content.ts / JSON へのコンテンツ分離
- ネイティブフォーム（CTAは Spir 外部リンクのまま）
- Vercel 移行・独自ドメイン
- 採用サイト側リポジトリへの変更

## 5. リスクと対策

| リスク | 対策 |
|---|---|
| turbopack フォント在庫に無い書体で500 | 最初のビルドで5書体の解決を検証。代替: CSS @import 継続 |
| Pages ソース切り替えの瞬断（数分） | 実害軽微。revert 手順を README に明記 |
| basePath 付与漏れで画像404 | asset.ts ヘルパ経由に統一、スクリーンショット比較で検出 |
| 移植時の文言改変事故 | index.html から逐語コピー。diff レビューで文言変更ゼロを確認 |
