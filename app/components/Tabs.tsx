"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  { name: "Pokemon", href: "/pokemon" },
  { name: "Locations", href: "/locations" },
  { name: "Moves", href: "/moves" },
  { name: "Generations", href: "/generations" },
];

export default function Tabs() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="flex gap-2 mb-4 flex-wrap justify-center max-w-3xl mx-auto">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={active ? "tab active" : "tab"}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
