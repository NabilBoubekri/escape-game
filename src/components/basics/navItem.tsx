import { Link, useLocation } from "react-router-dom";
import React from "react";

interface NavItemProps {
  href: string;
  label: string;
}

export const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className="nav-item text-center border bg-white p-0 mb-4 rounded-pill">
      <Link
        to={href}
        className={`nav-link px-0 align-middle text-dark ${isActive ? "active fw-bold" : ""}`}
      >
        {label}
      </Link>
    </li>
  );
};
