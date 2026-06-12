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
