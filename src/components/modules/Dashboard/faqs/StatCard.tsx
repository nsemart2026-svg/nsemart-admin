type FaqStatCardProps = {
  title: string;
  value: number;
  description: string;
};

export default function FaqStatCard({
  title,
  value,
  description,
}: FaqStatCardProps) {
  return (
    <div className="h-[130px] p-4 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between min-w-0">
      <div>
        <p className="text-sm md:text-base font-medium text-muted-foreground truncate">
          {title}
        </p>
        <p className="text-xl md:text-2xl font-semibold text-foreground truncate">
          {value}
        </p>
      </div>
      <p className="text-xs md:text-sm text-[#979797] truncate">
        {description}
      </p>
    </div>
  );
}
