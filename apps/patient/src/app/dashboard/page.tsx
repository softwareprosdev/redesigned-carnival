import { createSupabaseServerComponentClient } from "@dental-prodigy/auth";
import { getPatientByUserId, getPatientAppointments } from "@dental-prodigy/database";
import { cookies } from "next/headers";
import { Card } from "@dental-prodigy/ui/card";
import { Button } from "@dental-prodigy/ui/button";
import { Calendar, Clock, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PatientDashboard() {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerComponentClient(cookieStore);
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
      // Middleware should handle this, but for type safety
      return <div>Please log in.</div>;
  }

  const patient = await getPatientByUserId(session.user.id);

  if (!patient) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">Profile Not Found</h2>
        <p className="text-zinc-500">
            We couldn't find a patient record associated with your account.
            Please contact the clinic to link your profile.
        </p>
      </div>
    );
  }

  const appointments = await getPatientAppointments(patient.id);
  
  const nextAppointment = appointments.find(
    apt => new Date(apt.appointmentDate) > new Date() && apt.status === 'scheduled'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Hello, {patient.firstName}
        </h1>
        <Button appName="patient" className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Book Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Next Appointment Card */}
        <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700 p-6">
           <div className="flex flex-col justify-between h-full">
               <div>
                   <h3 className="mb-2 text-lg font-medium text-blue-100">Next Appointment</h3>
                   {nextAppointment ? (
                       <>
                        <div className="flex items-center gap-2 text-3xl font-bold">
                            <Calendar className="h-6 w-6" />
                            {nextAppointment.appointmentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric'})}
                        </div>
                         <div className="mt-2 flex items-center gap-2 text-blue-100">
                            <Clock className="h-4 w-4" />
                            {nextAppointment.appointmentDate.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})}
                            <span className="mx-2">•</span>
                            {nextAppointment.dentistName || "Dentist Assigned"}
                        </div>
                        <div className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                            {nextAppointment.reason || "Checkup"}
                        </div>
                       </>
                   ) : (
                       <div className="py-6 text-blue-100">
                           No upcoming appointments scheduled.
                       </div>
                   )}
               </div>
           </div>
        </Card>

        {/* Quick Actions / Info */}
        <Card className="p-6">
            <h3 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">Quick Actions</h3>
            <div className="space-y-3">
                <Link href="/dashboard/appointments" className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">
                    <span className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        <Calendar className="h-4 w-4" />
                        View Calendar
                    </span>
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                </Link>
                 <Link href="#" className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">
                    <span className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        <FileText className="h-4 w-4" />
                        Medical History
                    </span>
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                </Link>
            </div>
        </Card>
      </div>

      <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Recent Activity</h3>
            <Link href="/dashboard/appointments" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                View All
            </Link>
          </div>
          <div className="space-y-4">
              {appointments.slice(0, 3).map(apt => (
                  <div key={apt.id} className="flex items-center justify-between border-b border-zinc-100 pb-4 last:border-0 last:pb-0 dark:border-zinc-800">
                      <div className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${apt.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                              <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                              <p className="font-medium text-zinc-900 dark:text-zinc-100">{apt.reason || "Appointment"}</p>
                              <p className="text-sm text-zinc-500">{apt.appointmentDate.toLocaleDateString()}</p>
                          </div>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          apt.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          apt.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-zinc-100 text-zinc-800'
                      }`}>
                          {apt.status}
                      </span>
                  </div>
              ))}
              {appointments.length === 0 && (
                  <p className="text-center text-sm text-zinc-500">No recent activity.</p>
              )}
          </div>
      </Card>
    </div>
  );
}
