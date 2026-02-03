export async function onRequestPut({ request, env }) {
  try {
    const body = await request.json();
    const userId = (body.user_id || '').trim();
    const firstName = body.first_name !== undefined ? String(body.first_name).trim() : null;
    const lastName = body.last_name !== undefined ? String(body.last_name).trim() : null;
    const phone = body.phone !== undefined ? String(body.phone).trim() : null;
    const score = body.score !== undefined ? Number(body.score) : null;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const fields = [];
    const values = [];
    if (firstName !== null) { fields.push('first_name = ?'); values.push(firstName); }
    if (lastName !== null) { fields.push('last_name = ?'); values.push(lastName); }
    if (phone !== null) { fields.push('phone = ?'); values.push(phone); }
    if (score !== null && Number.isFinite(score)) { fields.push('score = ?'); values.push(Math.floor(score)); }

    if (fields.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    fields.push('updated_at = datetime("now")');
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`;
    values.push(userId);

    await env.DB.prepare(sql).bind(...values).run();

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

export async function onRequestDelete({ request, env }) {
  try {
    const body = await request.json();
    const userId = (body.user_id || '').trim();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare('DELETE FROM users WHERE user_id = ?').bind(userId).run();

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
