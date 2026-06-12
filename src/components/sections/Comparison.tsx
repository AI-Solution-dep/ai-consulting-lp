export default function Comparison() {
  return (
    <section className="section section--paper" aria-labelledby="comparison-title">
      <div className="container">
        <span className="section-num">02 — Comparison</span>
        <div className="section-heading">
          <h2 id="comparison-title"><span className="keep-together">AI研修</span>との違い</h2>
          <p>知識のインプットや単発のQAボットではなく、毎日発生している資料作成・集計・チェック・下書きの手作業を減らすことをゴールにしています。</p>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">比較軸</th>
                <th scope="col">AI研修・QAボット導入</th>
                <th scope="col">JQIT AI導入伴走支援</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">ゴール</th><td data-label="AI研修・QAボット導入">AIの理解、問い合わせ対応、ナレッジ検索。</td><td data-label="JQIT AI導入伴走支援">一か月で手作業を1つ以上減らし、運用に乗せる。</td></tr>
              <tr><th scope="row">対象業務</th><td data-label="AI研修・QAボット導入">汎用的な文章作成・要約・社内FAQが中心。</td><td data-label="JQIT AI導入伴走支援">議事録、報告書、集計、書類チェックなど、貴社の具体業務そのもの。</td></tr>
              <tr><th scope="row">成果物</th><td data-label="AI研修・QAボット導入">説明資料、プロンプト例、QAデータ。</td><td data-label="JQIT AI導入伴走支援">貴社専用のエージェントスキル、自動化スクリプト、運用ルール、AI導入ロードマップ。</td></tr>
              <tr><th scope="row">効果の見え方</th><td data-label="AI研修・QAボット導入">便利だが、削減工数が見えづらいことがある。</td><td data-label="JQIT AI導入伴走支援">資料の作成時間、確認漏れ、集計の手間などで測定しやすい。</td></tr>
              <tr><th scope="row">支援の立場</th><td data-label="AI研修・QAボット導入">講師・ツール導入支援。</td><td data-label="JQIT AI導入伴走支援">経営者・現場と並走する自動化パートナー。</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
