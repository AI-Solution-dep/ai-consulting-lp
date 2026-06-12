export default function Deliverables() {
  return (
    <section className="section" id="deliverables" aria-labelledby="deliverables-title">
      <div className="container">
        <span className="section-num">06 — Deliverables</span>
        <div className="deliverables-layout">
          <div>
            <div className="section-heading">
              <h2 id="deliverables-title">納品物</h2>
              <p>一か月で作った自動化の考え方と実装を、貴社の資産として残します。担当者だけの経験で終わらせず、社内で再利用・横展開できる形にします。</p>
            </div>
            <ul className="deliverables-list">
              <li><div><strong>エージェントスキル・プラグイン（貴社専用）</strong><span>業務手順・判断基準・出力形式を、AIがそのまま実行できる形に整備した「AIの仕事の型」。</span></div></li>
              <li><div><strong>GAS・API連携ひな形</strong><span>プログラム中に作成したApps Script、スクリプト、Webhook、連携手順。</span></div></li>
              <li><div><strong>AI向け業務マニュアルの整備ガイド</strong><span>業務マニュアルをAIに教える形へ書き換える手順。担当者に引き継ぎ、社内で更新し続けられるように。</span></div></li>
              <li><div><strong>運用ルール・権限設計メモ</strong><span>人の承認、ログ、例外対応、情報の扱い方を整理。</span></div></li>
              <li><div><strong>AI導入ロードマップ</strong><span>削減工数、難易度、優先順位を整理した、次にAI化する業務の計画書。</span></div></li>
            </ul>
          </div>
          <div className="deliverables-flow" aria-label="成果物のフロー">
            <div>
              <span>Input</span>
              <strong>現状業務とアプリ</strong>
              <p>担当者の手順、使っているアプリ、帳票、確認観点、困りごとを集めます。</p>
            </div>
            <div>
              <span>Design</span>
              <strong>AIエージェント設計</strong>
              <p>AIに任せる範囲、人が確認する範囲、API/GASでつなぐ範囲を整理します。</p>
            </div>
            <div>
              <span>Output</span>
              <strong>自動化資産</strong>
              <p>エージェントスキル、連携ひな形、運用ルール、AI導入ロードマップとして残します。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
