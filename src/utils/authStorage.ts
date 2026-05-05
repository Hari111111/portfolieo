const USER_STORAGE_KEY = "userInfo";
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
  window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: user }));
}

export function clearStoredUser() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_STATE_EVENT, { detail: null }));
}

export { AUTH_STATE_EVENT, USER_STORAGE_KEY };
