const USER_STORAGE_KEY = "userInfo";
const TOKEN_STORAGE_KEY = "token";
const AUTH_STATE_EVENT = "portfolio-auth-state-change";

export function getStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: unknown) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

  if (user && typeof user === "object" && "token" in user) {
    const token = (user as { token?: unknown }).token;

    if (typeof token === "string" && token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  }

  window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: user }));
}

export function clearStoredUser() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(USER_STORAGE_KEY);
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: null }));
}

export { AUTH_STATE_EVENT, TOKEN_STORAGE_KEY, USER_STORAGE_KEY };
