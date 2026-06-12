import { cn } from "@/lib/cn";

/**
 * 構成主義的な背景装飾。赤×黒の円と四角を、各セクションの「隅」に極薄で配置。
 * div ベースなのでモバイル/デスクトップ両方で確実に表示され（SVG sliceのように
 * 画面外へ逃げない）、テキスト中央を避けるので可読性も保てる。flip で左右反転。
 */
export function GeoBackdrop({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        flip && "-scale-x-100",
        className,
      )}
    >
      {/* 右上：四角＋円（部分的に重なる） */}
      <div className="absolute -top-7 right-5 h-24 w-24 bg-brand/[0.08] md:right-10 md:h-44 md:w-44" />
      <div className="absolute top-9 -right-7 h-20 w-20 rounded-full bg-ink/[0.07] md:right-2 md:top-12 md:h-40 md:w-40" />
      {/* 左下：四角＋赤い円（部分的に重なる） */}
      <div className="absolute bottom-12 -left-7 h-16 w-16 bg-ink/[0.06] md:left-2 md:bottom-16 md:h-32 md:w-32" />
      <div className="absolute -bottom-6 left-8 h-14 w-14 rounded-full bg-brand/[0.08] md:left-14 md:h-24 md:w-24" />
      {/* 右下：大きな円 */}
      <div className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-ink/[0.06] md:h-56 md:w-56" />
    </div>
  );
}
