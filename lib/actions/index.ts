"use server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { revalidatePath } from "next/cache";

export async function fetchUserById(
  id: string
) {
  try {
    const res = await db
    .select({ 
      role: users.role,
      fullName: users.fullName,
      id: users.id,
      agency: users.agency
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)
    return res[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user role by id.');
  }
}

export const updateUserProfile = async (params: {fullName: string, agency?: string }, userId: string) => {
  try {
    await db
      .update(users)
      .set({
        ...params
      })
      .where(
        eq(users.id, userId)
      )
      revalidatePath('/profile');
    return {
      success: true
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while updating the profile",
    }
  }
}