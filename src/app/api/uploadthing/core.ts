import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from 'zod';
import sharp from 'sharp'
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .input(z.object({ configId: z.string().optional() }))
        .middleware(async ({ input }) => {
            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input;
            const res = await fetch(file.url);
            const buffer = await res.arrayBuffer();

            // learning - sharp is great package to play with images resizing
            const imgMetaData = await sharp(buffer).metadata();
            const { width, height } = imgMetaData

            if (!configId) {
                // create one id
                const configuration = await db.configuration.create({
                    data: {
                        imageUrl: file.url,
                        height: height || 500,  // just to make ts happy
                        width: width || 500 
                    }
                })
                return {configId: configuration.id}
            }else {
                // if we have already configId that means we are saving cropped image
                const updatedConfiguration = await db.configuration.update({
                    where: {
                        id: configId
                    },
                    data: {
                        croppedImageUrl: file.url
                    }
                })
                return {configId: updatedConfiguration.id}
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;