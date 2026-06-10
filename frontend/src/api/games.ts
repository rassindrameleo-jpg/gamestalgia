import type { Game } from "../types/Game";
import { api } from "./api";

export const fetchGames = async (): Promise<Game[]> => {
  const response = await api.get("/games");
  return response.data;
};