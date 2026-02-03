export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const userId = (url.searchParams.get('u') || '').trim();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing user_id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { results } = await env.DB.prepare(
    'SELECT user_id, first_name, last_name, phone, score, finish, claimed FROM users WHERE user_id = ?'
  ).bind(userId).all();

  if (!results || results.length === 0) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const row = results[0];
  return new Response(JSON.stringify({
    user_id: row.user_id,
    first_name: row.first_name,
    last_name: row.last_name,
    phone: row.phone,
    score: row.score,
    finish: !!row.finish,
    claimed: !!row.claimed
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
