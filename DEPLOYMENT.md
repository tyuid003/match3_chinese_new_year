# 🚀 Deployment Guide

**Step-by-step instructions for deploying the Match3 Chinese New Year game to Cloudflare Pages with D1 database.**

---

## 📋 Prerequisites

Make sure you have the following installed:

1. **Git** - Version control system
   - Download: https://git-scm.com/download/win
   - Verify: `git --version`

2. **Node.js** - JavaScript runtime
   - Download: https://nodejs.org/ (LTS version)
   - Verify: `node --version` and `npm --version`

3. **Wrangler CLI** - Cloudflare deployment tool
   - Install: `npm install -g wrangler`
   - Verify: `wrangler --version`

4. **GitHub Account** - For code repository
   - Create at: https://github.com

5. **Cloudflare Account** - For hosting and database
   - Create at: https://dash.cloudflare.com/

---

## 🔧 Initial Setup (First Time Only)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `match3-chinese-new-year`
3. Description: `Match3 Chinese New Year game with Cloudflare Pages and D1`
4. Choose **Public** or **Private** (as needed)
5. Click **Create repository**
6. Copy the repository URL (e.g., `https://github.com/your-username/match3-chinese-new-year.git`)

### Step 2: Clone Repository Locally

```bash
git clone https://github.com/your-username/match3-chinese-new-year.git
cd match3-chinese-new-year
```

### Step 3: Initialize Git and Push Code

```bash
# If you already have local files, copy them into the cloned directory
# Then add to git:
git add .
git commit -m "Initial commit: Match3 Chinese New Year game"
git push -u origin main
```

### Step 4: Create Cloudflare D1 Database

```bash
# Create a new D1 database
wrangler d1 create match3-db

# This will output:
# [✓] Successfully created DB 'match3-db'
# 
# Database ID: e4f2fd0b-b009-4895-8f5a-0240cd975d4e
# Copy this ID for the next step
```

### Step 5: Apply Database Schema

```bash
# Apply schema.sql to your D1 database
wrangler d1 execute match3-db --file schema.sql

# Verify with:
wrangler d1 execute match3-db --command "SELECT name FROM sqlite_master WHERE type='table';"
# Should return: users table
```

### Step 6: Configure wrangler.toml

Update `wrangler.toml` with your database ID and settings:

```toml
name = "match3-chinese-new-year"
pages_build_output_dir = ""
compatibility_date = "2024-01-01"

[env.production]
name = "match3-chinese-new-year-prod"
routes = [
  { pattern = "example.com/api/*", zone_name = "example.com" }
]

[[d1_databases]]
binding = "DB"
database_name = "match3-db"
database_id = "e4f2fd0b-b009-4895-8f5a-0240cd975d4e"  # <-- YOUR DB ID HERE
```

### Step 7: Deploy to Cloudflare Pages

```bash
# First deployment (linking to Cloudflare Pages)
wrangler pages deploy . --project-name=match3-chinese-new-year --branch=main

# Output will show:
# ✨ Deployment complete!
# https://[random-id].match3-chinese-new-year.pages.dev
```

### Step 8: Verify Deployment

1. Visit the deployment URL (e.g., `https://[random-id].match3-chinese-new-year.pages.dev`)
2. Test the game loads correctly
3. Test admin panel: `/admin/index.html`
4. Test API endpoints: `/api/leaderboard`

---

## 📝 Regular Deployment Workflow

Once initial setup is complete, use this workflow for updates:

### Step 1: Make Code Changes

Edit files as needed:
- `index.html` - Main game
- `redenvelope.html` - Envelope UI
- `address.html` - Address form
- `admin/index.html` - Admin panel
- `functions/api/*.js` - API endpoints

### Step 2: Test Locally (Optional)

```bash
# Start local dev server
wrangler pages dev .

# Visit http://localhost:8788 to test
```

### Step 3: Commit Changes

```bash
git add -A
git commit -m "Description of changes"
```

Examples:
```bash
# Good commit messages:
git commit -m "Add image preloading system to reduce jank"
git commit -m "Fix drag threshold from 50% to 40%"
git commit -m "Add toast notifications to admin panel"
git commit -m "Create README and deployment guide"
```

