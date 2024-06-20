import type { NextRequest } from 'next/server'
import S3 from '@/lib/r2'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const runtime = 'edge'

export async function GET(request: NextRequest) {

    try {
        const url = await getSignedUrl(S3, new GetObjectCommand({
            Bucket: 'BUCKET_NAME',
            Key: 'FILE_NAME'
        }),
            {
                expiresIn: 600
            }
        )
        return Response.json({ url })
    } catch (error: any) {
        return Response.json({ error: error.message })
    }
}
