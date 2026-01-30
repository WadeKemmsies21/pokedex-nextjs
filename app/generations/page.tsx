"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type Generation = {
  name: string;
};

export default function GenerationsPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchGenerations() {
      const res = await fetch(
        "https://pokeapi.co/api/v2/generation"
      );
      const data = await res.json();
      setGenerations(data.results);
    }

    fetchGenerations();
  }, []);

  const filtered = generations.filter((gen) =>
    gen.name.includes(search.toLowerCase())
  );

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Generations</h1>

      <input
        type="text"
        placeholder="Search generations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filtered.map((gen) => (
          <li key={gen.name}>
            <Link
              href={`/generations/${gen.name}`}
              className="block p-2 border rounded text-center h-full flex items-center justify-center"
            >
              {gen.name.replaceAll("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
