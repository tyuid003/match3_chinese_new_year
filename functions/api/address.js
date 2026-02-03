export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const userId = (body.user_id || '').trim();
    const address = (body.address || '').trim();
    const subdistrict = (body.subdistrict || '').trim();
    const district = (body.district || '').trim();
    const province = (body.province || '').trim();
    const postalCode = (body.postal_code || '').trim();

    if (!userId || !address || !subdistrict || !district || !province || !postalCode) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { results } = await env.DB.prepare(
      'SELECT claimed FROM users WHERE user_id = ?'
    ).bind(userId).all();

    if (!results || results.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(
      'UPDATE users SET address = ?, subdistrict = ?, district = ?, province = ?, postal_code = ?, claimed = 1, finish = 1, updated_at = datetime("now") WHERE user_id = ?'
    ).bind(address, subdistrict, district, province, postalCode, userId).run();

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
