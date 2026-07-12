import { requireAuth } from "@/lib/auth";

/**
 * Verifies the incoming request has a valid JWT with role === "ADMIN".
 * Throws an Error if authentication or authorization fails.
 */
export const requireAdmin = async (req) => {
  const user = await requireAuth(req);

  if (user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  return user;
};
