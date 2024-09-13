// migrations.ts
import { Kysely, Migrator, sql, FileMigrationProvider } from "kysely";
import path from "path";
import { promises as fs } from "fs";
import { db } from "./db";

async function createUserTable(db: Kysely<any>): Promise<void> {
  try {
    await db.schema
      .createTable("user")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("name", "varchar", (col) => col.notNull())
      .addColumn("email", "varchar", (col) => col.notNull())
      .addColumn("created_at", "timestamp", (col) =>
        col.defaultTo(sql`now()`).notNull()
      )
      .execute();
    console.log("User table created successfully");
  } catch (error) {
    console.error("Failed to create user table:", error);
    throw error;
  }
}

async function createPetTable(db: Kysely<any>): Promise<void> {
  try {
    await db.schema
      .createTable("pet")
      .addColumn("id", "serial", (col) => col.primaryKey())
      .addColumn("name", "varchar", (col) => col.notNull().unique())
      .addColumn("owner_id", "integer", (col) =>
        col.references("user.id").onDelete("cascade").notNull()
      )
      .addColumn("species", "varchar", (col) => col.notNull())
      .execute();
    console.log("Pet table created successfully");
  } catch (error) {
    console.error("Failed to create pet table:", error);
    throw error;
  }
}

export async function up(db: Kysely<any>): Promise<void> {
  await createUserTable(db);
  await createPetTable(db);
}

export async function executeMigration() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../database"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

executeMigration();
