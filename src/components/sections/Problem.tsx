export default function Problem() {
  return (
    <section className="problem" aria-labelledby="problem-title">
      <div className="container">
        <div className="problem__inner">
          <div className="problem__questions">
            <span className="problem__label" id="problem-title">貴社の事務所で、こんな光景を見ていませんか？</span>
            <ul className="problem__list">
              <li>事務担当が、フォームの回答を毎回スプレッドシートに転記している</li>
              <li>経理が、請求書や見積をひな形を見ながら手で打ち直している</li>
              <li>会議のたびに、誰かが議事録の清書に時間を取られている</li>
              <li>月末になると、担当者が複数シートを開きながら集計を手でまとめている</li>
              <li>問い合わせの返信文を、現場が毎回ゼロから書いている</li>
            </ul>
          </div>
          <div className="problem__affinity">
            <p>ChatGPTやGeminiは、もう入れた。<br />でも、現場の手作業は減らない。</p>
            <p><strong>聞けば答えるAIと、仕事を進めるAIは、別物です。</strong></p>
            <p className="problem__affinity-cta">そのギャップを埋めるのが、<br />JQITのAI導入伴走支援です。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
