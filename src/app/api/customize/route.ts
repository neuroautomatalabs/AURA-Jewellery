import { NextResponse } from "next/server";
import { getMailConfig, sendMail } from "@/lib/mail";
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

  const summary = `
New custom request — Aura Jewellery

Name: ${name}
Email: ${email}
Phone: ${phone}
Product: ${product}
Weight: ${weight}
Notes: ${notes || "—"}
Reference image: ${imageUrl || "None"}
`.trim();

  const mail = getMailConfig();
  if (mail) {
    try {
      await sendMail({
        fromName: "Aura Jewellery Custom",
        to: mail.businessEmail,
        replyTo: email,
        subject: `Custom request · ${name} · ${product}`,
        text: summary,
      });

      await sendMail({
        fromName: "Aura Jewellery",
        to: email,
        subject: "We received your Aura Jewellery custom request",
        text: `Hi ${name},\n\nThank you for your custom request for a ${product} (${weight}). We will review the details and get back to you shortly.\n\n— Aura Jewellery`,
        html: `
  <div style="font-family: Georgia, serif; color: #0e1420; max-width: 560px;">
    <h1 style="color:#0a2463; font-weight:500; letter-spacing:0.12em;">AURA JEWELLERY</h1>
    <p>Hi ${name},</p>
    <p>Thank you for your custom request. We have received the details below and will get back to you shortly.</p>
    <p><strong>Product:</strong> ${product}<br/>
    <strong>Weight:</strong> ${weight}</p>
    <p style="color:#5c6578; font-size:14px;">If you need to change anything, reply to this email.</p>
  </div>
        `,
      });
    } catch (err) {
      console.error("Custom request email failed", err);
      // Request is already saved — don't fail the submission over mail.
    }
  } else {
    console.log("[customize demo mode]\n", summary);
  }

  return NextResponse.json({
    message: "Custom request received. We will get back to you shortly.",
  });
}
