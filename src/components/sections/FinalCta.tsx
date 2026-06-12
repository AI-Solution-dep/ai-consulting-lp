export default function FinalCta() {
  return (
    <section className="cta" id="cta" aria-labelledby="cta-title">
      <div className="container">
        <p className="cta__eyebrow">— Contact —</p>
        <h2 id="cta-title">30分で、<br /><span className="keep-together">自動化候補を3つ整理</span>。</h2>
        <p>いま使っているアプリと、減らしたい手作業を一緒に整理します。対象テーマが未定でも、業務名だけで相談できます。<small>30分・オンライン・準備物なし／営業電話・しつこいフォローはありません。</small></p>
        <ul className="cta-checklist" aria-label="無料相談で整理すること">
          <li>使っているアプリと手作業の棚卸し</li>
          <li>一か月で試せる自動化候補</li>
          <li>人の承認が必要な操作範囲</li>
        </ul>
        <a className="button button--primary" href="https://app.spirinc.com/t/qRgOv_0Sv6TwRrSmRqVmf/as/-zbXeo9kkaLolpsRibQ5j/confirm">無料相談を予約する</a>
        <p className="cta__tel">またはお電話で：<a href="tel:0364335383">03-6433-5383</a>（平日 10:00-18:00）</p>
      </div>
    </section>
  );
}
