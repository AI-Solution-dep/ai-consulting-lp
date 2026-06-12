import { asset } from "@/lib/asset";

export default function Stories() {
  return (
    <section className="section section--paper" id="stories" aria-labelledby="stories-title">
      <div className="container">
        <span className="section-num">03 — Use Cases</span>
        <div className="section-heading">
          <h2 id="stories-title">最初に効果が出やすい<br />自動化テーマ<span className="marker">5選</span></h2>
          <p>まずは、PCの中で完結する仕事から。チャットボット単体より工数削減が見えやすいテーマで小さな成功を作り、他の業務へ横展開します。</p>
        </div>
        <div className="stories-grid">
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/04-matching.png")} alt="ガラスボードに付箋を貼りながら打ち合わせの論点を整理する担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 01</span>
              <h3>会議メモからの<br />議事録・タスク整理</h3>
              <p>打ち合わせの録音やメモから、議事録の清書、決定事項と宿題の一覧化までをAIが下書き。フォーマットは貴社の型に合わせます。</p>
              <p className="story__impact">Before: 会議後の清書に1時間 → After: たたき台が数分で出る</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/11-report-draft.png")} alt="資料の下書きを確認しながらPCで報告書を仕上げる担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 02</span>
              <h3>提案書・報告書の<br />ドラフト作成</h3>
              <p>過去の資料から構成と言い回しの型を整備し、月次報告や提案書の初稿をAIが作成。人は仕上げと判断に集中します。</p>
              <p className="story__impact">Before: 白紙から書き始める → After: 初稿のレビューから始める</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/02-skill-library.png")} alt="積み上がった帳票をPCで整理する担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 03</span>
              <h3>スプレッドシートの<br />整理・集計・サマリー</h3>
              <p>形式がバラバラの表の整形、月次集計、報告用サマリーの作成までを自動化。ExcelやGoogleスプレッドシートのまま使えます。</p>
              <p className="story__impact">Before: 毎月手で整形 → After: 集計とサマリーを自動生成</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/03-management.png")} alt="請求書や試算表を手作業で確認している経理担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 04</span>
              <h3>請求書・発注書の<br />チェック・突き合わせ</h3>
              <p>請求書と発注書の照合、記載漏れや数字の不一致の確認をAIが先回り。最終判断は必ず人が行います。</p>
              <p className="story__impact">Before: 目視で突き合わせ → After: 不一致候補を一覧で提示</p>
            </div>
          </article>
          <article className="story">
            <div className="story__image"><img src={asset("/assets/generated/05-evaluation.png")} alt="スマートフォンで返信案を確認する担当者" loading="lazy" /></div>
            <div className="story__body">
              <span className="story__num">Theme 05</span>
              <h3>メール・問い合わせ<br />返信の下書き</h3>
              <p>過去のやり取りと社内ルールを踏まえた返信案をAIが作成。送信前に人が確認するので、トーンも安全性も保てます。</p>
              <p className="story__impact">Before: 返信文を都度作成 → After: 文脈つき返信案を提示</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
