-- CreateTable
CREATE TABLE "Mold" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "description" TEXT,
    "cycle_time" TEXT,
    "status" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Mold_number_key" ON "Mold"("number");
