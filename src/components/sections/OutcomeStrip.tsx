export default function OutcomeStrip() {
  return (
    <section className="outcome-strip" aria-labelledby="outcome-title">
      <div className="outcome-strip__inner">
        <h2 id="outcome-title">
          <small>What You Get</small>
          一か月後、<br />貴社に残るもの
        </h2>
        <div className="outcome-grid">
          <article>
            <span className="num-bg" aria-hidden="true">01</span>
            <h3><span className="num" aria-hidden="true">01</span>貴社専用の「AIの仕事の型」</h3>
            <p>貴社の業務手順・判断基準を、AIがそのまま実行できる「仕事の教え方」として納品します（技術的には、エージェントスキルと呼ばれる形式です）。汎用ツールではない、貴社だけの資産です。</p>
          </article>
          <article>
            <span className="num-bg" aria-hidden="true">02</span>
            <h3><span className="num" aria-hidden="true">02</span>AI活用を内製化する力</h3>
            <p>業務マニュアルをAI向けに整備する方法を、担当者に直接引き継ぎます。私たちがいなくても新しい業務をAIに教えられる、社外に依存しない体制を残します。</p>
          </article>
          <article>
            <span className="num-bg" aria-hidden="true">03</span>
            <h3><span className="num" aria-hidden="true">03</span>次に広げるためのロードマップ</h3>
            <p>どの業務を、どの順番でAI化するかの計画書。2件目以降は、社内で進められます。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
