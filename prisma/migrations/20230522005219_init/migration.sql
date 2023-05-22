-- CreateTable
CREATE TABLE "SettingsData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SettingsData_key_key" ON "SettingsData"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SettingsData_appId_key_key" ON "SettingsData"("appId", "key");
