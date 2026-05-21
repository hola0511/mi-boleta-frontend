"use client";

import Navbar from "@/components/Navbar";
import TicketForm from "@/components/TicketForm";
import TicketTable from "@/components/TicketTable";
import { useAuth } from "@/context/AuthContext";
import { ticketsApi } from "@/lib/api";
import { Ticket } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) loadTickets();
  }, [user]);

  async function loadTickets() {
    try {
      const response = await ticketsApi.getAll({
        page: 1,
        pageSize: 100,
      });

      setTickets(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error cargando datos.");
    }
  }

  async function handleCreate(data: Partial<Ticket>) {
    await ticketsApi.create(data);
    await loadTickets();
  }

  async function handleUpdate(data: Partial<Ticket>) {
    if (!editingTicket) return;

    await ticketsApi.update(editingTicket.id, data);
    setEditingTicket(null);
    await loadTickets();
  }

  async function handleDelete(id: string) {
    const confirmed = confirm("¿Seguro que deseas eliminar esta boleta?");
    if (!confirmed) return;

    await ticketsApi.delete(id);
    await loadTickets();
  }

  const summary = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter((t) => t.status === "Pendiente").length;

    const upcoming = tickets
      .filter(
        (t) => t.status === "Pendiente" && new Date(t.gameDate) >= new Date()
      )
      .sort(
        (a, b) =>
          new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime()
      )
      .slice(0, 3);

    return { total, pending, upcoming };
  }, [tickets]);

  if (loading || !user) {
    return <p className="loading">Cargando...</p>;
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <header className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Administra tus boletas, rifas, loterías y sorteos.</p>
          </div>
        </header>

        {error && <p className="error">{error}</p>}

        <section className="stats-grid">
          <article className="stat-card">
            <span>Total registrados</span>
            <strong>{summary.total}</strong>
          </article>

          <article className="stat-card">
            <span>Juegos pendientes</span>
            <strong>{summary.pending}</strong>
          </article>

          <article className="stat-card">
            <span>Próximos sorteos</span>
            <strong>{summary.upcoming.length}</strong>
          </article>
        </section>

        <section className="card">
          <h2>Próximos sorteos</h2>

          {summary.upcoming.length === 0 ? (
            <p className="empty">No tienes sorteos próximos.</p>
          ) : (
            <ul className="upcoming-list">
              {summary.upcoming.map((ticket) => (
                <li key={ticket.id}>
                  <strong>{ticket.title}</strong>
                  <span>{new Date(ticket.gameDate).toLocaleString("es-CO")}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <TicketForm
            initialData={editingTicket}
            onSubmit={editingTicket ? handleUpdate : handleCreate}
            onCancel={editingTicket ? () => setEditingTicket(null) : undefined}
          />
        </section>

        <section className="card">
          <h2>Historial de boletas</h2>

          <TicketTable
            tickets={tickets}
            onEdit={setEditingTicket}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
}