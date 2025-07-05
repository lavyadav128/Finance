"use client";
import { useEffect, useState } from "react";

export default function TransactionList({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [refresh]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx._id} className="border p-2 rounded-md">
            <strong>₹{tx.amount}</strong> - {tx.description} on {new Date(tx.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
