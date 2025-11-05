import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
        locale: false, // مهم جداً: لتطبيق القاعدة على جميع اللغات
      },
    ]
  },
  /* config options here */

  cacheComponents: true,

  images: {
    remotePatterns: [{ hostname: "cdn.pricelessmed.com" }],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};
// const withNextIntl = createNextIntlPlugin();
const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts')

export default withNextIntl(nextConfig);
