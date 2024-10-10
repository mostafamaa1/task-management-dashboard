import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// Secret for token verification
const secret = process.env.AUTH_SECRET;

export async function authMiddleware(request: NextRequest) {
  // Extract the JWT from the request using next-auth's getToken
  const token = await getToken({ req: request, secret });

  if (!token) {
    return { isValid: false };
  }
  // If the token exists, validate its expiration
  const isExpired = typeof token.exp === 'number' && Date.now() >= token.exp * 1000;
  if (isExpired) {
    return { isValid: false };
  }

  // If the token is valid and not expired
  return { isValid: true, token };
}
