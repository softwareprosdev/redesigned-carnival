import { db } from ".";
import { patients, appointments, treatments, users } from "./schema";
import { count, eq, sql, and, gte, lte, desc } from "drizzle-orm";

export async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // 1. Total Patients
  const [totalPatientsResult] = await db.select({ count: count() }).from(patients);
  const totalPatients = totalPatientsResult?.count ?? 0;

  // 2. Appointments Today
  const [appointmentsTodayResult] = await db
    .select({ count: count() })
    .from(appointments)
    .where(
      and(
        gte(appointments.appointmentDate, today),
        lte(appointments.appointmentDate, tomorrow)
      )
    );
  const appointmentsToday = appointmentsTodayResult?.count ?? 0;

  // 3. Revenue (This Month) - Join treatments with appointments to filter by date
  // Note: Drizzle's sum returns a string, so we cast to number
  const [revenueResult] = await db
    .select({
      revenue: sql<number>`sum(${treatments.cost})`
    })
    .from(treatments)
    .innerJoin(appointments, eq(treatments.appointmentId, appointments.id))
    .where(
      and(
        gte(appointments.appointmentDate, startOfMonth),
        lte(appointments.appointmentDate, endOfMonth)
      )
    );
  const revenue = revenueResult?.revenue ?? 0;

  // 4. Active Treatments
  const [activeTreatmentsResult] = await db
    .select({ count: count() })
    .from(treatments)
    .where(eq(treatments.status, "in_progress"));
  const activeTreatments = activeTreatmentsResult?.count ?? 0;

  return {
    totalPatients,
    appointmentsToday,
    revenue,
    activeTreatments,
  };
}

export async function getRecentAppointments(limit = 5) {
  return await db
    .select({
      id: appointments.id,
      patientName: sql<string>`concat(${patients.firstName}, ' ', ${patients.lastName})`,
      reason: appointments.reason,
      date: appointments.appointmentDate,
      status: appointments.status,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patientId, patients.id))
    .orderBy(desc(appointments.appointmentDate))
    .limit(limit);
}

export async function getUpcomingTreatments(limit = 5) {
  return await db
    .select({
      id: treatments.id,
      treatmentName: treatments.name,
      patientName: sql<string>`concat(${patients.firstName}, ' ', ${patients.lastName})`,
      status: treatments.status,
      date: appointments.appointmentDate,
      dentistName: users.fullName,
    })
    .from(treatments)
    .innerJoin(appointments, eq(treatments.appointmentId, appointments.id))
    .innerJoin(patients, eq(appointments.patientId, patients.id))
    .leftJoin(users, eq(appointments.dentistId, users.id))
    .where(eq(treatments.status, "planned"))
    .orderBy(desc(appointments.appointmentDate))
    .limit(limit);
}

export async function getAllPatients() {
  return await db.select().from(patients).orderBy(desc(patients.createdAt));
}

export async function getPatientById(id: string) {
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.id, id))
    .limit(1);
  
  return patient;
}

export async function getAppointmentsRange(startDate: Date, endDate: Date) {
  return await db
    .select({
      id: appointments.id,
      patientName: sql<string>`concat(${patients.firstName}, ' ', ${patients.lastName})`,
      appointmentDate: appointments.appointmentDate,
      status: appointments.status,
      reason: appointments.reason,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patientId, patients.id))
    .where(
      and(
        gte(appointments.appointmentDate, startDate),
        lte(appointments.appointmentDate, endDate)
      )
    )
    .orderBy(appointments.appointmentDate);
}
