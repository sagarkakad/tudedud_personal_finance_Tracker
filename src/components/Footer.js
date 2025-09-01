import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0">© {new Date().getFullYear()} Personal Finance Tracker</p>
    </footer>
  );
}
export default Footer;
