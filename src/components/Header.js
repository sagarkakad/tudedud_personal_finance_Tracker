import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Finance Tracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/transactions">Transactions</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/budgets">Budgets</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
