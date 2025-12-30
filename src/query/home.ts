type CreatePastebin = {
  content: string;
  ttl_seconds: number;
  max_views: number;
};

type CreatePasteResponse = {
  url?: string;
  error?: string;
};

export async function createPaste(
  pasteData: CreatePastebin
): Promise<CreatePasteResponse> {
  const res = await fetch("/api/pastes", {
    method: "POST",
    body: JSON.stringify(pasteData),
  });

  if (!res.ok) {
    throw new Error("Failed to create paste");
  }

  return res.json();
}
