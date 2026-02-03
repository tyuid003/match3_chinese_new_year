export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') || 10)));

  const { results } = await env.DB.prepare(
    'SELECT first_name, last_name, phone, score FROM scores ORDER BY score DESC, created_at ASC LIMIT ?'
  ).bind(limit).all();

  const items = (results || []).map(r => ({
    firstName: r.first_name,
    lastName: r.last_name,
    phone: maskPhone(r.phone),
    score: r.score
  }));

  return new Response(JSON.stringify({ items }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

function maskPhone(phone) {
  const str = String(phone || '');
  if (str.length <= 4) return str;
  return str.slice(0, -4).replace(/\d/g, '*') + str.slice(-4);
}
