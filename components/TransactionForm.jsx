"use client";
import { useState } from "react";

export default function TransactionForm({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description) return alert("All fields required");

    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ amount, date, description, category }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("Other");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Add Transaction
      </button>
    </form>
  );
}
