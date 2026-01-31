"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

export default function MovesPage() {
  const [moves, setMoves] = useState<{ name: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchMoves() {
      const res = await fetch(
        "https://pokeapi.co/api/v2/move?limit=1000"
      );
      const data = await res.json();
      setMoves(data.results);
    }

    fetchMoves();
  }, []);

  const filteredMoves = moves.filter((move) =>
    move.name.includes(search.toLowerCase())
  );

  return (
    <main className="p-4 max-w-3xl mx-auto">
            <BackButton />
      
      <h1 className="text-2xl font-bold text-center">Moves</h1>

      <input
        type="text"
        placeholder="Search moves..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filteredMoves.map((move) => (
          <li key={move.name}>
            <Link href={`/moves/${move.name}`} className="block p-3 border rounded text-center">
              {move.name.replaceAll("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
