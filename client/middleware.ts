import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
 // Get token from next-auth/jwt
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests if:
  // 1. It's a NextAuth request (signIn, signOut, etc.)
  // 2. A valid token is present
  if (pathname.startsWith('/api/auth') || token) {
    return NextResponse.next(); // Allow access
  }

  // If no token is found and the route is protected, return an unauthorized response
  if (pathname.startsWith('/api')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // For non-API routes, you can redirect to login if no token is present
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl); // Redirect to login
  }

  return NextResponse.next();
}

// Configure the middleware to protect API and main routes
export const config = {
  matcher: ['/', '/api/:path*'], // Match the routes you want to protect
};

