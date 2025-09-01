import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const [user, setUser] = useState({
    name: "Sagar",
    email: "sagar@email.com",
    currency: "₹",
    totalExpenses: 120000,
    totalSavings: 50000,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
    toast.success("Profile updated successfully!", { position: "top-right" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Profile</h2>

      <div className="card shadow p-3">
        {!editMode ? (
          <>
            <h5>Name: {user.name}</h5>
            <h6>Email: {user.email}</h6>
            <h6>Default Currency: {user.currency}</h6>
            <h6>Total Expenses: ₹ {user.totalExpenses}</h6>
            <h6>Total Savings: ₹ {user.totalSavings}</h6>

            <button
              className="btn btn-primary mt-3"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Currency</label>
              <input
                type="text"
                className="form-control"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
export default Profile;
