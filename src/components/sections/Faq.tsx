export default function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <span className="section-num">10 — FAQ</span>
        <div className="section-heading">
          <h2 id="faq-title">よくあるご質問</h2>
          <p>ご相談前に多くいただく質問にお答えします。</p>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>無料相談を受けたら、契約しないといけませんか？</summary>
            <p className="faq-item__answer">いいえ。相談のみで終えていただいて構いません。当社から営業電話やしつこいフォローをすることもありません。</p>
          </details>
          <details className="faq-item">
            <summary>kintoneやfreeeの運用が整理されていなくても相談できますか？</summary>
            <p className="faq-item__answer">はい。まずは利用中のアプリ、権限、現場の手作業を確認します。最初はPCの中で完結する業務からテーマを選ぶため、特定アプリの高度な開発や連携を前提にしません。</p>
          </details>
          <details className="faq-item">
            <summary>ITリテラシーが高くない社員でも回せますか？</summary>
            <p className="faq-item__answer">はい。現場担当者には完成した手順と確認ポイントを渡し、技術的な詳細を意識しなくても運用できる形にします。重要な登録・送信・会計処理は、人の承認を挟む設計にします。</p>
          </details>
          <details className="faq-item">
            <summary>一か月で終わらせず、その後も支援してもらえますか？</summary>
            <p className="faq-item__answer">はい。一か月導入後、月次顧問契約（月20万〜50万円）に移行いただけます。追加テーマ、横展開、改善、権限・ログ・承認フローの整備をご提供します。一か月で終わる契約も選択可能です。</p>
          </details>
          <details className="faq-item">
            <summary>オンラインだけで進められますか？</summary>
            <p className="faq-item__answer">はい。週1回60分のオンライン定例とチャット/メール質疑で完結します。対面ご希望の場合は別途ご相談ください。</p>
          </details>
          <details className="faq-item">
            <summary>業務ヒアリングの前に準備するものはありますか？</summary>
            <p className="faq-item__answer">最初は「使っているアプリ」と「減らしたい手作業」だけで大丈夫です。例：議事録の清書、報告書づくり、スプレッドシートの集計、請求書のチェック、問い合わせ返信の下書きなど。</p>
          </details>
          <details className="faq-item">
            <summary>社外秘データや個人情報をAIに渡すのが不安です。</summary>
            <p className="faq-item__answer">扱う情報、AIに渡す範囲、操作権限を最初に整理します。初期導入では、下書き作成・候補提示・通知などから始め、送信・登録・会計処理は人の承認を挟む設計にします。</p>
          </details>
          <details className="faq-item">
            <summary>20万円のほかに費用はかかりますか？</summary>
            <p className="faq-item__answer">AIツールの利用料（目安：月数千円〜）が別途必要になる場合があります。無料相談の時点で、貴社のケースでの総額の目安をご提示します。</p>
          </details>
        </div>
      </div>
    </section>
  );
}
