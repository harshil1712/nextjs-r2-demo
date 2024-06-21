import {
    S3Client,
} from "@aws-sdk/client-s3";

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

export default S3;