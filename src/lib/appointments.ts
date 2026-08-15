export const APPOINTMENT_INTERESTS = ["Piercing", "Consultation"] as const;

export type AppointmentInterest = (typeof APPOINTMENT_INTERESTS)[number];

function formatSlot(hour24: number, minute: number) {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

/** Studio hours 11:00 AM – 8:00 PM. Lunch 2:00–3:00 PM is excluded. */
export const APPOINTMENT_TIMES = (() => {
  const slots: string[] = [];
  for (let hour = 11; hour <= 20; hour++) {
    for (const minute of [0, 30] as const) {
      if (hour === 20 && minute === 30) continue;
      if (hour === 14) continue;
      slots.push(formatSlot(hour, minute));
    }
  }
  return slots;
})();

export function isAppointmentTime(value: string) {
  return APPOINTMENT_TIMES.includes(value);
}

export function isAppointmentInterest(
  value: string,
): value is AppointmentInterest {
  return (APPOINTMENT_INTERESTS as readonly string[]).includes(value);
}
