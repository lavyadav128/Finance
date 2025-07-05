"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import { useState } from "react";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">💰 Finance Tracker</h1>
      <TransactionForm onSuccess={() => setRefresh(refresh + 1)} />
      <TransactionList refresh={refresh} />
      <MonthlyBarChart refresh={refresh} />
      <CategoryPieChart refresh={refresh} />
    </div>
  );
}
