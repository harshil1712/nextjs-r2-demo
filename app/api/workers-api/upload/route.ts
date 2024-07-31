import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function PUT(request: NextRequest) {
  const fileName = request.nextUrl.searchParams.get("filename") as string;

  const formData = await request.formData();
  const file = formData.get("file");
  try {
    const res = await getRequestContext().env.IMAGES.put(fileName, file);
    console.log(res);
    return Response.json({ status: "success" });
  } catch (err) {
    console.log(err);
    return Response.json({ status: "error" });
  }
}
