# LP運用ノート

## ファイル履歴

旧静的HTML版（index.html 〜 index-v5.html）は git 履歴（コミット `3f38cfc` 以前）を参照。  
現在の実装は Next.js（`src/` 以下）に移行済み。

| 旧バージョン | 概要 |
|---|---|
| index.html | 初版（業務改善伴走支援、D2C寄り） |
| index-v2.html | AI実装伴走プログラム初版（自社6部署を前面に） |
| index-v3.html | レビュー反映：自社主張後退・Tools/Operations削除・FAQ追加・Layer階段強化 |
| index-v4.html | 再レビュー反映：Hero copy改善・Why JQIT 第1カードに自社実証ファクト復活・JSON-LD整合 |
| index-v5.html | 最終静的版。CTAをSpirのカレンダー予約に置換済み |

## Spir設定手順（要対応）

### 1. Spirアカウント作成
https://www.spirinc.com/ でアカウント作成（既存なら飛ばす）

### 2. Googleカレンダー連携
Spir設定画面でGoogleカレンダー連携

### 3. 予約イベント作成

| 項目 | 設定値 |
|---|---|
| イベント名 | AI実装伴走プログラム 無料ヒアリング |
| 所要時間 | 30分 |
| 形式 | オンライン（Google Meet / Zoom） |
| 受付時間帯 | 平日10:00-18:00（要相談） |
| バッファ | 前後15分 |
| 通知 | 予約時にGmail通知 |

### 4. 事前アンケート項目（Spirの「予約時の質問」機能で設定）

| # | 質問 | 必須 | 形式 |
|---|---|---|---|
| 1 | 会社名 | 必須 | テキスト |
| 2 | お名前 | 必須 | テキスト |
| 3 | メールアドレス | 必須 | メール（Spir自動収集） |
| 4 | 業種 | 任意 | 選択肢（建設/物流/製造/卸/IT/サービス/その他） |
| 5 | 会社規模 | 任意 | 選択肢（〜50名/50-200名/200-1000名/1000名+） |
| 6 | 相談したいテーマ | 任意 | 自由記述 |

### 5. 公開URL取得

例：`https://app.spirinc.com/t/xxxxxx` のような形式のURLが発行される

### 6. LPに反映

Spir URLは Next.js 移植済み。CTAボタンのリンクは以下のコンポーネントで管理している。

| 配置場所 | コンポーネント |
|---|---|
| nav「相談する」 | `src/components/layout/SiteHeader.tsx` |
| hero CTA | `src/components/sections/Hero.tsx` |
| 中間CTA | `src/components/sections/MidCta.tsx` |
| ラストCTA | `src/components/sections/FinalCta.tsx` |

URLを変更する場合は上記コンポーネント内の `href` を更新する。

## 残対応（B群オプション）

| 項目 | 内容 |
|---|---|
| 担当者の顔・経歴 | 経営者向けに「誰が来るのか」をWhy JQITに追加 |
| セキュリティFAQ | 顧客情報の扱い、Claude Team契約等のQAを追加 |
| 数値ファクト | 自社6部署の定量効果が出たら、Why JQIT直下に実績ストリップ追加 |
| 業種別ページ | 実績が積み上がってきたら、建設業向け/物流業向けの個別LPを追加 |
