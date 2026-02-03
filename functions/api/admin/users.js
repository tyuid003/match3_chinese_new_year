export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    'SELECT user_id, first_name, last_name, phone, score, finish, claimed, address, subdistrict, district, province, postal_code, created_at, updated_at FROM users ORDER BY created_at DESC'
  ).all();

  const items = (results || []).map(r => ({
    user_id: r.user_id,
    first_name: r.first_name,
    last_name: r.last_name,
    phone: r.phone,
    score: r.score,
    finish: !!r.finish,
    claimed: !!r.claimed,
    address: r.address || '',
    subdistrict: r.subdistrict || '',
    district: r.district || '',
    province: r.province || '',
    postal_code: r.postal_code || '',
    created_at: r.created_at,
    updated_at: r.updated_at
  }));

  return new Response(JSON.stringify({ items }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const userId = (body.user_id || '').trim();
    const firstName = (body.first_name || '').trim();
    const lastName = (body.last_name || '').trim();
    const phone = (body.phone || '').trim();

    if (!userId || !firstName || !lastName || !phone) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existing = await env.DB.prepare(
      'SELECT user_id FROM users WHERE user_id = ?'
    ).bind(userId).all();

    if (existing.results && existing.results.length > 0) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(
      'INSERT INTO users (user_id, first_name, last_name, phone, score, finish, claimed, created_at, updated_at) VALUES (?, ?, ?, ?, 0, 0, 0, datetime("now"), datetime("now"))'
    ).bind(userId, firstName, lastName, phone).run();

    return new Response(JSON.stringify({ ok: true }), {
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
