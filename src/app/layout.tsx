import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="editorial-lp">{children}</body>
    </html>
  );
}
