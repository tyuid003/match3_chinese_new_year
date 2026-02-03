# Match3 Chinese New Year

Cloudflare Pages + D1 setup.

## D1 Schema
Run the SQL in `schema.sql` on your D1 database.

## Bindings
Update `wrangler.toml` with your D1 database ID.

## Deploy
1) Create a D1 database named `match3_scores`.
2) Apply schema from `schema.sql`.
3) Deploy with Cloudflare Pages (Functions folder is auto-detected).

## API
- POST `/api/score` { firstName, lastName, phone, score }
- GET `/api/leaderboard?limit=10`
