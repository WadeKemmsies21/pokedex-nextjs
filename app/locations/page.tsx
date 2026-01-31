"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type Location = {
  name: string;
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLocations() {
      const res = await fetch(
        "https://pokeapi.co/api/v2/location-area?limit=100"
      );
      const data = await res.json();
      setLocations(data.results);
    }

    fetchLocations();
  }, []);

  const filtered = locations.filter((loc) =>
    loc.name.includes(search.toLowerCase())
  );

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-4">
      <BackButton />

      <h1 className="text-2xl font-bold text-center">
        Locations
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* Locations Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filtered.map((loc) => (
          <li key={loc.name} className="h-full">
            <Link
              href={`/locations/${loc.name}`}
              className="flex h-full items-center justify-center p-3 border rounded text-center capitalize hover:bg-gray-100 transition"
            >
              {loc.name.replaceAll("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
