import { NextResponse } from "next/server";
import { saveCustomRequest, uid } from "@/lib/store";
import { saveUpload } from "@/lib/uploads";

function required(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const product = String(form.get("product") ?? "").trim();
  const weightRaw = String(form.get("weight") ?? "").trim();
  const notes = String(form.get("notes") ?? "").trim();
  const file = form.get("reference");
  const weight =
    /^\d/.test(weightRaw) && !/gm/i.test(weightRaw)
      ? `${weightRaw}gm`
      : weightRaw;

  if (!required(name) || !required(email) || !required(phone) || !required(product) || !required(weight)) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  let imageUrl = "";
  if (file instanceof File && file.size > 0) {
    try {
      imageUrl = await saveUpload(file, "custom");
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Could not save image." },
        { status: 400 },
      );
    }
  }

  const stamp = new Date().toISOString();
  await saveCustomRequest({
    id: uid("custom"),
    name,
    email,
    phone,
    product,
    weight,
    imageUrl,
    notes,
    status: "new",
    createdAt: stamp,
    updatedAt: stamp,
  });

  return NextResponse.json({
    message: "Custom request received. We will get back to you shortly.",
  });
}
