import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";

function Dashboard() {
  const summary = {
    income: 50000,
    expenses: 30000,
    remaining: 20000,
    savings: 10000,
  };

  const todayExpenses = [
    { amount: 500, category: "Food", note: "Lunch" },
    { amount: 1200, category: "Transport", note: "Fuel" },
  ];

  // Graph data
  const expenseByCategory = [
    { name: "Food", value: 12000 },
    { name: "Transport", value: 6000 },
    { name: "Shopping", value: 5000 },
    { name: "Entertainment", value: 4000 },
    { name: "Others", value: 3000 },
  ];

  const monthlyTrend = [
    { month: "Jan", income: 40000, expenses: 25000 },
    { month: "Feb", income: 45000, expenses: 28000 },
    { month: "Mar", income: 48000, expenses: 32000 },
    { month: "Apr", income: 50000, expenses: 30000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#d9534f"];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        {Object.entries(summary).map(([key, value], i) => (
          <div className="col-md-3" key={i}>
            <div className="card shadow mb-3">
              <div className="card-body text-center">
                <h6 className="card-title text-capitalize">{key}</h6>
                <h5 className="fw-bold">₹ {value}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs Row */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Expenses by Category</h5>
          <PieChart width={400} height={300}>
            <Pie
              data={expenseByCategory}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
            >
              {expenseByCategory.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="col-md-6">
          <h5>Monthly Income vs Expenses</h5>
          <LineChart width={450} height={300} data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#28a745" />
            <Line type="monotone" dataKey="expenses" stroke="#dc3545" />
          </LineChart>
        </div>
      </div>

      {/* Today's Expenses Table */}
      <h4>Today’s Expenses</h4>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {todayExpenses.map((exp, i) => (
            <tr key={i}>
              <td>₹ {exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Dashboard;
