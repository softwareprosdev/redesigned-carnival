import { createSupabaseMiddlewareClient } from '@dental-prodigy/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createSupabaseMiddlewareClient(req, res);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If accessing dashboard without session, redirect to login
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // If accessing login page (root) with session, redirect to dashboard
  if (req.nextUrl.pathname === '/') {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
