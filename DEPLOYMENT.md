# Vercel Deployment Guide

This guide covers deploying the PayMe Protocol Expo web app to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed: `npm install -g vercel`
- Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a Git repository
2. Go to https://vercel.com/new
3. Import your repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Configuration

The project includes a `vercel.json` configuration file with:

### Build Settings
- **Build Command**: `npx expo export --platform web`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Dev Command**: `npx expo start --web`

### Routing
- SPA routing configured with catch-all rewrite to `/index.html`
- Supports React Navigation web routing

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### Caching
- Static assets cached for 1 year (immutable)
- HTML files not cached (always fresh)

## Environment Variables

No environment variables are required for this demo app. If you add backend integration:

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add your variables (e.g., API_URL, API_KEY)
3. Redeploy for changes to take effect

## Build Process

When you deploy, Vercel will:

1. Install dependencies with `npm install`
2. Run `npx expo export --platform web`
3. Output static files to `dist/` directory
4. Deploy to Vercel's CDN

## Post-Deployment

After deployment, you'll receive:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: Unique URL for each branch/PR

### Testing Your Deployment

1. Open the production URL in a browser
2. Test on mobile devices (responsive design)
3. Verify all screens load correctly:
   - Onboarding screen
   - Dashboard
   - Transaction details
   - Settings

### Known Limitations on Web

- Haptic feedback not available (iOS/Android only)
- Biometric authentication not available (native only)
- Some React Native components may have limited web support
- Best experienced on mobile browsers for iOS-like feel

## Custom Domain

To add a custom domain:

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your domain (e.g., `payme.example.com`)
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Commits to `main` or `master` branch
- **Preview**: Commits to other branches and pull requests

### Branch Configuration

Configure in Vercel Dashboard → Project Settings → Git:
- Production Branch: `main`
- Preview Branches: All branches
- Auto-deploy: Enabled

## Troubleshooting

### Build Fails

Check build logs in Vercel Dashboard. Common issues:
- Missing dependencies: Ensure `package.json` is up to date
- TypeScript errors: Run `npm run build` locally first
- Memory issues: Contact Vercel support for build resource limits

### App Doesn't Load

- Check browser console for errors
- Verify `dist/` directory contains `index.html`
- Check Network tab for failed asset requests
- Ensure all imports use correct paths

### Routing Issues

- Verify `vercel.json` has the catch-all rewrite rule
- Test navigation between screens
- Check React Navigation web configuration

## Performance Optimization

### Recommendations

1. **Enable Compression**: Vercel automatically gzips assets
2. **Image Optimization**: Use Vercel Image Optimization for images
3. **Code Splitting**: Expo web handles this automatically
4. **Analytics**: Add Vercel Analytics for performance insights

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `App.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

## Monitoring

### Vercel Dashboard

Monitor your deployment:
- Real-time logs
- Build history
- Performance metrics
- Error tracking

### Health Checks

Vercel automatically monitors:
- Uptime
- Response times
- Error rates

## Rollback

To rollback to a previous deployment:

1. Go to Vercel Dashboard → Deployments
2. Find the working deployment
3. Click "..." → "Promote to Production"

## Support

- Vercel Documentation: https://vercel.com/docs
- Expo Web Documentation: https://docs.expo.dev/workflow/web/
- GitHub Issues: Report issues in your repository

## Deployment Checklist

Before deploying to production:

- [ ] Test locally with `npm run web`
- [ ] Run tests with `npm test`
- [ ] Update `app.json` version number
- [ ] Review `vercel.json` configuration
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Test on mobile devices
- [ ] Verify all assets load correctly
- [ ] Check console for errors
- [ ] Test all navigation flows
- [ ] Verify accessibility (VoiceOver, keyboard navigation)

## Cost

Vercel offers:
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for commercial projects
- **Enterprise**: Custom pricing

This demo app fits within the free tier limits.
