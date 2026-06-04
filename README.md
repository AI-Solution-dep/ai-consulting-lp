# AI導入コンサル / AI実装伴走 LP

> 管理場所: `08-プロダクト/AI導入コンサル`
> 移管日: 2026-06-03
> 移管元: `/Users/takahiromiyamoto/Documents/New project 2/ai-training-lp/`

このフォルダを、AI導入コンサル / AI実装伴走LPの管理場所とする。

## 現行ファイル

| ファイル | 位置づけ |
|---|---|
| `index-v5.html` | `NOTES.md` 上の現行版。CTAをSpir予約URLに置換して使う想定 |
| `index-editorial.html` | 最終更新が一番新しい編集版。見せ方・コピー確認用 |
| `index.html` | 初版。業務改善伴走支援寄りの汎用版 |
| `styles.css` | `index.html` / `index-v2.html` 〜 `index-v5.html` 用 |
| `styles-editorial.css` | `index-editorial.html` 用 |
| `NOTES.md` | バージョン履歴、Spir設定、残対応 |

公開前は、`index-v5.html` と `index-editorial.html` を見比べ、採用版を `index.html` に差し替える。

---

# 業務改善伴走支援サービスページ

JQITのHPに掲載する汎用的な新規サービスページです。非IT企業、中小企業、バックオフィス、営業、CS、制作、管理部門などに向けて、1か月で対象テーマを1つに絞り、手順化・テンプレート化・運用整理まで伴走する内容にしています。価格は初回限定200,000円（税別）、通常価格300,000円（税別）です。

## 単体リンク方法

このページは `index.html`、`styles.css`、`assets/logo.png` で表示できます。ロゴ以外の画像は現在のHTMLでは表示していません。

単体で確認する場合は、以下をブラウザで開きます。

```text
ai-training-lp/index.html
```

Webサイト内からリンクする場合は、LPディレクトリへの相対パスまたは公開URLを指定してください。

```html
<a href="/ai-training-lp/">業務改善伴走支援を見る</a>
```

## iframe利用時の注意

iframeで埋め込む場合は、親ページ側で十分な高さを確保してください。ページ内はレスポンシブ対応していますが、iframeの高さが不足するとセクション下部やCTAが見切れます。

```html
<iframe src="/ai-training-lp/" title="業務改善伴走支援" style="width:100%; min-height:900px; border:0;"></iframe>
```

親サイト側で `overflow: hidden` を指定しているコンテナに入れる場合は、モバイル時の縦スクロールが阻害されないか確認してください。

## section移植時の注意

セクション単位で他ページへ移植する場合は、必ず `.ai-training-lp` ラッパー配下に配置してください。CSSは `.ai-training-lp` をスコープとしているため、ラッパーがないとスタイルが適用されません。

```html
<div class="ai-training-lp">
  <!-- 移植したsectionをここに配置 -->
</div>
```

JQIT本体サイトへ一部セクションだけを移植する場合は、`#program`、`#deliverables`、`#price`、`#cta` を優先するとサービス概要、成果物、価格、問い合わせ導線を最小構成で載せられます。

## CTAリンク差し替え場所

暫定CTAは以下の `mailto` に統一しています。

```text
mailto:info@jqit.co.jp?subject=業務改善伴走支援の無料ヒアリング相談
```

差し替える場合は `index.html` 内の上記文字列を検索し、問い合わせフォームURLなどに置換してください。主な差し替え対象は、ナビの「相談する」、ヒーローの「無料ヒアリングを相談する」、最下部CTAの「業務改善テーマを相談する」です。
