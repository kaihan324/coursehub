export const isEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

export const minLen = (v, n) => String(v || "").length >= n;

export const isCardNumber = (v) => /^\d{16}$/.test(String(v || "").replace(/\s/g, ""));
export const isCVV = (v) => /^\d{3,4}$/.test(String(v || ""));
export const isSeats = (v) => {
  const x = Number(v);
  return Number.isInteger(x) && x >= 1 && x <= 10;
};

export const isExpiryValid = (v) => {
  // MM/YY
  const s = String(v || "").trim();
  if (!/^\d{2}\/\d{2}$/.test(s)) return false;
  const [mm, yy] = s.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const year = 2000 + yy;
  const exp = new Date(year, mm, 0, 23, 59, 59); // آخر ماه
  return exp >= now;
};
