export default function Program() {
  return (
    <section className="section section--paper" id="program" aria-labelledby="program-title">
      <div className="container">
        <span className="section-num">05 — Program</span>
        <div className="section-heading">
          <h2 id="program-title">一か月導入パックの内容</h2>
          <p>週1回の定例とチャット/メール質疑で、対象テーマを実務で試せる自動化に落とし込みます。</p>
        </div>
        <div className="program-grid">
          <article className="program-card">
            <span className="num-bg" aria-hidden="true">01</span>
            <span className="program-card__tag">Scope</span>
            <h3>対象テーマ1〜3つ</h3>
            <p>業務ヒアリングで、一か月で効果を確認しやすい範囲に絞り込みます。</p>
          </article>
          <article className="program-card">
            <span className="num-bg" aria-hidden="true">02</span>
            <span className="program-card__tag">Session</span>
            <h3>週1回60分×4回</h3>
            <p>棚卸し、設計、実装レビュー、運用整理を定例の中で進めます。</p>
          </article>
          <article className="program-card">
            <span className="num-bg" aria-hidden="true">03</span>
            <span className="program-card__tag">Support</span>
            <h3>チャット/メール質疑</h3>
            <p>営業日対応で、定例の間に出た疑問や判断に迷う点へ回答します。</p>
          </article>
          <article className="program-card">
            <span className="num-bg" aria-hidden="true">04</span>
            <span className="program-card__tag">Asset</span>
            <h3>スキルとひな形の資産化</h3>
            <p>貴社の業務をエージェントスキルとして整備し、必要に応じてGAS（Googleのアプリを自動で動かす仕組み）などのスクリプトと合わせて、貴社で管理可能な形で納品します。</p>
          </article>
        </div>
        <div className="timeline">
          <div><span>Week 01</span><strong>業務棚卸し</strong><p>使っているアプリ、権限、手作業、削減したい工数を整理。</p></div>
          <div><span>Week 02</span><strong>自動化設計</strong><p>AIに任せる範囲、人が確認する範囲、自動化の実装範囲を決定。</p></div>
          <div><span>Week 03</span><strong>実装伴走</strong><p>AIエージェントを使って、自動化のひな形と手順書を作成、レビュー。</p></div>
          <div><span>Week 04</span><strong>運用・引き継ぎ</strong><p>ログ、承認、例外対応の整理。マニュアル整備方法の引き継ぎと、次にAI化する業務の計画。</p></div>
        </div>
      </div>
    </section>
  );
}
