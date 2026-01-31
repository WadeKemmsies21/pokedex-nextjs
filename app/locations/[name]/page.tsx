import Link from "next/link";
import BackButton from "@/app/components/BackButton";

async function getLocation(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/location-area/${name}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Location not found");
  }

  return res.json();
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const location = await getLocation(name);

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-6">
      <BackButton />

      {/* Page Title */}
      <h1 className="text-3xl font-bold capitalize text-center">
        {location.name.replaceAll("-", " ")}
      </h1>

      {/* Parent Location Card */}
      <section className="border rounded-lg p-4 space-y-2">
        <h2 className="text-xl font-semibold">Region Location</h2>
        <p className="capitalize">
          {location.location.name.replaceAll("-", " ")}
        </p>
      </section>

      {/* Pokemon Encounters */}
      <section className="border rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold">
          Pokémon Found Here
        </h2>

        {location.pokemon_encounters.length === 0 ? (
          <p>No Pokémon encounters found.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {location.pokemon_encounters.map(
              (entry: { pokemon: { name: string } }) => (
                <li key={entry.pokemon.name} className="h-full">
                  <Link
                    href={`/pokemon/${entry.pokemon.name}`}
                    className="flex h-full items-center justify-center border rounded p-2 text-center capitalize hover:bg-gray-100 transition"
                  >
                    {entry.pokemon.name.replaceAll("-", " ")}
                  </Link>
                </li>
              )
            )}
          </ul>
        )}
      </section>
    </main>
  );
}
