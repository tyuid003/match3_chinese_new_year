export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const userId = (body.user_id || '').trim();
    const score = Number(body.score || 0);

    if (!userId || !Number.isFinite(score)) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { results } = await env.DB.prepare(
      'SELECT score FROM users WHERE user_id = ?'
    ).bind(userId).all();

    if (!results || results.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const currentScore = Number(results[0].score || 0);
    const nextScore = Math.max(currentScore, Math.floor(score));

    await env.DB.prepare(
      'UPDATE users SET score = ?, finish = 1, updated_at = datetime("now") WHERE user_id = ?'
    ).bind(nextScore, userId).run();

    return new Response(JSON.stringify({ ok: true, score: nextScore }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
