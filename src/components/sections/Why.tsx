export default function Why() {
  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="container">
        <span className="section-num">01 — Why JQIT</span>
        <div className="section-heading">
          <h2 id="why-title">「自動化まで届く伴走」ができる理由</h2>
          <p>私たち自身が、同じ手作業を減らしてきました。だから、現場で動く自動化を一緒に作れます。</p>
        </div>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-card__num" aria-hidden="true">01</span>
            <h3>自社で<span className="marker">運用中の手法</span>を持ち込みます</h3>
            <p>開発・人事・総務・営業・経営管理で、私たち自身が同じ手法を運用中。プロンプトだけでなく、スクリプト、連携、確認フローまで具体的に渡します。</p>
          </article>
          <article className="why-card">
            <span className="why-card__num" aria-hidden="true">02</span>
            <h3>いまのアプリを活かして始めます</h3>
            <p>いまある道具をそのまま使います。新しい大規模システムの導入は前提にしません。</p>
          </article>
          <article className="why-card">
            <span className="why-card__num" aria-hidden="true">03</span>
            <h3>人の承認を前提に安全に始めます</h3>
            <p>登録、送信、会計処理、顧客対応などの重要操作は、いきなり全自動にしません。AIの下書きと人の確認を分け、安心して広げられる形にします。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
