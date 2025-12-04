import { createSupabaseServerComponentClient } from "@dental-prodigy/auth";
import { getPatientByUserId, getPatientAppointments } from "@dental-prodigy/database";
import { cookies } from "next/headers";
import { Card } from "@dental-prodigy/ui/card";
import { Calendar, Clock, MapPin, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function MyAppointmentsPage() {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerComponentClient(cookieStore);
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return <div>Please log in.</div>;

  const patient = await getPatientByUserId(session.user.id);
  if (!patient) return <div>Profile not found.</div>;

  const appointments = await getPatientAppointments(patient.id);

  const upcoming = appointments.filter(a => new Date(a.appointmentDate) >= new Date() && a.status !== 'canceled');
  const past = appointments.filter(a => new Date(a.appointmentDate) < new Date() || a.status === 'canceled');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">My Appointments</h1>
        <p className="text-zinc-500">Manage your upcoming visits and view history.</p>
      </div>

      {/* Upcoming Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Upcoming</h2>
        {upcoming.length === 0 ? (
             <Card className="p-6 text-center text-zinc-500">
                 No upcoming appointments.
             </Card>
        ) : (
            <div className="grid gap-4">
                {upcoming.map(apt => (
                    <Card key={apt.id} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between border-l-4 border-l-blue-500">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                                <span className="text-lg">{apt.reason || "Checkup"}</span>
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    {apt.status}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm text-zinc-500 sm:flex-row sm:gap-4">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {apt.appointmentDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {apt.appointmentDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                             <div className="flex items-center gap-4 text-sm text-zinc-500">
                                <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {apt.dentistName || "Unassigned"}
                                </span>
                             </div>
                        </div>
                        
                         {apt.notes && (
                            <div className="mt-2 rounded-md bg-zinc-50 p-3 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 sm:mt-0 sm:max-w-xs">
                                <span className="font-medium">Note:</span> {apt.notes}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        )}
      </section>

      {/* Past Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">History</h2>
        {past.length === 0 ? (
             <p className="text-zinc-500">No appointment history.</p>
        ) : (
            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Treatment</th>
                                <th className="px-6 py-3 font-medium">Dentist</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {past.map(apt => (
                                <tr key={apt.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                    <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100">
                                        {apt.appointmentDate.toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100">
                                        {apt.reason || "Routine Visit"}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500">
                                        {apt.dentistName || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                                            apt.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-zinc-100 text-zinc-800'
                                        }`}>
                                            {apt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </section>
    </div>
  );
}
