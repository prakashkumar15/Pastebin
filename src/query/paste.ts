type Paste = {
  content: string;
  remaining_views: number;
  expires_at: string;
};

export async function getPaste(id: string): Promise<Paste> {
  const res = await fetch(`/api/pastes/${id}`);

  if (!res.ok) {
    throw new Error("Paste not found");
  }

  return res.json();
}
