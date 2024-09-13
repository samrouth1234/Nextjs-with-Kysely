// pets.ts
import { db } from "@/lib/database/db";

export async function getPets() {
  try {
    return await db.selectFrom("pet").selectAll().execute();
  } catch (error) {
    return "Error getting pets";
  }
}

export async function createPet(data: { name: string; owner_id: number; species: string }) {
  try {
    return await db
      .insertInto("pet")
      .values({ name: data.name, owner_id: data.owner_id, species: data.species })
      .execute();
  } catch (error) {
    return "Error creating pet";
  }
}

export async function getPet(id: number) {
  try {
    return await db
      .selectFrom("pet")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  } catch (error) {
    return "Error getting pet";
  }
}

export async function updatePet(id: number, data: { name: string; owner_id: number; species: string }) {
  try {
    return await db
      .updateTable("pet")
      .set({ name: data.name, owner_id: data.owner_id, species: data.species })
      .where("id", "=", id)
      .execute();
  } catch (error) {
    return "Error updating pet";
  }
}

export async function deletePet(id: number) {
  try {
    return await db
      .deleteFrom("pet")
      .where("id", "=", id)
      .execute();
  } catch (error) {
    return "Error deleting pet";
  }
}
