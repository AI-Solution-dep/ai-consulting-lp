export default function Problem() {
  return (
    <section className="problem" aria-labelledby="problem-title">
      <div className="container">
        <div className="problem__inner">
          <div className="problem__questions">
            <span className="problem__label" id="problem-title">こんな手作業、まだ続けていますか？</span>
            <ul className="problem__list">
              <li>フォームの回答を、毎回スプレッドシートにコピーしている</li>
              <li>請求書や見積を、ひな形を見ながら手で入力している</li>
              <li>会議のたびに、議事録の清書へ時間を取られている</li>
              <li>月末の集計を、複数シートを開きながら手でまとめている</li>
              <li>問い合わせへの返信文を、毎回ゼロから書いている</li>
            </ul>
          </div>
          <div className="problem__affinity">
            <p>アプリやツールは増えた。でも、手作業は減らない。</p>
            <p><strong>資料と資料の間に、人間が挟まっている。</strong></p>
            <p className="problem__affinity-cta">そのギャップを埋めるのが、<br />JQITのAI導入伴走支援です。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
