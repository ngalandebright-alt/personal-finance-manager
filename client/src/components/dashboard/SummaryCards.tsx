import SummaryCard from "./SummaryCard";
 export default function SummaryCards() {
    return(
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
               title="Total Balance"
               amount="ZMW 12,500"
               color="text-blue-600"
               />

            <SummaryCard
               title="Income"
               amount="ZMW 18,000"
               color="text-green-600"
               />
                
            <SummaryCard
               title="Expenses"
               amount="ZMW 5,500"
               color="text-red-600"
                />

            <SummaryCard
               title="Savings"
               amount="ZMW 12,500"
               color="text-purple-600"
               />    
        </div>
    );
 }