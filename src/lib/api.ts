import { ApiResponse, Ticket, TicketFilters, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) {
    return null as T;
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.error || "Ocurrió un error inesperado");
  }

  return body;
}

export const authApi = {
  register: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    return request<ApiResponse<User>>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  login: async (payload: { email: string; password: string }) => {
    return request<ApiResponse<{ token: string; user: User }>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

function buildQuery(filters: TicketFilters) {
  const params = new URLSearchParams();

  if (filters.q) params.append("q", filters.q);
  if (filters.status) params.append("status", filters.status);
  if (filters.gameType) params.append("gameType", filters.gameType);
  if (filters.page) params.append("page", String(filters.page));
  if (filters.pageSize) params.append("pageSize", String(filters.pageSize));

  const query = params.toString();
  return query ? `?${query}` : "";
}

export const ticketsApi = {
  getAll: async (filters: TicketFilters = {}) => {
    return request<ApiResponse<Ticket[]>>(`/tickets${buildQuery(filters)}`);
  },

  create: async (payload: Partial<Ticket>) => {
    return request<ApiResponse<Ticket>>("/tickets", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update: async (id: string, payload: Partial<Ticket>) => {
    return request<ApiResponse<Ticket>>(`/tickets/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  delete: async (id: string) => {
    return request<void>(`/tickets/${id}`, {
      method: "DELETE",
    });
  },
};

export const adminApi = {
  getTickets: async (filters: TicketFilters = {}) => {
    return request<ApiResponse<Ticket[]>>(
      `/admin/tickets${buildQuery(filters)}`
    );
  },
};