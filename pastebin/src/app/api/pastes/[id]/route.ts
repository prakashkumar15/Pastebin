import { COLLECTIONS } from "@/src/utils/constants";
import { getDb } from "@/src/utils/mongo";
import { getNow } from "@/src/utils/time";
import { ObjectId } from "mongodb";
export interface Paste {
  _id: ObjectId;
  note: string;
  expires_at: Date | null;
  max_views: number | null;
  views: number;
}
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const now = getNow(request);
  const db = await getDb();

  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid paste id" }, { status: 400 });
  }

  const paste = await db
    .collection<Paste>(COLLECTIONS.NOTES)
    .findOne({ _id: new ObjectId(id) });

  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (paste.expires_at && paste.expires_at < now) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (paste.max_views !== null && paste.views >= paste.max_views) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  await db
    .collection(COLLECTIONS.NOTES)
    .updateOne({ _id: paste._id }, { $inc: { views: 1 } });

  const remainingViews =
    paste.max_views === null
      ? null
      : Math.max(paste.max_views - (paste.views + 1), 0);

  return Response.json({
    content: paste.note,
    remaining_views: remainingViews,
    expires_at: paste.expires_at,
  });
}
