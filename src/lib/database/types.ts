import { Generated } from "kysely";

// create database
export interface Database {
  user: UserTable;
  pet:PetTable;
}

export interface UserTable {
  id: Generated<number>;
  name: string;
  email: string;
  created_at: Date;
}

export interface PetTable{
  id: Generated<number>;
  name: string;
  owner_id: number;
  species: string;
}