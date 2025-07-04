export async function GET() {
  const apiKey = process.env.DATA_API_KEY;
  if (!apiKey) {
    throw new Error("API 키가 없습니다. API키를 확인해 주세요");
  }

  const res = await fetch("https://data.mongodb-api.com/...", {
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
