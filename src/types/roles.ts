export type UserRole = "admin" | "sr" | "customer" | "vendor";

/** টাইপ গার্ড: যেকোনো unknown থেকে UserRole চেক */
export function isUserRole(x: unknown): x is UserRole {
  if (typeof x !== "string") return false;
  const v = x.toLowerCase();
  return v === "admin" || v === "sr" || v === "customer" || v === "vendor";
}

/** normalize: unknown → UserRole (ডিফল্ট fallback = "sr") */
export function normalizeRole(x: unknown, fallback: UserRole = "sr"): UserRole {
  return isUserRole(x) ? (x.toLowerCase() as UserRole) : fallback;
}

/** কনস্ট্যান্টস (রেফারেন্সে সুবিধা) */
export const ROLE = {
  ADMIN: "admin",
  SR: "sr",
  CUSTOMER: "customer",
  VENDOR: "vendor",
} as const;
