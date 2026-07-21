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
        <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-gray-500 text-sm">{title}</h3>

            <p className={`mt-3 text-3xl font-bold ${color}`}>
              {amount}
            </p>
        </div>
    );
}