### Step 4: Push to GitHub

```bash
git push origin main
```

### Step 5: Deploy to Cloudflare Pages

```bash
# Deploy the latest changes
wrangler pages deploy . --project-name=match3-chinese-new-year --branch=main

# Output shows new deployment URL:
# ✨ Deployment complete!
# https://[new-random-id].match3-chinese-new-year.pages.dev
```

### Step 6: Update Game Links (If Needed)

Each deployment gets a new random URL. To use a consistent domain:

1. Link a custom domain in Cloudflare Dashboard
2. Or set up a CNAME record pointing to your Pages project
3. Update admin panel links to use your domain

---

## 📦 Full Deployment Checklist

```bash
# Copy this and run in order:

# 1. Check git status
git status

# 2. Stage all changes
git add -A

# 3. Verify changes
git diff --cached

# 4. Commit with descriptive message
git commit -m "Your change description here"

# 5. Push to GitHub
git push origin main

# 6. Deploy to Cloudflare Pages
wrangler pages deploy . --project-name=match3-chinese-new-year --branch=main

# 7. Verify deployment
# Visit the URL from step 6 output
```

---

## 🔄 Common Deployment Commands

| Task | Command |
|------|---------|
| Check git changes | `git status` |
| Add all changes | `git add -A` |
| Commit changes | `git commit -m "message"` |
| Push to GitHub | `git push origin main` |
| Deploy to Pages | `wrangler pages deploy . --project-name=match3-chinese-new-year --branch=main` |
| View local dev | `wrangler pages dev .` |
| Check D1 tables | `wrangler d1 execute match3-db --command "SELECT * FROM users LIMIT 5;"` |
| Update database | `wrangler d1 execute match3-db --file schema.sql` |

---

## 🐛 Troubleshooting

### Issue: "Database not found"
```bash
# Re-create the database
wrangler d1 create match3-db

# Re-apply schema
wrangler d1 execute match3-db --file schema.sql

# Update wrangler.toml with new database ID
```

### Issue: "Deploy fails - files not found"
```bash
# Ensure you're in the project root directory
ls index.html  # Should exist
ls functions/  # Should exist

# Try deploying again
wrangler pages deploy . --project-name=match3-chinese-new-year
```

### Issue: "Admin API returns 404"
```bash
# Check that functions folder exists
ls functions/api/admin/

# Redeploy with full path
wrangler pages deploy .
```

### Issue: "Images not loading"
```bash
# Check images folder exists
ls images/

# Verify image filenames in index.html match actual files
# Redeploy
wrangler pages deploy .
```

### Issue: "Git push fails - permission denied"
```bash
# Set up SSH key or use Personal Access Token
# Or use HTTPS with GitHub credentials

# Try:
git push origin main --verbose

# If still failing, add origin:
git remote set-url origin https://github.com/your-username/match3-chinese-new-year.git
```

---

## 📊 Environment Variables

If you need to configure environment variables:

```toml
# In wrangler.toml:
[env.production]
vars = { ENVIRONMENT = "production" }

# In functions:
export default {
  async fetch(request, env) {
    console.log(env.ENVIRONMENT)  // "production"
    return new Response("OK")
  }
}
```

---

## 🔐 Security Checklist

- [ ] Database ID not shared publicly
- [ ] Personal API tokens kept secret
- [ ] Admin panel access controlled (consider .htaccess or auth)
- [ ] Sensitive data removed from git history
- [ ] GitHub repository set to Private if needed
- [ ] D1 database with proper schema validation

---

## 📞 Support

**Cloudflare Docs:**
- Pages: https://developers.cloudflare.com/pages/
- D1: https://developers.cloudflare.com/d1/
- Workers: https://developers.cloudflare.com/workers/

**Wrangler CLI:**
- Docs: https://developers.cloudflare.com/workers/wrangler/
- GitHub: https://github.com/cloudflare/wrangler2

**Git Help:**
- Official: https://git-scm.com/doc
- Quick Ref: https://git-scm.com/docs/git-cheat-sheet

---

## 🎉 Success!

Your Match3 Chinese New Year game is now live! 🧧🎆

**Share the link with players and enjoy!**

*Happy Chinese New Year!* 🏮
