export type AuthUser = {
  email: string;
  name: string;
  createdAt: number;
};

export type AuthSession = AuthUser & {
  token: string;
};

const SESSION_KEY = "consequence_session";
const USERS_KEY = "consequence_users";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredUsers(): AuthUser[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as AuthUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: AuthUser[]) {
  if (!isBrowser()) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): AuthSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function setSession(user: AuthUser): AuthSession {
  const session: AuthSession = {
    ...user,
    token: `cs_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
  };
  if (isBrowser()) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return session;
}

export function clearSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  const password = input.password;

  if (!name) return { ok: false, error: "Name is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid work email." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  const users = getStoredUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const user: AuthUser = { email, name, createdAt: Date.now() };
  saveUsers([...users, user]);
  if (isBrowser()) {
    localStorage.setItem(`consequence_pw_${email}`, password);
  }
  return { ok: true, user };
}

export function loginUser(input: {
  email: string;
  password: string;
}): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const email = input.email.trim().toLowerCase();
  const users = getStoredUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return { ok: false, error: "No account found for this email. Sign up first." };
  }
  if (!isBrowser()) return { ok: false, error: "Unavailable." };
  const stored = localStorage.getItem(`consequence_pw_${email}`);
  if (stored !== input.password) {
    return { ok: false, error: "Incorrect password." };
  }
  return { ok: true, user };
}
