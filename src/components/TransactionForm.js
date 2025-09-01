import React, { useState, useEffect } from "react";

export default function TransactionForm({ onSubmit, editTxn }) {
  const [form, setForm] = useState({
    type: "Expense",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (editTxn) setForm(editTxn);
  }, [editTxn]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ type: "Expense", amount: "", category: "", date: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
      <select name="type" value={form.type} onChange={handleChange} className="border p-2 w-full">
        <option>Income</option>
        <option>Expense</option>
      </select>
      <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="border p-2 w-full" required />
      <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 w-full" required />
      <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 w-full" required />
      <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editTxn ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
}
