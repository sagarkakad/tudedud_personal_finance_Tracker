import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function Budgets() {
  const { data, setBudget } = useFinance();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSetBudget = () => {
    if (category && amount) {
      setBudget(category, parseFloat(amount));
      setCategory("");
      setAmount("");
    }
  };

  // Calculate spent by category
  const spentByCategory = data.transactions.reduce((acc, t) => {
    if (t.type === "Expense") {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Monthly Budgets</h2>

      {/* Budget input */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-4">
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category (e.g., Groceries)"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Budget Amount (₹)"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <button
                onClick={handleSetBudget}
                className="btn btn-primary w-100"
              >
                Set Budget
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Budget List */}
      {Object.entries(data.budgets).length > 0 ? (
        <div className="card shadow-sm">
          <div className="card-body">
            {Object.entries(data.budgets).map(([cat, limit]) => {
              const spent = spentByCategory[cat] || 0;
              const percentage = Math.min((spent / limit) * 100, 100);
              const isOverspent = spent > limit;

              return (
                <div key={cat} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>{cat}</strong>
                    <span>
                      ₹{spent} / ₹{limit}
                    </span>
                  </div>

                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className={`progress-bar ${
                        isOverspent ? "bg-danger" : "bg-success"
                      }`}
                      role="progressbar"
                      style={{ width: `${percentage}%` }}
                      aria-valuenow={percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {percentage.toFixed(0)}%
                    </div>
                  </div>

                  {isOverspent && (
                    <div className="text-danger small mt-1 fw-bold">
                      ⚠ Overspent by ₹{spent - limit} in {cat}!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-muted">No budgets set yet. Add one above 👆</p>
      )}
    </div>
  );
}
