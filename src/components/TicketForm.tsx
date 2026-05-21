"use client";

import { GameType, Ticket, TicketStatus } from "@/types";
import { FormEvent, useEffect, useState } from "react";

const gameTypes: GameType[] = [
  "Lotería",
  "Rifa",
  "Sorteo",
  "Boleta",
  "Juego ocasional",
];

const statuses: TicketStatus[] = ["Pendiente", "Ganado", "Perdido"];

interface Props {
  initialData?: Ticket | null;
  onSubmit: (data: Partial<Ticket>) => Promise<void>;
  onCancel?: () => void;
}

export default function TicketForm({ initialData, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [gameType, setGameType] = useState<GameType>("Lotería");
  const [gameNumber, setGameNumber] = useState("");
  const [gameDate, setGameDate] = useState("");
  const [amount, setAmount] = useState("");
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState<TicketStatus>("Pendiente");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setGameType(initialData.gameType || "Lotería");
    setGameNumber(initialData.gameNumber || "");
    setGameDate(initialData.gameDate ? initialData.gameDate.slice(0, 16) : "");
    setAmount(initialData.amount ? String(initialData.amount) : "");
    setPlace(initialData.place || "");
    setStatus(initialData.status || "Pendiente");
    setNotes(initialData.notes || "");
  }, [initialData]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("El nombre del sorteo es obligatorio.");
      return;
    }

    if (!gameDate) {
      setError("La fecha del sorteo es obligatoria.");
      return;
    }

    const parsedAmount = amount ? Number(amount) : undefined;

    if (amount && (Number.isNaN(parsedAmount) || parsedAmount < 0)) {
      setError("El valor apostado debe ser un número válido.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        title,
        gameType,
        gameNumber: gameNumber || undefined,
        gameDate: new Date(gameDate).toISOString(),
        amount: parsedAmount,
        place: place || undefined,
        status,
        notes: notes || undefined,
      });

      if (!initialData) {
        setTitle("");
        setGameType("Lotería");
        setGameNumber("");
        setGameDate("");
        setAmount("");
        setPlace("");
        setStatus("Pendiente");
        setNotes("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardando boleta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Editar boleta" : "Nueva boleta"}</h2>

      {error && <p className="error">{error}</p>}

      <div className="form-grid">
        <div>
          <label>Nombre del sorteo *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Lotería de Medellín"
          />
        </div>

        <div>
          <label>Número jugado</label>
          <input
            value={gameNumber}
            onChange={(e) => setGameNumber(e.target.value)}
            placeholder="1234"
          />
        </div>

        <div>
          <label>Fecha del sorteo *</label>
          <input
            type="datetime-local"
            value={gameDate}
            onChange={(e) => setGameDate(e.target.value)}
          />
        </div>

        <div>
          <label>Valor apostado</label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="5000"
          />
        </div>

        <div>
          <label>Lugar de compra</label>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Tienda La Esquina"
          />
        </div>

        <div>
          <label>Tipo de juego *</label>
          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value as GameType)}
          >
            {gameTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Estado *</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
          >
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Notas</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Premio, observaciones o recordatorios"
          />
        </div>
      </div>

      <div className="actions">
        <button className="btn primary" disabled={loading}>
          {loading ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
        </button>

        {onCancel && (
          <button type="button" className="btn secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}