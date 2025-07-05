"use client";
import { useState } from "react";

export default function TransactionForm({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [description, setDesc] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !date) return alert("Fill all fields");

    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ amount: +amount, description, date }),
    });

    setAmount("");
    setDesc("");
    setDate("");
    onSuccess(); // reload transactions
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="w-full border p-2" />
      <input type="text" value={description} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="w-full border p-2" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Transaction</button>
    </form>
  );
}
