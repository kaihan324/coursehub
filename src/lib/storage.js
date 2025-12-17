const KEYS = {
  users: "coursehub_users",
  session: "coursehub_session",
  reservations: "coursehub_reservations",
  transactions: "coursehub_transactions",
  reviews: "coursehub_reviews",
};

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const Storage = {
  KEYS,
  getUsers: () => read(KEYS.users, []),
  setUsers: (v) => write(KEYS.users, v),

  getSession: () => read(KEYS.session, null),
  setSession: (v) => write(KEYS.session, v),
  clearSession: () => localStorage.removeItem(KEYS.session),

  getReservations: () => read(KEYS.reservations, []),
  setReservations: (v) => write(KEYS.reservations, v),

  getTransactions: () => read(KEYS.transactions, []),
  setTransactions: (v) => write(KEYS.transactions, v),

  getReviews: () => read(KEYS.reviews, []),
  setReviews: (v) => write(KEYS.reviews, v),
};
