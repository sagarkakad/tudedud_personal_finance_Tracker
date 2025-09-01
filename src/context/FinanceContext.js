import React, { createContext, useContext, useState, useEffect } from "react";
import { loadData, saveData } from "../services/storageService";
import { toast } from "react-toastify";

const FinanceContext = createContext();

const defaultData = {
  transactions: [
    { id: 1, type: "Income", amount: 50000, category: "Salary", date: "2025-09-01", description: "Monthly salary" },
    { id: 2, type: "Expense", amount: 2000, category: "Food", date: "2025-09-01", description: "Lunch" },
  ],
  budgets: { Food: 10000, Transport: 5000, Groceries: 8000 },
  profile: { name: "John Doe", email: "john@example.com", currency: "₹" },
};

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(loadData() || defaultData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const addTransaction = (txn) => {
    setData((prev) => ({
      ...prev,
      transactions: [...prev.transactions, { ...txn, id: Date.now() }],
    }));
    toast.success("Transaction added!");
  };

  const editTransaction = (id, updated) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
    toast.info("Transaction updated!");
  };

  const deleteTransaction = (id) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
    toast.error("Transaction deleted!");
  };

  const setBudget = (category, amount) => {
    setData((prev) => ({
      ...prev,
      budgets: { ...prev.budgets, [category]: amount },
    }));
    toast.success(`Budget set for ${category}`);
  };

  const updateProfile = (profile) => {
    setData((prev) => ({ ...prev, profile }));
    toast.success("Profile updated!");
  };

  return (
    <FinanceContext.Provider value={{ data, addTransaction, editTransaction, deleteTransaction, setBudget, updateProfile }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
