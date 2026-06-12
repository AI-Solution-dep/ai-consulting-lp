import { asset } from "@/lib/asset";

export default function Stories() {
  return (
    <section className="section section--paper" id="stories" aria-labelledby="stories-title">
      <div className="container">
        <span className="section-num">04 — Use Cases</span>
        <div className="section-heading">
          <h2 id="stories-title">最初に効果が出やすい<br />自動化テーマ<span className="marker">5選</span></h2>
          <p>チャットボット単体より、工数削減が見えやすいテーマを優先します。小さな成功を作ってから、他の業務へ横展開します。</p>
        </div>
        <div className="stories-grid">
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/02-skill-library.png")} alt="積み上がった帳票に付箋を貼りながら整理する担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 01</span>
              <h3>Google Sheets起点の<br />転記・集計自動化</h3>
              <p>フォーム、スプレッドシート、メール、Drive上の資料をつなぎ、集計・整形・共有までの手作業をGASとAIで減らします。</p>
              <p className="story__impact">Before: 毎回手で整形 → After: 下書きと共有文を自動生成</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/03-management.png")} alt="請求書や試算表を手作業で確認している経理担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 02</span>
              <h3>見積・請求・会計の<br />下書き作成</h3>
              <p>freee、Misoca、board などの情報を確認しながら、見積・請求・仕訳候補の下書きを作成。確定前に人が承認します。</p>
              <p className="story__impact">Before: 月末に確認が集中 → After: 不備候補を先に一覧化</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/04-matching.png")} alt="ガラスボードに付箋を貼りながら案件・台帳情報を整理する担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 03</span>
              <h3>kintone台帳の<br />登録・更新・通知</h3>
              <p>案件、顧客、申請、在庫などの台帳に対して、入力補助、重複確認、ステータス更新、チャット通知を設計します。</p>
              <p className="story__impact">Before: 更新漏れを人が確認 → After: 期限・差分を自動通知</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/05-evaluation.png")} alt="スマートフォンの通知を確認しながら書類の承認を進める担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 04</span>
              <h3>LINE WORKS / Chatwork<br />通知・承認フロー</h3>
              <p>レコード更新、期限超過、問い合わせ、承認待ちを普段使うチャットに通知。AIの下書きと人の承認を分けます。</p>
              <p className="story__impact">Before: 確認依頼が口頭化 → After: 承認待ちをチャットに集約</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/06-meeting-knowledge.png")} alt="ECの出荷作業で商品を梱包する担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 05</span>
              <h3>EC・問い合わせ対応の<br />下書き支援</h3>
              <p>Shopify、BASE、STORES、LINE公式などの情報をもとに、商品説明、返信案、出荷確認の下書きを作ります。</p>
              <p className="story__impact">Before: 返信文を都度作成 → After: 文脈つき返信案を提示</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
