import type { NextRequest } from "next/server";
import S3 from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { filename }: { filename: string } = await request.json();

  try {
    const url = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: "BUCKET_NAME",
        Key: filename,
      }),
      {
        expiresIn: 600,
      }
    );
    return Response.json({ url });
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
