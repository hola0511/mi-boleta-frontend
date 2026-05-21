"use client";

import { Ticket } from "@/types";

interface Props {
  tickets: Ticket[];
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (id: string) => void;
  showOwner?: boolean;
}

export default function TicketTable({
  tickets,
  onEdit,
  onDelete,
  showOwner = false,
}: Props) {
  if (tickets.length === 0) {
    return <p className="empty">No hay boletas registradas.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Sorteo</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Valor</th>
            <th>Lugar</th>
            {showOwner && <th>Usuario</th>}
            {(onEdit || onDelete) && <th>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.gameNumber || "—"}</td>
              <td>{ticket.gameType}</td>
              <td>{new Date(ticket.gameDate).toLocaleString("es-CO")}</td>
              <td>
                <span className={`badge ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </span>
              </td>
              <td>
                {ticket.amount
                  ? ticket.amount.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })
                  : "—"}
              </td>
              <td>{ticket.place || "—"}</td>

              {showOwner && (
                <td>
                  {ticket.owner?.name}
                  <br />
                  <small>{ticket.owner?.email}</small>
                </td>
              )}

              {(onEdit || onDelete) && (
                <td>
                  <div className="row-actions">
                    {onEdit && (
                      <button
                        className="btn small secondary"
                        onClick={() => onEdit(ticket)}
                      >
                        Editar
                      </button>
                    )}

                    {onDelete && (
                      <button
                        className="btn small danger"
                        onClick={() => onDelete(ticket.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}