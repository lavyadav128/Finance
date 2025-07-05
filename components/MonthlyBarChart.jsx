"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { groupTransactionsByMonth } from "@/utils/groupByMonth";

export default function MonthlyBarChart({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const grouped = groupTransactionsByMonth(transactions);
        setData(grouped);
      });
  }, [refresh]);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-2">📊 Monthly Expenses</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
