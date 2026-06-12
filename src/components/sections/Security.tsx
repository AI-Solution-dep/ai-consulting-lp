export default function Security() {
  return (
    <section className="section section--paper" id="security" aria-labelledby="security-title">
      <div className="container">
        <span className="section-num">09 — Security</span>
        <div className="section-heading">
          <h2 id="security-title">勝手に送信・登録しない。<br /><span className="keep-together">人が確認できるAI自動化</span>。</h2>
          <p>見積書、請求書、議事録、顧客情報——大事なデータを扱うからこそ、便利さより先に権限・ログ・承認の設計を置きます。</p>
        </div>
        <div className="security-grid">
          <article>
            <span>01</span>
            <h3>最小権限</h3>
            <p>対象フォルダ、対象アプリ、対象レコードを絞り、必要以上の権限を持たせません。</p>
          </article>
          <article>
            <span>02</span>
            <h3>人の承認</h3>
            <p>送信、登録、会計処理などの重要操作は、AIの下書き後に人が確認する前提で設計します。</p>
          </article>
          <article>
            <span>03</span>
            <h3>ログと例外対応</h3>
            <p>いつ、何を、どの情報から作成したかを追える形にし、失敗時の戻し方も整理します。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
