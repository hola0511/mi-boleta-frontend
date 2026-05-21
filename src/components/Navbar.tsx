"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link href="/dashboard" className="brand">
        Mi Boleta
      </Link>

      <div className="nav-links">
        <Link href="/dashboard">Dashboard</Link>

        {user?.role === "admin" && <Link href="/admin">Admin</Link>}

        <span>{user?.name}</span>

        <button onClick={logout} className="btn small">
          Salir
        </button>
      </div>
    </nav>
  );
}