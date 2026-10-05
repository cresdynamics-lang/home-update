import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "home_update_admin";
const SESSION_SECONDS = 8 * 60 * 60;

function secretKey() {
  const secret = process.env.ADMIN_SECRET_KEY;
  return secret && secret.length >= 32 ? secret : null;
}

export function isAdminConfigured() {
  return Boolean(secretKey() && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

function signature(expires: string, secret: string) {
  return createHmac("sha256", secret).update(expires).digest("base64url");
}

function constantTimeMatch(expectedValue: string | undefined, candidate: unknown) {
  if (!expectedValue || typeof candidate !== "string") return false;
  const expected = Buffer.from(expectedValue);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function verifyAdminCredentials(email: unknown, password: unknown) {
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const suppliedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const emailMatches = constantTimeMatch(configuredEmail, suppliedEmail);
  const passwordMatches = constantTimeMatch(process.env.ADMIN_PASSWORD, password);
  return isAdminConfigured() && emailMatches && passwordMatches;
}

export function createAdminSession() {
  const secret = secretKey();
  if (!secret) throw new Error("ADMIN_SECRET_KEY must contain at least 32 characters.");
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return { value: `${expires}.${signature(expires, secret)}`, maxAge: SESSION_SECONDS };
}

export async function isAdminAuthenticated() {
  const secret = secretKey();
  if (!secret) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const [expires, received, extra] = value.split(".");
  if (!expires || !received || extra || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const expected = Buffer.from(signature(expires, secret));
  const actual = Buffer.from(received);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}
