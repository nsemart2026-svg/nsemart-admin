"use client";

type ShopCardProps = {
  title: string;
  subtitle: string;
  count: number;
};

export default function ShopCard({ title, subtitle, count }: ShopCardProps) {
  return (
    <div className="bg-[#C9C9C926] text-card-foreground rounded-xl p-4 shadow-sm max-w-full h-[133px] flex flex-col justify-between">
      {/* Title */}
      <div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
      </div>

      {/* Value */}
      <div className="text-3xl font-semibold">{count}</div>
    </div>
  );
}
