import { useState } from "react";
import type { Game } from "../types/Game";
import { searchGames } from "../api/searchGames";
import { Link } from "react-router-dom";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setSearch(value);

    if (value.length < 3) {
      setGames([]);
      return;
    }

    try {
      setLoading(true);

      const results = await searchGames(value);

      setGames(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Discover Games
      </h1>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for a game..."
        className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700 mb-8"
      />

      {loading && (
        <p className="text-zinc-400">
          Searching...
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {games.map((game) => (
            <Link to={`/games/${game.id}`}>
          <div
            key={game.id}
            className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition duration-200"
          >
            <img
              src={game.backgroundImage}
              alt={game.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">
                {game.name}
              </h2>

              <p className="text-zinc-400">
                ⭐ {game.rating}
              </p>

              <p className="text-zinc-500 text-sm">
                {game.released}
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}