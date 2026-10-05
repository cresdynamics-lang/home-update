import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { isAdminAuthenticated, isSameOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeName(fileName: string) {
  const base = fileName.replace(/\.[^/.]+$/, "");
  const cleaned = base
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "") || "upload";
  return cleaned.slice(0, 80);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "A file is required." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "Only image files are allowed." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: "Image files must be 10 MB or smaller." }, { status: 400 });
  }

  const extension = extname(file.name) || (file.type.includes("png") ? ".png" : file.type.includes("jpg") || file.type.includes("jpeg") ? ".jpg" : ".webp");
  const fileName = `${sanitizeName(file.name)}-${randomUUID()}${extension}`;
  const directory = join(process.cwd(), "public", "images", "uploads");
  await mkdir(directory, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(join(directory, fileName), bytes, { encoding: "binary" });

  return Response.json({ url: `/images/uploads/${fileName}` }, { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } });
}
