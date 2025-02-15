"use server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export async function fetchUserRoleById(
  id: string
) {
  try {
    const res = await db
    .select({ 
      role: users.role 
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
    return res[0]?.role;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user role by id.');
  }
}