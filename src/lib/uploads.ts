import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function isHostedRuntime() {
  return (
    process.env.VERCEL === "1" ||
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)
  );
}

function blobToken() {
  return (
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.READ_WRITE_TOKEN?.trim() ||
    ""
  );
}

function blobStoreId() {
  return process.env.BLOB_STORE_ID?.trim() || "";
}

function canUseBlob() {
  return Boolean(blobToken() || blobStoreId() || isHostedRuntime());
}

function extensionFor(file: File) {
  const fromName = path.extname(file.name || "").toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(fromName)) {
    return fromName === ".jpeg" ? ".jpg" : fromName;
  }
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  return ".jpg";
}

function contentTypeFor(ext: string) {
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

export async function saveUpload(file: File, prefix = "file") {
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 8 * 1024 * 1024) {
    throw new Error("Image must be under 8MB.");
  }
  const ext = extensionFor(file);
  const name = `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}${ext}`;

  if (canUseBlob()) {
    const token = blobToken();
    const storeId = blobStoreId();
    try {
      const blob = await put(name, bytes, {
        access: "public",
        contentType: file.type || contentTypeFor(ext),
        addRandomSuffix: true,
        ...(token ? { token } : {}),
        ...(storeId ? { storeId } : {}),
      });
      return blob.url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Blob upload failed.";
      throw new Error(
        `Could not upload image to Vercel Blob. ${message} Check Storage → Blob is linked and redeploy.`,
      );
    }
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), bytes);
  return `/uploads/${name}`;
}
