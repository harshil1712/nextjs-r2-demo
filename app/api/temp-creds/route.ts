import type { NextRequest } from "next/server";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";

export const runtime = "edge";

const ACCOUNT_ID = process.env.ACCOUNT_ID as string;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID as string;
const AUTH_TOKEN = process.env.AUTH_TOKEN as string;

const BUCKET_NAME = "";

const generateS3Client = async () => {
  const getToken = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/temp-access-credentials`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        bucket: BUCKET_NAME,
        parentAccessKeyId: ACCESS_KEY_ID,
        permission: "object-read-write",
        ttlSeconds: 6400,
      }),
    }
  );
  const res = (await getToken.json()) as TempCredRes;
  if (res.success) {
    const { secretAccessKey, sessionToken } = res.result;
    return new S3Client({
      region: "auto",
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken,
      },
    });
  }
  throw new Error("Fetching Session Token Failed");
};

// Get Pre-Signed URL for Upload
export async function POST(request: NextRequest) {
  const { filename }: { filename: string } = await request.json();
  const S3 = await generateS3Client();

  try {
    const url = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
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
  const S3 = await generateS3Client();
  try {
    const url = await getSignedUrl(
      S3,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
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
