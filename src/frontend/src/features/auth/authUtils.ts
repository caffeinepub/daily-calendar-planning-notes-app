const USERS_KEY = "planday_users";
const SESSION_KEY = "planday_session";

interface User {
  name: string;
  email: string;
  password: string;
}

interface Session {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function signUp(
  name: string,
  email: string,
  password: string,
): { success: boolean; error?: string } {
  if (!name || !email || !password) {
    return { success: false, error: "Please fill in all fields" };
  }
  if (password.length < 6) {
    return {
      success: false,
      error: "Password too short - minimum 6 characters",
    };
  }
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return {
      success: false,
      error: "An account with this email already exists",
    };
  }
  users.push({ name, email: email.toLowerCase(), password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
}

export function loginUser(
  email: string,
  password: string,
): {
  success: boolean;
  error?: string;
  user?: { name: string; email: string };
} {
  if (!email || !password) {
    return { success: false, error: "Please fill in all fields" };
  }
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { success: false, error: "User not found" };
  }
  if (user.password !== password) {
    return { success: false, error: "Invalid credentials" };
  }
  const session: Session = {
    email: user.email,
    name: user.name,
    isLoggedIn: true,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: { name: user.name, email: user.email } };
}

export function logoutUser(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  try {
    const session: Session = JSON.parse(
      localStorage.getItem(SESSION_KEY) || "{}",
    );
    return session.isLoggedIn === true;
  } catch {
    return false;
  }
}

export function getCurrentUser(): { name: string; email: string } | null {
  try {
    const session: Session = JSON.parse(
      localStorage.getItem(SESSION_KEY) || "{}",
    );
    if (session.isLoggedIn) {
      return { name: session.name, email: session.email };
    }
    return null;
  } catch {
    return null;
  }
}
