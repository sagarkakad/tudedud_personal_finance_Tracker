import React from "react";

export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}
