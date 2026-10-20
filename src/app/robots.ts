import type { MetadataRoute } from 'next';
import { DOMAIN } from '@/site.config';

/**
 * Netlify setzt CONTEXT beim Build: "production", "deploy-preview" oder "branch-deploy".
 * Nur die produktive Seite darf von Google erfasst werden.
 */
export default function robots(): MetadataRoute.Robots {
  const produktiv = process.env.CONTEXT === 'production';

  if (!produktiv) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/keystatic', '/api/'] }],
    sitemap: new URL('/sitemap.xml', DOMAIN).toString(),
  };
}
