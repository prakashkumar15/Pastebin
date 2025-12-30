"use client";

import { useParams } from "next/navigation";
import Navbar from "@/src/components/shared/navbar";
import { usePaste } from "@/src/hooks/paste";

export default function PastePage() {
  const { id } = useParams<{ id: string }>();
  const { paste, error } = usePaste(id);

  if (error) {
    return (
      <>
        <Navbar title="Pastebin" />
        <main className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <p className="text-2xl font-semibold text-red-600 mb-2">Error</p>
            <p className="text-gray-600">{error}</p>
          </div>
        </main>
      </>
    );
  }

  if (!paste) {
    return (
      <>
        <Navbar title="Pastebin" />
        <p className="p-6 text-gray-500">Loading…</p>
      </>
    );
  }

  return (
    <>
      <Navbar title="Pastebin" />
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-xl font-semibold mb-4">Pasted Content</h1>
        <pre className="whitespace-pre-wrap wrap-break-word rounded-md bg-gray-100 p-4 font-mono text-sm">
          {paste.content}
        </pre>
      </main>
    </>
  );
}
