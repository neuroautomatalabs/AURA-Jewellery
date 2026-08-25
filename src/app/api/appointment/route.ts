import { NextResponse } from "next/server";
import {
  isAppointmentInterest,
  isAppointmentTime,
} from "@/lib/appointments";
import { getMailConfig, sendMail } from "@/lib/mail";
import { saveAppointment, uid } from "@/lib/store";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  interest?: string;
  piercing?: string;
  notes?: string;
};

function required(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone, date, time, interest, piercing, notes } = body;

  if (
    !required(name) ||
    !required(email) ||
    !required(phone) ||
    !required(date) ||
    !required(time) ||
    !required(interest)
  ) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isAppointmentInterest(String(interest))) {
    return NextResponse.json(
      { error: "Please choose piercing or consultation." },
      { status: 400 },
    );
  }

  if (!isAppointmentTime(String(time))) {
    return NextResponse.json(
      {
        error:
          "Please choose a time between 11:00 AM and 8:00 PM, excluding lunch (2:00–3:00 PM).",
      },
      { status: 400 },
    );
  }

  const stamp = new Date().toISOString();
  await saveAppointment({
    id: uid("apt"),
    name: String(name),
    email: String(email),
    phone: String(phone),
    date: String(date),
    time: String(time),
    interest: String(interest),
    piercing: piercing ? String(piercing) : "",
    notes: notes ? String(notes) : "",
    status: "new",
    createdAt: stamp,
    updatedAt: stamp,
  });

  const summary = `
New appointment request — Aura Jewellery

Name: ${name}
Email: ${email}
Phone: ${phone}
Interest: ${interest}
Preferred date: ${date}
Preferred time: ${time}
${interest === "Piercing" ? `Piercing: ${piercing || "Not specified"}\n` : ""}Notes: ${notes || "—"}
`.trim();

  const userHtml = `
  <div style="font-family: Georgia, serif; color: #0e1420; max-width: 560px;">
    <h1 style="color:#0a2463; font-weight:500; letter-spacing:0.12em;">AURA JEWELLERY</h1>
    <p>Hi ${name},</p>
    <p>Thank you for booking with us. We have received your appointment request and will confirm shortly.</p>
    <p><strong>Interest:</strong> ${interest}<br/>
    <strong>Preferred date:</strong> ${date}<br/>
    <strong>Preferred time:</strong> ${time}${
      interest === "Piercing"
        ? `<br/><strong>Placement:</strong> ${piercing || "To discuss"}`
        : ""
    }</p>
    <p style="color:#5c6578; font-size:14px;">If you need to change anything, reply to this email.</p>
  </div>
  `;

  const mail = getMailConfig();
  if (!mail) {
    console.log("[appointment demo mode]\n", summary);
    return NextResponse.json({
      message:
        "Request received (demo mode). Add SMTP settings in .env.local to send real emails to you and the client.",
      demo: true,
    });
  }

  try {
    await sendMail({
      fromName: "Aura Jewellery Appointments",
      to: mail.businessEmail,
      replyTo: String(email),
      subject: `Appointment · ${name} · ${date} ${time}`,
      text: summary,
    });

    await sendMail({
      fromName: "Aura Jewellery",
      to: String(email),
      subject: "Your Aura Jewellery appointment request",
      text: `Hi ${name},\n\nThank you for booking with Aura Jewellery. We received your request for ${date} at ${time}.\n\nWe will confirm shortly.\n\n— Aura Jewellery`,
      html: userHtml,
    });

    return NextResponse.json({
      message:
        "Appointment request sent. A confirmation email is on its way to your inbox.",
    });
  } catch (err) {
    console.error("Appointment email failed", err);
    return NextResponse.json(
      {
        error:
          "We could not send emails right now. Please call the studio or try again later.",
      },
      { status: 500 },
    );
  }
}
