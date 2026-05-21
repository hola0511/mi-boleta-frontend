"use client";

import Navbar from "@/components/Navbar";
import TicketTable from "@/components/TicketTable";
import { useAuth } from "@/context/AuthContext";
import { adminApi } from "@/lib/api";
import { Ticket } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const gameTypes = [
  "",
  "Lotería",
  "Rifa",
  "Sorteo",
  "Boleta",
  "Juego ocasional",
];

const statuses = ["", "Pendiente", "Ganado", "Perdido"];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [gameType, setGameType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (!loading && user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      loadAdminTickets();
    }
  }, [user, q, status, gameType, page]);

  async function loadAdminTickets() {
    try {
      setError("");

      const response = await adminApi.getTickets({
        q,
        status,
        gameType,
        page,
        pageSize: 10,
      });

      setTickets(response.data);
      setTotalPages(response.meta?.totalPages || 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error cargando panel admin."
      );
    }
  }

  if (loading || !user) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <header className="page-header">
          <div>
            <h1>Panel administrador</h1>
            <p>Consulta boletas de todos los usuarios.</p>
          </div>
        </header>

        {error && <p className="error">{error}</p>}

        <section className="card">
          <div className="filters">
            <input
              placeholder="Buscar por número, nombre, usuario o email"
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
            />

            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item || "Todos los estados"}
                </option>
              ))}
            </select>

            <select
              value={gameType}
              onChange={(e) => {
                setPage(1);
                setGameType(e.target.value);
              }}
            >
              {gameTypes.map((item) => (
                <option key={item} value={item}>
                  {item || "Todos los tipos"}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="card">
          <TicketTable tickets={tickets} showOwner />

          <div className="pagination">
            <button
              className="btn secondary"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Anterior
            </button>

            <span>
              Página {page} de {totalPages}
            </span>

            <button
              className="btn secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Siguiente
            </button>
          </div>
        </section>
      </main>
    </>
  );
}