import { useEffect, useState } from "react";
import { getPaste } from "../query/paste";

type Paste = {
  content: string;
  remaining_views: number;
  expires_at: string;
};

export function usePaste(id: string) {
  const [paste, setPaste] = useState<Paste | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getPaste(id)
      .then(setPaste)
      .catch((err) => setError(err.message));
  }, [id]);

  return {
    paste,
    error,
  };
}
