# AI導入コンサル LP

JQIT AI導入伴走支援サービスのランディングページ。  
Next.js 16 + TypeScript + Tailwind CSS v4 で実装し、GitHub Pages に公開する。

公開URL: https://ai-solution-dep.github.io/ai-consulting-lp/

---

## 技術構成

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4（@theme トークンのみ、preflight不使用） |
| フォント | next/font（Libre Bodoni / Public Sans / Noto Serif JP / Noto Sans JP / Caveat）5書体 |
| ビルド | 静的書き出し（`output: export`） |
| デプロイ先 | GitHub Pages（actions/deploy-pages） |

デザインは旧 `styles-editorial.css` のトークン・タイポグラフィを `src/app/globals.css` に継承。

---

## 開発コマンド

```bash
npm install

# 開発サーバー（http://localhost:3000）
npm run dev

# 静的ビルド — ベースパスなし（ローカル検証用）
npm run build:static
npx serve out   # out/ をローカル確認

# 静的ビルド — GitHub Pages 用（basePath=/ai-consulting-lp 付き）
npm run build:pages
```

> 環境変数のインライン記法（`BUILD_STATIC=true ...`）は macOS/Linux 専用。  
> このプロジェクトは macOS ローカル + GitHub Actions（ubuntu）のみを対象とする。

---

## デプロイ

main ブランチへ push すると GitHub Actions が自動実行する。

1. `npm run build:pages`（`basePath=/ai-consulting-lp` 付きビルド）
2. `actions/deploy-pages` で `out/` を GitHub Pages に公開

詳細は `.github/workflows/deploy.yml` を参照。

---

## ロールバック手順

Next.js 化以前の旧静的HTML版（main ブランチのルート直配信）に戻す場合:

```bash
# 1. Pages の配信ソースをブランチ直配信（main ルート）に戻す
gh api repos/AI-Solution-dep/ai-consulting-lp/pages \
  -X PUT -f build_type=legacy -f "source[branch]=main" -f "source[path]=/"

# 2. 旧静的版のファイルを履歴から復元して main に push
git checkout 53ad3f6 -- index.html styles-editorial.css assets
git commit -m "rollback: 旧静的HTML版を復元"
git push origin main
```

---

## ディレクトリ構成

```
.
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind @theme + グローバルスタイル
│   │   ├── layout.tsx        # フォント読み込み・メタデータ
│   │   └── page.tsx          # 全セクションのエントリポイント
│   ├── components/
│   │   ├── layout/           # SiteHeader / SiteFooter
│   │   ├── sections/         # 各セクション（Hero, Problem, Why … FinalCta）
│   │   └── ui/               # 汎用UIコンポーネント（Button, FadeIn, CountUp …）
│   └── lib/
│       ├── asset.ts          # basePath 対応のアセットパス解決
│       └── cn.ts             # 依存ゼロの className 結合ヘルパ
├── public/assets/            # ロゴ等の静的アセット
├── docs/superpowers/
│   ├── specs/                # 移植仕様書
│   └── plans/                # 実装計画
├── design-system/            # デザイントークン・スタイルガイド資料
└── screenshots/              # UI監査用スクリーンショット
```

---

## 旧静的HTML版について

旧静的HTML版（`index.html` / `styles-editorial.css` 等）は git 履歴（コミット `3f38cfc` 以前）を参照。

---

## 運用ノート

Spir 予約リンク設定や残対応タスクは `NOTES.md` を参照。
