import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminSession,
  isAdminConfigured,
  isAdminAuthenticated,
  isSameOrigin,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ authenticated: await isAdminAuthenticated(), configured: isAdminConfigured() }, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  const credentials = body && typeof body === "object"
    ? body as { email?: unknown; password?: unknown }
    : {};
  if (!verifyAdminCredentials(credentials.email, credentials.password)) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = createAdminSession();
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });
  (await cookies()).delete(ADMIN_COOKIE);
  return Response.json({ authenticated: false });
}
