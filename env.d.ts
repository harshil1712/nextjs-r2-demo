// Generated by Wrangler
// by running `wrangler types --env-interface CloudflareEnv env.d.ts`

interface CloudflareEnv {
  SECRET_ACCESS_KEY: string;
  ACCESS_KEY_ID: string;
  ACCOUNT_ID: string;
  IMAGES: R2Bucket;
}

interface TempCredRes {
  success: boolean;
  errors: [];
  messages: [];
  result: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
  };
}
