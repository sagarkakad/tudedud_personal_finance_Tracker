import React from "react";

export default function BudgetProgress({ category, spent, limit }) {
  const percent = Math.min((spent / limit) * 100, 100);
  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <div className="flex justify-between mb-1">
        <span>{category}</span>
        <span>{spent} / {limit}</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div className={`h-3 rounded ${spent > limit ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
