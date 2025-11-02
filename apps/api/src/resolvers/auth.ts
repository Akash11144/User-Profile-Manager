import jwt from 'jsonwebtoken';
import { Request } from 'express';

const SECRET = process.env.JWT_SECRET ?? 'dev-secret';

export type JwtUser = { id: string; email: string };
export function sign(user: JwtUser) { return jwt.sign(user, SECRET, { expiresIn: '12h' }); }

export function parseAuth(req: Request): JwtUser | null {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return null;
  try { return jwt.verify(h.slice(7), SECRET) as JwtUser; } catch { return null; }
}

export async function buildContext({ req }: { req: Request }) {
  return { user: parseAuth(req) };
}
