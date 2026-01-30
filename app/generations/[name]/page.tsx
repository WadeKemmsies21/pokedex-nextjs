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
    <main className="p-4 max-w-3xl mx-auto">
      <h1>{generation.name.replaceAll("-", " ")}</h1>

      <p>
        <strong>Main Region:</strong>{" "}
        {generation.main_region.name.replaceAll("-", " ")}
      </p>

      <h2>Pokémon in this Generation</h2>
      <ul className="space-y-2">
        {generation.pokemon_species.map(
          (pokemon: { name: string }) => (
            <li key={pokemon.name}>
              <Link href={`/pokemon/${pokemon.name}`}>
                {pokemon.name.replaceAll("-", " ")}
              </Link>
            </li>
          )
        )}
      </ul>
    </main>
  );
}
