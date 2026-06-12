import { asset } from "@/lib/asset";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <img src={asset("/assets/logo.png")} alt="株式会社JQIT" className="site-footer__logo" />
            <p className="site-footer__tagline">技術の力で、お客様の本質的な課題を解決する<br />ITのプロフェッショナル集団。</p>
          </div>
          <dl className="site-footer__info">
            <div><dt>会社名</dt><dd>株式会社JQIT</dd></div>
            <div><dt>代表者</dt><dd>代表取締役社長 山田 周作</dd></div>
            <div><dt>所在地</dt><dd>〒150-0002 東京都渋谷区渋谷1-12-2<br />クロスオフィス渋谷609</dd></div>
            <div><dt>電話</dt><dd><a href="tel:0364335383">03-6433-5383</a></dd></div>
            <div><dt>事業</dt><dd>ITソリューション / AIソリューション</dd></div>
          </dl>
          <div className="site-footer__social">
            <span>Follow</span>
            <a href="https://twitter.com/jqit202412" aria-label="X (Twitter)">X</a>
            <a href="https://www.instagram.com/jqit202412" aria-label="Instagram">Instagram</a>
          </div>
        </div>
        <p className="site-footer__copy">© 2026 株式会社JQIT. All rights reserved.</p>
      </div>
    </footer>
  );
}
