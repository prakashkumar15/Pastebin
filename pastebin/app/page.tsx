import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white  sm:items-start">
        {" "}
        <input
          type="text"
          placeholder="Paste your text here..."
          className="w-full rounded-md border border-gray-300 p-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </main>
    </div>
  );
}
