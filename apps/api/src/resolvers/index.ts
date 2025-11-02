import { Store } from '../infra/store.js';
import { sign } from './auth.js';
import { z } from 'zod';
import { UpdateProfileInput } from '../validation/profile.js';
import { getCache, setCache } from '../infra/cache.js';
import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    me: (_:unknown, __:unknown, ctx:{user?:{id:string;email:string}|null}) => {
      if (!ctx.user) return null;
      return Store.getById(ctx.user.id);
    },
    githubRepos: async (_:unknown, args: { username: string; sortBy?: string; direction?: string; page?: number; perPage?: number }) => {
      const key = `gh:${JSON.stringify(args)}`;
      const cached = getCache<any[]>(key);
      if (cached) return cached;

      const params = new URLSearchParams({
        sort: args.sortBy ?? 'updated',
        direction: args.direction ?? 'desc',
        per_page: String(args.perPage ?? 10),
        page: String(args.page ?? 1),
      });
      const resp = await fetch(`https://api.github.com/users/${encodeURIComponent(args.username)}/repos?${params.toString()}`, {
        headers: { 'User-Agent': 'user-profile-manager' }
      });
      if (!resp.ok) throw new Error(`GitHub error: ${resp.status}`);
      const data = await resp.json() as any[];
      const shaped = data.map(r => ({
        id: String(r.id),
        name: r.name,
        htmlUrl: r.html_url,
        description: r.description,
        stargazersCount: r.stargazers_count,
        language: r.language,
        updatedAt: r.updated_at
      }));
      setCache(key, shaped, 60_000); // 1 min TTL
      return shaped;
    },
  },
  Mutation: {
    login: (_:unknown, args:{email:string}) => {
      const email = z.string().email().parse(args.email.trim());
      const user = Store.getOrCreateByEmail(email);
      return { token: sign({ id: user.id, email: user.email }), user };
    },
    updateProfile: (_:unknown, args:{name:string}, ctx:{user?:{id:string;email:string}|null}) => {
      if (!ctx.user) throw new Error('Unauthorized');
      const input = UpdateProfileInput.parse(args);
      const updated = Store.updateName(ctx.user.id, input.name);
      if (!updated) throw new Error('User not found');
      return updated;
    }
  }
};
