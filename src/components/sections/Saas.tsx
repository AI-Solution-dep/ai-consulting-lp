export default function Saas() {
  return (
    <section className="section" id="saas" aria-labelledby="saas-title">
      <div className="container">
        <span className="section-num">04 — App Coverage</span>
        <div className="section-heading">
          <h2 id="saas-title">効果が見えたら、<br /><span className="marker keep-together">ここまで広げられます</span></h2>
          <p>最初の一か月は、PCの中で完結するテーマから始めます。効果が確認できたら、Google Workspace、kintone、freee など、いま使っている業務アプリをまたぐ自動化へ段階的に広げます。</p>
        </div>
        <div className="saas-grid">
          <article className="saas-card saas-card--primary">
            <span>Core</span>
            <h3>Google Workspace</h3>
            <p>Gmail、Sheets、Drive、Docs、Calendar、Forms、Apps Script。最初の自動化基盤として最有力。</p>
          </article>
          <article className="saas-card">
            <span>Database</span>
            <h3>kintone</h3>
            <p>案件、顧客、申請、台帳管理。レコード登録、更新通知、集計、帳票下書きと相性が良い領域。</p>
          </article>
          <article className="saas-card">
            <span>Accounting</span>
            <h3>freee / Misoca / board</h3>
            <p>請求、見積、会計まわり。自動確定ではなく、下書き作成と人の承認から始めます。</p>
          </article>
          <article className="saas-card">
            <span>Chat</span>
            <h3><span className="keep-together">LINE WORKS / Chatwork</span> / Slack</h3>
            <p>通知、承認依頼、作業完了報告。現場が普段見る場所にAIの結果を届けます。</p>
          </article>
          <article className="saas-card">
            <span>Commerce</span>
            <h3>Shopify / BASE / STORES</h3>
            <p>注文、在庫、顧客対応、商品説明の下書き。EC運営の繰り返し作業を候補にします。</p>
          </article>
          <article className="saas-card">
            <span>CRM / HR</span>
            <h3><span className="keep-together">HubSpot / Salesforce</span> / <span className="keep-together">SmartHR / Sansan</span></h3>
            <p>顧客、名刺、人事情報。権限と情報管理を確認しながら、連携可能な範囲から検証します。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
