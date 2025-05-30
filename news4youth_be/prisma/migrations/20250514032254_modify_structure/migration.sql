-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "category", "content", "createdAt", "id", "like", "title") SELECT "authorId", "category", "content", "createdAt", "id", "like", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
