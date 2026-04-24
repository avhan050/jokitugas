-- CreateTable
CREATE TABLE "TaskMessage" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaskMessage_taskId_createdAt_idx" ON "TaskMessage"("taskId", "createdAt");

-- CreateIndex
CREATE INDEX "TaskMessage_senderId_idx" ON "TaskMessage"("senderId");

-- AddForeignKey
ALTER TABLE "TaskMessage" ADD CONSTRAINT "TaskMessage_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMessage" ADD CONSTRAINT "TaskMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
