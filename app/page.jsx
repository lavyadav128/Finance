"use client";


import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import { useState } from "react";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">💰 Finance Tracker</h1>
      <TransactionForm onSuccess={() => setRefresh(refresh + 1)} />
      <TransactionList refresh={refresh} />
      <MonthlyBarChart refresh={refresh} />
    </div>
  );
}
