export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export type GameType =
  | "Lotería"
  | "Rifa"
  | "Sorteo"
  | "Boleta"
  | "Juego ocasional";

export type TicketStatus = "Pendiente" | "Ganado" | "Perdido";

export interface Ticket {
  id: string;
  title: string;
  gameType: GameType;
  gameNumber?: string | null;
  gameDate: string;
  amount?: number | null;
  place?: string | null;
  status: TicketStatus;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface TicketFilters {
  q?: string;
  status?: string;
  gameType?: string;
  page?: number;
  pageSize?: number;
}