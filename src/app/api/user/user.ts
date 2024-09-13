// users.ts
import {db} from "@/lib/database/db";
import {NextResponse} from "next/server";

export async function getUsers() {
  try {
    return await db.selectFrom("user").selectAll().execute();
  } catch (error) {
    return "Error getting users";
  }
}

export async function createUser(data: { name: string; email: string }) {
  try {
    const createdAt = new Date();
    const result = await db
      .insertInto('user')
      .values({
        name: data.name,
        email: data.email,
        created_at: createdAt,
      })
      .executeTakeFirst();
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user' };
  }
}

export async function getUser(id: number) {
  try {
    return await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  } catch (error) {
    return "Error getting user";
  }
}

export async function updateUser(id: number, data: { name: string; email: string }) {
  try {
    return await db
      .updateTable("user")
      .set({ name: data.name, email: data.email})
      .where("id", "=", id)
      .execute();
  } catch (error) {
    return "Error updating user";
  }
}

export async function deleteUser(id: number) {
  try {
    return await db
      .deleteFrom("user")
      .where("id", "=", id)
      .execute();
  } catch (error) {
    return "Error deleting user";
  }
}
