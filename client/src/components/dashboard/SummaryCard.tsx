type SummaryCardProps = {
  title: string;
  amount: string;
  color: string;
};

export default function SummaryCard({
  title,
  amount,
  color,
}: SummaryCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        border-slate-200
        shadow-sm
        p-6
        transition-transform
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p
        className={`mt-3 text-3xl font-bold tracking-tight ${color}`}
      >
        {amount}
      </p>
    </div>
  );
}