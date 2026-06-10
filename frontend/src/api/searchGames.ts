import { api } from "./api";
import type { Game } from "../types/Game";

export async function searchGames(
  query: string
): Promise<Game[]> {

  const response = await api.get(
    `/games/search?q=${query}`
  );

  return response.data;
}