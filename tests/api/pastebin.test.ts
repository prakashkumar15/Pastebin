
const BASE_URL = process.env.SITE_URL || "http://localhost:3000";




describe("GET /api/healthz", () => {
  it("returns ok", async () => {
    const res = await fetch(`${BASE_URL}/api/healthz`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
  });
});


describe("Paste API", () => {
  let pasteId: string;

  it("creates a paste", async () => {
    const res = await fetch(`${BASE_URL}/api/pastes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "Hello test",
        ttl_seconds: 60,
        max_views: 2,
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    pasteId = json.id;

    expect(json.id).toBeDefined();
    expect(json.url).toContain("/p/");
  });

  it("fetches a paste", async () => {
    const res = await fetch(`${BASE_URL}/api/pastes/${pasteId}`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.content).toBe("Hello test");
    expect(json.remaining_views).toBe(1);
  });
});
