import { asset } from "@/lib/asset";
import HeroParticles from "./HeroParticles";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroParticles />
      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__issue">
            <span>JQIT AI Automation</span>
          </div>
          <h1 id="hero-title"><span className="accent"><span className="hero-title__seg">資料づくり・</span><span className="hero-title__seg">データ整理・</span><span className="hero-title__seg">書類チェック、</span></span><span className="hero-title__seg">もう手でやらない。</span><br /><span className="hero-title__answer">それ、AIで<span className="underline-hand">減らせます</span>。</span></h1>
          <p className="hero__lead">気づいている。この作業、人がやらなくていいはずだと。<br />その感覚は正しい。新しいシステムの導入などはいりません。<br />いまのアプリをそのままに、一か月で動く自動化のひな形まで作ります。<br />相談だけでも大丈夫。技術的なことは、すべてこちらが引き受けます。<br /><span className="accent">まず30分、話してみてください。</span></p>
          <div className="hero__actions">
            <a className="button button--primary" href="https://app.spirinc.com/t/qRgOv_0Sv6TwRrSmRqVmf/as/-zbXeo9kkaLolpsRibQ5j/confirm">30分の無料相談を予約する</a>
            <a className="button button--secondary" href="#stories">自動化例を見る</a>
          </div>
        </div>
        <figure className="hero__visual">
          <img src={asset("/assets/generated/01-hero.png")} alt="経営者とコンサルタントが同じPC画面を見ながら業務の自動化を検討している様子" loading="eager" fetchPriority="high" />
          <figcaption className="hero__caption">問うのは使い方ではなく、減らし方。一か月で、一緒に決めます。</figcaption>
        </figure>
      </div>
    </section>
  );
}
