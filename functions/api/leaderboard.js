export async function onRequestGet() {
  return new Response(JSON.stringify({ error: 'Deprecated endpoint' }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
}
