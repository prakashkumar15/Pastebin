import clientPromise from "@/src/utils/mongo";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false }, { status: 500 });
  }
}
