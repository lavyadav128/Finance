"use client";
import { useEffect, useState } from "react";

export default function TransactionList({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, [refresh]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📋 Transactions</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-t text-center">
              <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
              <td>{t.description}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
