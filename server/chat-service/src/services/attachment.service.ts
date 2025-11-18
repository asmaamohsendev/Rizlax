import { uploadToR2 } from "@rizlax/R2";
import { prisma } from "@rizlax/db-client";
import type { ChatAttachment } from "@prisma/client";
import crypto from "crypto";

export interface UploadAttachmentDTO {
  file: Express.Multer.File;
  userId: string;
  conversationId: string;
}

class AttachmentService {
  public async uploadAttachment({file, userId, conversationId}: UploadAttachmentDTO): Promise<ChatAttachment> {

    const key = `${conversationId}/${crypto.randomUUID()}-${file.originalname}`;

    const url = await uploadToR2(key, file.buffer, file.mimetype);

    const document = await prisma.chatAttachment.create({
        data: {
            url,
            key,
            fileType: file.mimetype,
            originalName: file.originalname,
            fileSize: file.size,
            userId,
            conversationId
        }
    })

    return document
  }
}

export default AttachmentService;
