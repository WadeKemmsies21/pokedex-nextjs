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
  <main className="p-4 max-w-3xl mx-auto space-y-6">
    <BackButton />

    {/* Title */}
    <h1 className="text-3xl font-bold capitalize">
      {move.name.replaceAll("-", " ")}
    </h1>

    {/* Move Stats Card */}
    <section className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-3">
        Move Stats
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="border rounded p-2">
          <p className="text-sm text-gray-500">Accuracy</p>
          <p className="text-lg font-semibold">
            {move.accuracy ?? "N/A"}
          </p>
        </div>

        <div className="border rounded p-2">
          <p className="text-sm text-gray-500">Power</p>
          <p className="text-lg font-semibold">
            {move.power ?? "N/A"}
          </p>
        </div>

        <div className="border rounded p-2">
          <p className="text-sm text-gray-500">PP</p>
          <p className="text-lg font-semibold">
            {move.pp}
          </p>
        </div>
      </div>
    </section>

    {/* Flavor Text Card */}
    <section className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-3">
        Flavor Text
      </h2>

      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {move.flavor_text_entries
          .filter((entry: any) => entry.language.name === "en")
          .map((entry: any, index: number) => (
            <li key={index} className="text-sm">
              <strong className="capitalize">
                {entry.version_group.name.replaceAll("-", " ")}:
              </strong>{" "}
              {entry.flavor_text.replace(/\n|\f/g, " ")}
            </li>
          ))}
      </ul>
    </section>

    {/* Pokemon List Card */}
    <section className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-3">
        Pokémon That Learn This Move
      </h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {move.learned_by_pokemon.map(
          (p: { name: string }) => (
            <li key={p.name}>
              <Link
                href={`/pokemon/${p.name}`}
                className="block border rounded p-2 text-center capitalize hover:bg-gray-100 transition"
              >
                {p.name.replaceAll("-", " ")}
              </Link>
            </li>
          )
        )}
      </ul>
    </section>
  </main>
);

}
