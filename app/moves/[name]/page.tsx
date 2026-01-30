import Link from "next/link";
import BackButton from "@/app/components/BackButton";

async function getMove(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/move/${name}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Move not found");
  }

  return res.json();
}

export default async function MoveDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const move = await getMove(name);

  return (
    <main className="p-4 max-w-3xl mx-auto">
        <BackButton />
      <h1>{move.name.replaceAll("-", " ")}</h1>

      <ul className="space-y-2">
        <li>
          <strong>Accuracy:</strong>{" "}
          {move.accuracy ?? "N/A"}
        </li>
        <li>
          <strong>Power:</strong>{" "}
          {move.power ?? "N/A"}
        </li>
        <li>
          <strong>PP:</strong>{" "}
          {move.pp}
        </li>
      </ul>

      <h2>Flavor Text</h2>
      <ul className="space-y-2">
        {move.flavor_text_entries
          .filter(
            (entry: any) => entry.language.name === "en"
          )
          .map((entry: any, index: number) => (
            <li key={index}>
              <strong>
                {entry.version_group.name.replaceAll("-", " ")}:
              </strong>{" "}
              {entry.flavor_text.replace(/\n|\f/g, " ")}
            </li>
          ))}
      </ul>

      <h2>Pokémon That Learn This Move</h2>
      <ul className="space-y-2">
        {move.learned_by_pokemon.map(
          (p: { name: string }) => (
            <li key={p.name}>
              <Link href={`/pokemon/${p.name}`}>
                {p.name.replaceAll("-", " ")}
              </Link>
            </li>
          )
        )}
      </ul>
    </main>
  );
}
