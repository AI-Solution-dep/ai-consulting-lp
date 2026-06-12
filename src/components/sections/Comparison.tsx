export default function Comparison() {
  return (
    <section className="section section--paper" aria-labelledby="comparison-title">
      <div className="container">
        <span className="section-num">02 — Comparison</span>
        <div className="section-heading">
          <h2 id="comparison-title"><span className="keep-together">AI研修</span>との違い</h2>
          <p>知識のインプットや単発のQAボットではなく、毎日発生している転記・集計・通知・下書き作成を減らすことをゴールにしています。</p>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">比較軸</th>
                <th scope="col">AI研修・QAボット導入</th>
                <th scope="col">JQIT 業務自動化支援</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">ゴール</th><td data-label="AI研修・QAボット導入">AIの理解、問い合わせ対応、ナレッジ検索。</td><td data-label="JQIT 業務自動化支援">一か月で手作業を1つ以上減らし、運用に乗せる。</td></tr>
              <tr><th scope="row">対象業務</th><td data-label="AI研修・QAボット導入">汎用的な文章作成・要約・社内FAQが中心。</td><td data-label="JQIT 業務自動化支援">Google Workspace、kintone、freee などをまたぐ具体業務。</td></tr>
              <tr><th scope="row">成果物</th><td data-label="AI研修・QAボット導入">説明資料、プロンプト例、QAデータ。</td><td data-label="JQIT 業務自動化支援">貴社専用のエージェントスキル、GAS/API連携、運用ルール、AI導入ロードマップ。</td></tr>
              <tr><th scope="row">効果の見え方</th><td data-label="AI研修・QAボット導入">便利だが、削減工数が見えづらいことがある。</td><td data-label="JQIT 業務自動化支援">転記件数、作成時間、確認漏れ、通知遅れなどで測定しやすい。</td></tr>
              <tr><th scope="row">支援の立場</th><td data-label="AI研修・QAボット導入">講師・ツール導入支援。</td><td data-label="JQIT 業務自動化支援">経営者・現場と並走する自動化パートナー。</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
