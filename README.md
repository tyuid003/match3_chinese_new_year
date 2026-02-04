# 🧧 Match3 Chinese New Year Game

**A fun and interactive Match3 puzzle game with Chinese New Year theme, featuring reward envelopes (ang pao) and user management system.**

---

## 🎮 Features

### Game Features
- **5x5 Match-3 Grid** - Classic match-3 gameplay with 5 tile types
- **Dual Input Methods**:
  - Drag tiles smoothly with 40% threshold for half-drag swaps
  - Click consecutive tiles to swap (2-tap method)
  - 700ms smooth 3D flip animation on interactions
- **30 Moves Per Game** - Limited moves to increase challenge
- **Combo System** - Chain multiple matches for bonus points
- **Helper Powers** - 4 special power-ups unlocked at 20 tile destructions each:
  - 🎁 **+5 Moves** - Extend your gameplay
  - 🦁 **Lion** - Destroy all tiles of one type
  - ❌ **X Blast** - Cross-pattern destruction
  - 💣 **Wide Blast** - 3x3 area destruction
- **Auto-Hint System** - Shows valid moves after 10 seconds of inactivity
- **Deadlock Detection** - Automatically shuffles board when no moves available
- **Optimized Image Loading** - Preloaded images prevent flickering and jank

### Reward Flow
- **Game Completion** → **Reward Envelope Selection** → **Address Form Submission**
- **Red Envelope UI** - 3 interactive envelopes with:
  - Fan-style layout (overlapping animation)
  - 700ms 3D flip animation when selected
  - 1.2s reveal animation when opening
  - Responsive design for mobile and desktop

### Admin Panel
- **User Management** - Create, edit, delete players
- **Link Generation** - Copy personalized game links for players
- **Reward Tracking** - View claimed rewards and delivery addresses
- **Copy Feedback** - Toast notifications for successful actions
- **Delete Confirmation** - Popup confirmation to prevent accidents

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** / **CSS3** / **Vanilla JavaScript**
- **No frameworks** - Pure web standards
- **Responsive Design** - Works on mobile, tablet, and desktop
- **CSS Animations** - Smooth transitions and visual feedback
- **LocalStorage** - Session persistence

### Backend
- **Cloudflare Pages** - Static site hosting
- **Cloudflare Workers** - Serverless API endpoints
- **Cloudflare D1** - SQLite database
- **REST API** - `/api/*` endpoints

### Database Schema
```sql
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  score INTEGER DEFAULT 0,
  finish BOOLEAN DEFAULT 0,
  claimed BOOLEAN DEFAULT 0,
  address TEXT,
  subdistrict TEXT,
  district TEXT,
  province TEXT,
  postal_code TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

---

## 📁 Project Structure

```
match3_chinese_new_year/
├── index.html              # Main game file
├── redenvelope.html        # Reward envelope selection
├── address.html            # Address submission form
├── admin/
│   └── index.html          # Admin panel
├── functions/
│   └── api/
│       ├── user.js         # User data endpoint
│       ├── score.js        # Score submission endpoint
│       ├── address.js      # Address submission endpoint
│       ├── leaderboard.js  # Leaderboard endpoint
│       └── admin/
│           ├── user.js     # Admin user operations
│           └── users.js    # Admin user list endpoint
├── images/                 # Game assets
├── sounds/                 # Audio effects
├── wrangler.toml          # Cloudflare configuration
└── schema.sql             # Database schema
```

---

## 🚀 Deployment

### Prerequisites
- **Git** - Version control
- **Node.js** - Runtime environment
- **Wrangler CLI** - Cloudflare deployment tool
- **GitHub Account** - For code repository
- **Cloudflare Account** - For hosting and database

### Quick Start

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment steps.

**Summary:**
1. Install Wrangler: `npm install -g wrangler`
2. Configure database: `wrangler d1 create match3-db`
3. Deploy: `wrangler pages deploy . --project-name=match3-chinese-new-year`

---

## 🎯 User Workflows

### Admin Workflow
1. **Create Player**: Fill USER_ID, name, phone → Save
2. **Copy Link**: Click "คัดลอกลิงก์" → Share with player
3. **Track Progress**: View score, finish status, claimed status
4. **View Details**: Click ✔ on claimed column to see delivery address
5. **Edit/Delete**: Update player info or remove if needed

### Player Workflow
1. **Start Game**: Visit link `?u=USER_ID` → Complete tutorial → Play
2. **Finish Game**: Destroy tiles → Click "รับรางวัล" (Claim Reward)
3. **Select Envelope**: Choose from 3 envelopes → Watch flip animation
4. **Open Envelope**: Click "รับอั่งเปา" → See reward reveal
5. **Submit Address**: Fill delivery info → Complete
6. **Re-entry**: Can play again but reward given only once per link

---

## 📊 Game Balance

| Parameter | Value | Notes |
|-----------|-------|-------|
| Grid Size | 5x5 | 25 tiles total |
| Tile Types | 5 | Each with unique image |
| Starting Moves | 30 | Increase with helpers |
| Helper Unlock | 20 | Destructions needed per power |
| Match Minimum | 3 | Horizontal or vertical |
| Drag Threshold | 40% | Of tile + gap size |
| Tap Threshold | 10px | To distinguish from drag |
| Hint Delay | 10s | Idle time before showing hint |

---

## 🎨 Visual Features

### Animations
- **Tile Flip** - 700ms 3D rotation when dragging
- **Envelope Flip** - 700ms 3D card reveal when selected
- **Envelope Open** - 1.2s reveal animation when opening
- **Tile Drop** - Smooth falling with easing curve
- **Removal Effects** - Shake → Shrink → Vanish sequence
- **Combo Sound** - Do-Re-Mi musical sequence
- **Helper Activation** - Center popup with sound effect

### Mobile Responsive
- **Tile Size** - 60px on mobile, 70px on desktop
- **Layout** - Adapts for different screen sizes
- **Touch** - Full touch support for drag and tap
- **Performance** - Optimized image preloading

---

## 🔒 Data & Security

- **User IDs** - Primary identifier (no passwords)
- **API Validation** - Server-side checks on all operations
- **Database** - D1 SQLite with ACID transactions
- **Address Privacy** - Used only for delivery
- **Single Reward** - Enforced via `finish` flag

---

## 🎉 Campaign Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Duration | 7-10 days | Chinese New Year period |
| Max Players | 500 | Limit for Cloudflare free tier |
| Game Links | Per player | Unique tracking via user_id |
| Reward Type | Voucher | Configured in envelope details |
| Delivery Method | Address submission | Collected via form |

---

## 📝 License

Created for Chinese New Year celebration events.

---

## 🎉 Enjoy!

**เล่นเกม • รับอั่งเปา • สนุกสุขสันต์!**

*Happy Chinese New Year!* 🧧🎆🏮

เสร็จแล้ว อัพขึ้น repo , deploy ขึ้น page ให้ด้วย THX