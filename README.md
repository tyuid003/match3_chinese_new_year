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


1.หน้าแอดมินจะมีช่องออกลิ้งก์สำหรับให้ลูกค้าเล่นเกม
- แอดมินกรอก USER_ID , ชื่อ-นามสกุล , เบอร์โทรศัพท์ ของลูกค้า แล้วบันทึกข้อมูลลงD1
- ออกลิ้งเช่น https://example.com/play?u={USER_ID}
- ปุ่มคิดลอกลิ้งก์ (เพื่อไว้ส่งให้ลูกค้า)
- ตารางแสดงรายชื่อลูกค้า สามารถกดแก้ไขชื่อนามสกุล เบอรโทรลูกค้าได้ (กรณีใส่ผิด) แก้สกอร์ได้เผื่อเกิดข้อผิดพลาด สามารถลบรายชื่อออกได้

2.หลังจากลูกค้าเล่นจบ ให้บันทึกสกอร์ลูกค้าตามยูสเซอร์ที่บันทึกไว้ในข้อ 1
- พร้อมใส่ finish:true ลงในฐานข้อมูลเพื่อเป็นเงื่อนไขว่าลูกค้าจะรับรางวัลได้รอบเดียวแต่จะเล่นเกมใหม่กี่ครั้งก็ได้

3.หลังจากลูกค้าบันทึกที่อยู่แล้วลูกค้าสามารถกลับไปเล่นเกมกี่ครั้งก็ได้แต่ว่าจะไม่สามาถรรับรางวัลได้เพราะว่ามีสถานะ finish:true 