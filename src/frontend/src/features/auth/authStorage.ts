// LocalStorage keys
const USERS_KEY = "planday_users";
const SESSION_KEY = "planday_session";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Session {
  userId: string;
  name: string;
  email: string;
}

export function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function saveUser(
  name: string,
  email: string,
  password: string,
): { success: boolean; error?: string } {
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return {
      success: false,
      error: "An account with this email already exists",
    };
  }
  const newUser: StoredUser = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    email: email.toLowerCase(),
    password,
  };
  saveUsers([...users, newUser]);
  return { success: true };
}

export function validateLogin(
  email: string,
  password: string,
): { success: boolean; user?: StoredUser; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { success: false, error: "No account found with this email" };
  }
  if (user.password !== password) {
    return { success: false, error: "Invalid credentials. Please try again." };
  }
  return { success: true, user };
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(user: StoredUser): void {
  const session: Session = {
    userId: user.id,
    name: user.name,
    email: user.email,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
