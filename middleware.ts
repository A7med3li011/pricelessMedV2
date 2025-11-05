import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware({
       ...routing,
       // Ensure locale is always maintained in URL
       localePrefix: "always",
       // Handle default locale redirects properly
       defaultLocale: "en",
});

export const config = {     
       // Match all paths except API routes, static files, and Next.js internals
       matcher: [
              // Match all pathnames except for
              // - API routes
              // - _next (Next.js internals)
              // - _static (inside /public)
              // - all files in the public folder
              "/((?!api|_next|_static|.*\\..*|_vercel).*)",
       ],
};