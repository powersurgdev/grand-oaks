# Deployment Guide

## Local Development + Replit Hosting Workflow

### Local Development

1. **Start local server:**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000

2. **Make your changes** using Claude Code

3. **Test locally** - everything works the same as production

### Deploy to Replit

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Push to Replit:**
   ```bash
   git push replit main
   ```

3. **Replit will automatically:**
   - Run `npm install`
   - Run `npm run build`
   - Run `npm run start`
   - Deploy to your live URL

### Environment Variables in Replit

Make sure these are set in Replit Secrets (🔒 icon):

- `DATABASE_URL` - Auto-provisioned by Replit PostgreSQL
- `BLOG_ADMIN_PASSWORD` - Your secure admin password
- `NODE_ENV` - Set to `production`
- `PORT` - Set to `5000` (Replit default)
- `SENDGRID_API_KEY` - (Optional) For email notifications
- `PULSE_API_KEY` - (Optional) For CRM integration
- `PULSE_WEBHOOK_URL` - (Optional) For CRM integration

### Typical Workflow

```bash
# 1. Make changes locally with Claude Code
# 2. Test locally
npm run dev

# 3. When ready to deploy
git add .
git commit -m "Add new blog post feature"
git push replit main

# 4. Check your live site!
```

### Troubleshooting

**Local development not working?**
- Check PostgreSQL is running: `brew services list`
- Check .env file has correct DATABASE_URL

**Replit deployment failing?**
- Check Replit Secrets are set
- Check build logs in Replit console
- Make sure PostgreSQL is provisioned in Replit

**Database changes?**
- Locally: `npm run db:push`
- Replit: Will auto-run on deploy
