import Link from "next/link";
import BackButton from "@/app/components/BackButton";

async function getPokemon(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Pokemon not found");
  return res.json();
}

async function getEncounters(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}/encounters`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const pokemon = await getPokemon(name);
  const encounters = await getEncounters(name);


  const locations: string[] = Array.from(
    new Set(
      encounters.map(
        (e: any) => e.location_area.name.split("-area")[0]
      )
    )
  );

  return (
  <div className="p-4 space-y-6 max-w-3xl mx-auto">
    <BackButton />

    <h1 className="text-3xl font-bold capitalize">
      {pokemon.name}
    </h1>

    {/* Sprites */}
    <div className="flex gap-6">
      <img
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name} normal`}
      />
      <img
        src={pokemon.sprites.front_shiny}
        alt={`${pokemon.name} shiny`}
      />
    </div>

    {/* Stats */}
<section>
  <h2 className="text-xl font-semibold mb-2">Stats</h2>

  <ul className="space-y-3">
    {pokemon.stats.map((stat: any) => {
      const percent = (stat.base_stat / 255) * 100;

      return (
        <li key={stat.stat.name}>
          <div className="flex justify-between text-sm capitalize mb-1">
            <span>{stat.stat.name.replace("-", " ")}</span>
            <span>{stat.base_stat}</span>
          </div>

          <div className="w-full bg-gray-200 rounded h-3">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{ width: `${percent}%` }}
            />
          </div>
        </li>
      );
    })}
  </ul>
</section>


    {/* Locations */}
    <section>
      <h2 className="text-xl font-semibold">Locations</h2>
      {locations.length === 0 ? (
        <p>Not found in the wild</p>
      ) : (
        <ul className="space-y-1">
          {locations.map((loc) => (
            <li key={loc}>
              <Link
                href={`/locations/${loc}`}
                className="capitalize text-blue-600 underline"
              >
                {loc.replaceAll("-", " ")}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>

    {/* Moves */}
    <section>
      <h2 className="text-xl font-semibold">Moves</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {pokemon.moves.map((move: any) => (
          <li key={move.move.name}>
            <Link
              href={`/moves/${move.move.name}`}
              className="capitalize text-blue-600 underline"
            >
              {move.move.name.replaceAll("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
);
}
