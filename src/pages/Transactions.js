import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import TransactionForm from "../components/TransactionForm";

export default function Transactions() {
  const { data, addTransaction, editTransaction, deleteTransaction } = useFinance();
  const [editTxn, setEditTxn] = useState(null);

  // Filter states
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Sorting states
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSubmit = (txn) => {
    if (editTxn) {
      editTransaction(editTxn.id, txn);
      setEditTxn(null);
    } else {
      addTransaction(txn);
    }
  };

  // Apply filters
  let filteredTransactions = data.transactions.filter((txn) => {
    return (
      (filterType === "All" || txn.type === filterType) &&
      (filterCategory === "" ||
        txn.category.toLowerCase().includes(filterCategory.toLowerCase())) &&
      (filterDate === "" || txn.date === filterDate)
    );
  });

  // Sorting function
  if (sortColumn) {
    filteredTransactions = [...filteredTransactions].sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (sortColumn === "amount") {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }
      if (sortColumn === "date") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Transactions</h2>

      {/* Add / Edit Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <TransactionForm onSubmit={handleSubmit} editTxn={editTxn} />
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Filters</h5>
          <div className="row g-2">
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setFilterType("All");
                  setFilterCategory("");
                  setFilterDate("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover text-center">
            <thead className="table-light">
              <tr>
                <th onClick={() => handleSort("type")} style={{ cursor: "pointer" }}>
                  Type {sortColumn === "type" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>
                  Amount {sortColumn === "amount" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                  Category {sortColumn === "category" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                  Date {sortColumn === "date" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("description")} style={{ cursor: "pointer" }}>
                  Description {sortColumn === "description" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>
                      <span
                        className={`badge ${
                          txn.type === "Income" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {txn.type}
                      </span>
                    </td>
                    <td>₹{txn.amount}</td>
                    <td>{txn.category}</td>
                    <td>{txn.date}</td>
                    <td>{txn.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setEditTxn(txn)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteTransaction(txn.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-muted">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
