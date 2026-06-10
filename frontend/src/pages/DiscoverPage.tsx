import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { fetchGames } from "../api/games";

export default function DiscoverPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        GameStalgia
      </h1>

      <div className="grid grid-cols-5 gap-6">

        {games.map(game => (

          <div
            key={game.id}
            className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition"
          >

            <img
              src={game.backgroundImage}
              alt={game.name}
              className="h-64 w-full object-cover "
            />

            <div className="p-4">

              <h2 className="font-bold text-lg">
                {game.name}
              </h2>

              <p className="text-zinc-400">
                ⭐ {game.rating}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

