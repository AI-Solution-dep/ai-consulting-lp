export default function Price() {
  return (
    <section className="section section--paper" id="price" aria-labelledby="price-title">
      <div className="container">
        <span className="section-num">07 — Price</span>
        <div className="price-headline">
          <div>
            <h2 id="price-title">一か月導入パック<br /><span className="accent">初回限定<span className="nowrap">20万円〜</span></span>。</h2>
            <p>通常30万円〜のライト導入を、サービス開始記念の限定価格で提供します。まずは対象テーマを1〜3つに絞り、現場で試せる自動化と運用ルールを作ります。</p>
          </div>
          <article className="price-card" aria-label="価格">
            <span className="price-card__label">初回限定 / 一か月導入 / 税別</span>
            <span className="price-card__original">通常 ¥300,000〜</span>
            <strong className="price-card__amount">¥200,000<small>〜</small></strong>
            <p className="price-card__meta">一か月 / 週1回60分×4回 / チャット・メール質疑 / 対象テーマ1つ</p>
            <small className="price-card__note">初回限定プランは、1テーマ・PCの中で完結する業務が対象です。複数アプリをまたぐ自動化は、下記の標準・拡張プランでご案内します。</small>
          </article>
        </div>
        <div className="price-details">
          <article>
            <h3>ライト 通常 ¥300,000〜</h3>
            <p>初回限定と同じ内容の通常価格です。1テーマの業務棚卸しから実装、運用ルール整備、AI導入ロードマップ作成までを含みます。</p>
          </article>
          <article>
            <h3>標準・拡張 <span className="keep-together">¥500,000〜¥800,000</span></h3>
            <p>2〜3テーマ、kintone / freee / チャット通知など複数アプリをまたぐ設計。権限、ログ、承認フローも整理します。</p>
          </article>
        </div>
        <p className="price-details__note">別途必要なもの: AIツール利用料、外部ツール利用料、追加テーマ、期間延長、大規模なシステム開発は別途お見積りします。</p>
      </div>
    </section>
  );
}
