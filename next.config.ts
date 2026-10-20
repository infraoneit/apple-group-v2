import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Bildformate wählt auf Netlify das Image CDN selbst (AVIF oder WebP je nach Browser).
  // Die Einstellung gilt nur für npm start ausserhalb von Netlify.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Erlaubt die Vorschau über 127.0.0.1 (z. B. im Browser-Fenster des Editors) im Entwicklungsmodus.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/keystatic/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
      {
        source: '/api/keystatic/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        ],
      },
    ];
  },
};

export default nextConfig;
