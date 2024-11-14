import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt_decode from 'jwt-decode';

import { getUserData } from './lib/session';

const validateAuthentication = async (token: undefined | string) => {
  'use server';
  if (token) {
    // Non Null Assertion ! will remove undefined and null from a type without doing any explicit type checking
    const decoded: any = jwt_decode(token as string);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      cookies().delete('accessToken');
      return false;
    }
    if (token) {
      return await getUserData(token);
    }
    return true;
  } else {
    return false;
  }
};

export default async function middleware(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', req.nextUrl.pathname);
    const nextAuthSid = cookies().get('accessToken')?.value;
    const excludedPaths = ['/', '/login', '/forgot-password', '/reset-password'];
    const status = (await validateAuthentication(nextAuthSid as string)) as boolean;

    if (!status && !excludedPaths.includes(req.nextUrl.pathname as string)) {
      return NextResponse.redirect(new URL(`/login`, req.url));
    }
    if (status && excludedPaths.includes(req.nextUrl.pathname as string)) {
      return NextResponse.redirect(new URL(`/dashboard`, req.url));
    }
    // }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log({ error });
  }
}

export const config = {
  matcher: [
    '/((?!api|pyserve|images|files|assets|_next/static|_next/image|favicon.ico|reset-password|create-password|about-us|terms-and-condition|privacy-policy).*)',
    // '/api/auth/[...nextauth]',
  ],
};
