// import { Database } from "bun:sqlite";
// import { drizzle } from "drizzle-orm/bun-sqlite";
// import { migrate } from "drizzle-orm/bun-sqlite/migrator";

// const sqlite = new Database("../db.db");
// export const db = drizzle(sqlite);

// async function main() {
//   try {
//     await migrate(db, {
//       migrationsFolder: "./",
//     });
//     console.log("Tables migrated!");
//     process.exit(0);
//   } catch (error) {
//     console.error("Error performing migration: ", error);
//     process.exit(1);
//   }
// }

// main();
