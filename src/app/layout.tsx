import type { Metadata } from "next";
import { Public_Sans, Noto_Serif_JP, Noto_Sans_JP, Caveat } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://ai-solution-dep.github.io/ai-consulting-lp"),
  title: "AI業務自動化支援｜資料作成・データ整理・書類チェックを一か月で自動化 | JQIT",
  description:
    "議事録、報告書づくり、データ集計、書類チェック——PCの中で完結する毎日の手作業を、一か月で「動く自動化」に変える導入支援。効果が見えたら kintone・freee など業務アプリ連携へ広げます。",
  openGraph: {
    title: "AI業務自動化支援｜JQIT",
    description:
      "資料作成・データ整理・書類チェックなど、PCで完結する手作業から一か月で自動化。効果が見えたら業務アプリ連携へ。",
    type: "website",
    images: ["https://ai-solution-dep.github.io/ai-consulting-lp/assets/generated/10-og.png"],
  },
  twitter: { card: "summary_large_image" },
};

const JSON_LD_SERVICE = `
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI業務自動化支援",
    "provider": {
      "@type": "Organization",
      "name": "株式会社JQIT",
      "url": "https://jqit.co.jp",
      "telephone": "+81-3-6433-5383",
      "address": {
        "@type": "PostalAddress",
        "postalCode": "150-0002",
        "addressRegion": "東京都",
        "addressLocality": "渋谷区",
        "streetAddress": "渋谷1-12-2 クロスオフィス渋谷609",
        "addressCountry": "JP"
      },
      "sameAs": [
        "https://twitter.com/jqit202412",
        "https://www.instagram.com/jqit202412"
      ]
    },
    "description": "議事録、報告書づくり、データ集計、書類チェックなど、PCの中で完結する毎日の手作業をAIで自動化する一か月導入支援。効果が見えたら Google Workspace、kintone、freee など業務アプリ連携へ広げます。",
    "areaServed": "JP",
    "offers": [
      {"@type": "Offer", "name": "一か月導入パック（初回限定）", "price": "200000", "priceCurrency": "JPY", "description": "一か月、PCで完結する1テーマの自動化実装と運用ルール整備"},
      {"@type": "Offer", "name": "一か月導入パック（通常）", "price": "300000", "priceCurrency": "JPY", "description": "一か月、1テーマの自動化実装支援。複数テーマやアプリ連携は標準・拡張プランで対応"}
    ]
  }
  `;

const JSON_LD_FAQ = `
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "kintoneやfreeeの運用が整理されていなくても相談できますか？", "acceptedAnswer": {"@type": "Answer", "text": "はい。まずは利用中のアプリ、権限、現場の手作業を確認します。最初はPCの中で完結する業務からテーマを選ぶため、特定アプリの高度な開発や連携を前提にしません。"}},
      {"@type": "Question", "name": "ITリテラシーが高くない社員でも回せますか？", "acceptedAnswer": {"@type": "Answer", "text": "はい。現場担当者には完成した手順と確認ポイントを渡し、技術的な詳細を意識しなくても運用できる形にします。"}},
      {"@type": "Question", "name": "一か月で終わらせず、その後も支援してもらえますか？", "acceptedAnswer": {"@type": "Answer", "text": "はい。一か月導入後、月次顧問契約（月20万〜50万円）で追加テーマ、横展開、改善、社内定着を支援します。"}},
      {"@type": "Question", "name": "オンラインだけで進められますか？", "acceptedAnswer": {"@type": "Answer", "text": "はい。週1回60分のオンライン定例とチャット/メール質疑で完結します。対面ご希望の場合は別途ご相談ください。"}},
      {"@type": "Question", "name": "業務ヒアリングの前に準備するものはありますか？", "acceptedAnswer": {"@type": "Answer", "text": "最初は使っているSaaSと減らしたい手作業だけで大丈夫です。テーマが未定でも、ヒアリングの中で一緒に見つけます。"}}
    ]
  }
  `;

// index.html L15-19 と同一（reduced-motion でなければ js-motion を付与）
const motionScript = `if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion');}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${publicSans.variable} ${notoSerifJP.variable} ${notoSansJP.variable} ${caveat.variable}`}
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
