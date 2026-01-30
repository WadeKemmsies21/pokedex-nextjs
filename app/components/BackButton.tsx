"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      style={{
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        cursor: "pointer",
      }}
    >
      ← Back
    </button>
  );
}
