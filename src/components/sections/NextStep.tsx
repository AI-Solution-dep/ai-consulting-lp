export default function NextStep() {
  return (
    <section className="section" id="next" aria-labelledby="next-title">
      <div className="container">
        <span className="section-num">08 — Next Step</span>
        <div className="section-heading">
          <h2 id="next-title">小さく始めて、<br />効果が見えた業務から広げます</h2>
          <p>最初から大きなDX構想にしません。1つの手作業を減らし、削減工数と現場の反応を見て、次の自動化テーマへ進みます。</p>
        </div>
        <div className="layers">
          <article className="layer-card">
            <span className="layer-card__num">Layer 01</span>
            <h3>一か月導入パック</h3>
            <ul>
              <li>1〜3テーマでの自動化検証</li>
              <li>エージェントスキルとGAS/API連携ひな形</li>
              <li>運用ルールとAI導入ロードマップ</li>
              <li>¥300,000〜800,000</li>
            </ul>
          </article>
          <article className="layer-card layer-card--featured">
            <span className="layer-card__num">Layer 02</span>
            <h3>月次顧問契約</h3>
            <ul>
              <li>継続的改善と追加テーマ実装</li>
              <li>部門横展開の伴走</li>
              <li>権限、ログ、承認フローの整備</li>
              <li>月 ¥200,000〜500,000</li>
            </ul>
          </article>
          <article className="layer-card layer-card--final">
            <span className="layer-card__num">Layer 03</span>
            <h3><span className="keep-together">AI業務自動化パートナー</span><small>Embedded AI Automation Partner</small></h3>
            <ul>
              <li>経営会議・業務改善会議への関与</li>
              <li>AI投資判断、ガバナンス設計</li>
              <li>社内自動化人材の育成</li>
              <li>別途お見積り</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
