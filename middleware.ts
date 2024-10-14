// import { NextResponse, NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {
//  // Get token from next-auth/jwt
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });

//   const { pathname } = req.nextUrl;

//   // Allow requests if:
//   // 1. It's a NextAuth request (signIn, signOut, etc.)
//   // 2. A valid token is present
//   if (pathname.startsWith('/api/auth') || token) {
//     return NextResponse.next(); // Allow access
//   }

//   // If no token is found and the route is protected, return an unauthorized response
//   if (pathname.startsWith('/api')) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   // For non-API routes, you can redirect to login if no token is present
//   if (!token) {
//     const loginUrl = new URL('/login', req.url);
//     return NextResponse.redirect(loginUrl); // Redirect to login
//   }

//   return NextResponse.next();
// }

// // Configure the middleware to protect API and main routes
// export const config = {
//   matcher: ['/', '/api/:path*'], // Match the routes you want to protect
// };

// middleware.ts
// import { chain } from './middlewares/chain';
// import { withI18nMiddleware } from './middlewares/withI18nMiddleware';
// import { withAuthMiddleware } from './middlewares/withAuthMiddleware';

// export default chain([withI18nMiddleware, withAuthMiddleware]);

// export const config = {
//  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)', '/', '/(ar|en)/:path*'],
// };

// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };

//middleware.ts
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';
// import { withAuth } from 'next-auth/middleware';
// import { NextRequest } from 'next/server';

// const intlMiddleware = createMiddleware(routing);

// const authMiddleware = withAuth(
//   function onSuccess(req) {
//     const locale = req.nextUrl.locale || routing.defaultLocale; // default locale if not set
//     req.nextUrl.pathname = `/${locale}/login`; // redirect to localized login page
//     return intlMiddleware(req);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token != null,
//     },
//     pages: {
//       signIn: '`/${req.nextUrl.locale}/login`',
//     },
//   },
// );

// export default function middleware(req: NextRequest) {
//   const excludePattern = '^(/(' + routing.locales.join('|') + '))?/api/?.*?$';
//   const publicPathnameRegex = RegExp(excludePattern, 'i');
//   const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

//   if (isPublicPage) {
//     return intlMiddleware(req);
//   } else {
//     return (authMiddleware as any)(req);
//   }
// }

// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)'],
// };

// middleware.ts

import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

export default createMiddleware({
  // Use this locale when we can't match
  // another with our user's preferred locales
  // and when no locale is explicitly set.
  defaultLocale: "en",

  // List all supported locales (en-us, ar-eg).
  locales,

  // Automatic locale detection is enabled by
  // default. We're disabling it to keep things
  // simple for now. We'll enable it later when
  // we cover locale detection.
  // localeDetection: false,
});
// Our middleware only applies to routes that
// match the following:
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
