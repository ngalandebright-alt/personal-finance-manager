import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

} from "recharts";

const data =[
    { month: "Jan", income: 5000, Expenses: 3200 },
    { month: "Feb", income: 7000, Expenses: 3200 },
    { month: "Mar", income: 6500, Expenses: 3200 },
    { month: "Apr", income: 8000, Expenses: 3200 },
    { month: "May", income: 9000, Expenses: 3200 },
    { month: "Jun", income: 8500, Expenses: 3200 },
];

export default function SpendingChart() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-semibold">
                Spending Overview
            </h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis/>
                        <Tooltip/>

                        <Bar dataKey="income" fill="#16a34a"/>
                        <Bar dataKey="expenses" fill="#dc2626"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}