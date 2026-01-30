import Link from "next/link";
import BackButton from "@/app/components/BackButton";

async function getLocations() {
const res = await fetch(
"https://pokeapi.co/api/v2/location-area?limit=100"
);
if (!res.ok) throw new Error("Failed to fetch locations");
return res.json();
}

export default async function LocationsPage() {
const data = await getLocations();

return (
<main className="p-4 max-w-3xl mx-auto">
  <h1 className="text-2xl font-bold mb-4">Locations</h1>

  <BackButton />
  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
    {data.results.map((loc: { name: string }) => (
<li key={loc.name} className="h-full">
<Link
href={`/locations/${loc.name}`}
className="flex h-full items-center justify-center p-3 border rounded text-center"
>
{loc.name.replaceAll("-", " ")}
</Link>
</li>

    ))}
  </ul>
</main>
);
}

