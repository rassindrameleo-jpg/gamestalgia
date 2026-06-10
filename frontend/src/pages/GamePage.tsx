import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

export interface GameDetail {
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  rating: number;
  released: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
}

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<GameDetail | null>(null);

  useEffect(() => {
    api.get(`/games/${id}`).then((res) => {
      setGame(res.data);
    });
  }, [id]);

  if (!game)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400 animate-pulse">Loading...</p>
      </div>
    );

  const genres = game.genres ?? [];
  const platforms = game.platforms ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">

      {/*
<div className=" h-[420px]">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${game.backgroundImage})`,
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/100 to-black/20" />
</div>
*/}

      {/* HERO BACKGROUND */}
      <div className="relative h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${game.backgroundImage})`,
          }}
        />

        {/* overlay cinematic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 -mt-40 relative z-10">

        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* IMAGE CARD */}
          <div className="lg:w-1/3">
            <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src={game.backgroundImage}
                alt={game.name}
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="lg:w-2/3">

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {game.name}
            </h1>

            <div className="flex items-center gap-4 mt-3 text-zinc-400">
              <span>⭐ {game.rating}</span>
              <span>•</span>
              <span>{game.released}</span>
            </div>

            {/* GENRES */}
            <div className="flex flex-wrap gap-2 mt-5">
              {genres.map((g) => (
                <span
                  key={g.name}
                  className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full text-xs"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6 text-zinc-300 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: game.description,
                }}
              />
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">

          {/* PLATFORMS */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <h3 className="text-sm uppercase tracking-wide text-zinc-400 mb-3">
              Platforms
            </h3>

            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <span
                  key={p.platform.name}
                  className="bg-zinc-800 px-3 py-1 rounded-lg text-sm"
                >
                  {p.platform.name}
                </span>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 lg:col-span-2">
            <h3 className="text-sm uppercase tracking-wide text-zinc-400 mb-3">
              Game details
            </h3>

            <p className="text-zinc-400 text-sm">
              This is your game detail page built from RAWG API. You can later
              add wishlist, played status, and ratings.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}