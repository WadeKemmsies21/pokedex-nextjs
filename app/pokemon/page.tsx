"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type Pokemon = {
  name: string;
};

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await res.json();
      setPokemon(data.results);
    }

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.includes(search.toLowerCase())
  );

  return (
    
    <main className="p-4 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4 text-center">Pokémon</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border"
      />

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filteredPokemon.map((p) => (
          <li key={p.name}>
            <Link
              href={`/pokemon/${p.name}`}
              className="block p-2 border rounded text-center"
            >
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
