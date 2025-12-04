import { getAppointmentsRange } from "@dental-prodigy/database";
import { Card } from "@dental-prodigy/ui/card";
import { Button } from "@dental-prodigy/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const params = await searchParams;
  const today = new Date();
  const year = params.year ? parseInt(params.year) : today.getFullYear();
  const month = params.month ? parseInt(params.month) : today.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // Calculate calendar grid
  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = lastDayOfMonth.getDate();
  
  const appointments = await getAppointmentsRange(firstDayOfMonth, lastDayOfMonth);

  const calendarDays = [];
  // Add empty cells for previous month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Group appointments by day
  const appointmentsByDay: Record<number, typeof appointments> = {};
  appointments.forEach(apt => {
    const day = apt.appointmentDate.getDate();
    if (!appointmentsByDay[day]) appointmentsByDay[day] = [];
    appointmentsByDay[day].push(apt);
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Appointments
        </h1>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
              <Button appName="clinical" className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="w-32 text-center text-sm font-medium">
                  {monthNames[month]} {year}
              </span>
              <Button appName="clinical" className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <ChevronRight className="h-4 w-4" />
              </Button>
           </div>
           <Button appName="clinical" className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <Card className="flex-1 p-0 flex flex-col overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-none">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-zinc-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 auto-rows-fr divide-x divide-y divide-zinc-200 dark:divide-zinc-800">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/30 ${!day ? "bg-zinc-50/50 dark:bg-zinc-900/50" : ""}`}
            >
              {day && (
                <>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                      day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                      ? "bg-blue-600 text-white"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}>
                    {day}
                  </span>
                  <div className="mt-2 space-y-1">
                    {appointmentsByDay[day]?.map(apt => (
                        <div key={apt.id} className="truncate rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {apt.appointmentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} {apt.patientName}
                        </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
