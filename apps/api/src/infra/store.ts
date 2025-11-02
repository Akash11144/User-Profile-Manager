export type Profile = { id: string; email: string; name?: string };

const profiles = new Map<string, Profile>(); // key: id
const emailIndex = new Map<string, string>(); // key: emailLower -> id

export const Store = {
  getById(id: string) { return profiles.get(id) ?? null; },
  getByEmail(email: string) {
    const id = emailIndex.get(email.toLowerCase());
    return id ? profiles.get(id) ?? null : null;
  },
  getOrCreateByEmail(email: string): Profile {
    const lower = email.toLowerCase();
    const existingId = emailIndex.get(lower);
    if (existingId) return profiles.get(existingId)!;
    const id = (globalThis as any).crypto?.randomUUID ? (globalThis as any).crypto.randomUUID() : String(Math.random()).slice(2);
    const profile: Profile = { id, email: lower };
    profiles.set(id, profile);
    emailIndex.set(lower, id);
    return profile;
  },
  updateName(id: string, name: string) {
    const p = profiles.get(id);
    if (!p) return null;
    const updated = { ...p, name };
    profiles.set(id, updated);
    return updated;
  }
};
