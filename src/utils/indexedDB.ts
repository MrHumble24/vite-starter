// src/utils/indexedDB.ts
import { openDB } from "idb";
import { Admins, Students, Teacher } from "../types/types";

const DB_NAME = "userDatabase";
const STORE_NAME = "userStore";

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const getUser = async () => {
  const db = await initDB();
  return await db.get(STORE_NAME, "user");
};

export const setUser = async (user: Teacher | Students | Admins | null) => {
  const db = await initDB();
  await db.put(STORE_NAME, { ...user, id: "user" });
};

export const removeUser = async () => {
  const db = await initDB();
  await db.delete(STORE_NAME, "user");
};
