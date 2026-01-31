import Link from "next/link";
import BackButton from "@/app/components/BackButton";

async function getGeneration(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/generation/${name}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Generation not found");
  }

  return res.json();
}

export default async function GenerationDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const generation = await getGeneration(name);

  return (
    <main className="p-4 max-w-4xl mx-auto space-y-6">
      <BackButton />

      {/* Page Title */}
      <h1 className="text-3xl font-bold capitalize text-center">
        {generation.name.replaceAll("-", " ")}
      </h1>

      {/* Info Card */}
      <section className="border rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">
          Generation Info
        </h2>

        <p>
          <strong>Main Region:</strong>{" "}
          <span className="capitalize">
            {generation.main_region.name.replaceAll("-", " ")}
          </span>
        </p>
      </section>

      {/* Pokemon List */}
      <section className="border rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Pokémon in this Generation
        </h2>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {generation.pokemon_species.map(
            (pokemon: { name: string }) => (
              <li key={pokemon.name}>
                <Link
                  href={`/pokemon/${pokemon.name}`}
                  className="block p-2 border rounded text-center capitalize hover:bg-gray-100 transition"
                >
                  {pokemon.name.replaceAll("-", " ")}
                </Link>
              </li>
            )
          )}
        </ul>
      </section>
    </main>
  );
}
