// Centralized API client. Swap mock implementations for real fetch calls later.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
