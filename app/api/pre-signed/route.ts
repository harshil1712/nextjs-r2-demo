import type { NextRequest } from "next/server";
// import S3 from "@/lib/r2";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";

export const runtime = "edge";

const ACCOUNT_ID = process.env.ACCOUNT_ID as string;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY as string;

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// Get Pre-Signed URL for Upload
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

// Get Pre-Signed URL for Download
export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get("filename") as string;
  try {
    const url = await getSignedUrl(
      S3,
      new GetObjectCommand({
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
