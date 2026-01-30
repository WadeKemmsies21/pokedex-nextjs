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
    <main className="p-4 max-w-3xl mx-auto">
        <BackButton />
      <h1>{location.name.replaceAll("-", " ")}</h1>

      <p>
        <strong>Location:</strong>{" "}
        {location.location.name.replaceAll("-", " ")}
      </p>

      <h2>Pokémon Found Here</h2>
      <ul className="space-y-2">
        {location.pokemon_encounters.map(
          (entry: { pokemon: { name: string } }) => (
            <li key={entry.pokemon.name}>
              {entry.pokemon.name.replaceAll("-", " ")}
            </li>
          )
        )}
      </ul>
    </main>
  );
}
