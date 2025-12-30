import { COLLECTIONS } from "@/src/utils/constants";
import { getDb } from "@/src/utils/mongo";
import { getNow } from "@/src/utils/time";

export async function POST(request: Request) {
  let body: any;
  const now = getNow(request);
  const db = await getDb();

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !body?.content ||
    typeof body.content !== "string" ||
    body.content.trim().length === 0
  ) {
    return Response.json(
      { error: "Content is required and must be a non-empty string" },
      { status: 400 }
    );
  }
  const expires_at =
    typeof body.ttl_seconds === "number"
      ? new Date(now.getTime() + body.ttl_seconds * 1000)
      : null;

  const result = await db.collection(COLLECTIONS.NOTES).insertOne({
    note: body.content.trim(),
    max_views: body.max_views,
    views: 0,
    expires_at: expires_at,
  });

  if (!result.acknowledged) {
    return Response.json({ error: "Failed to save paste" }, { status: 500 });
  }

  return Response.json({
    id: result.insertedId.toString(),
    url: `${process.env.SITE_URL}/p/${result.insertedId.toString()}`,
  });
}
