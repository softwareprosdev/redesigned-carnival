import { Card } from "@dental-prodigy/ui/card";
import { Users, Calendar, DollarSign, Activity } from "lucide-react";
import {
  getDashboardStats,
  getRecentAppointments,
  getUpcomingTreatments,
} from "@dental-prodigy/database";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const statsData = await getDashboardStats();
  const recentAppointments = await getRecentAppointments();
  const upcomingTreatments = await getUpcomingTreatments();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const stats = [
    {
      name: "Total Patients",
      value: statsData.totalPatients.toString(),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      name: "Appointments Today",
      value: statsData.appointmentsToday.toString(),
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      name: "Revenue (Month)",
      value: formatCurrency(statsData.revenue),
      icon: DollarSign,
      color: "bg-yellow-500",
    },
    {
      name: "Active Treatments",
      value: statsData.activeTreatments.toString(),
      icon: Activity,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Dashboard Overview
        </h1>
        <div className="flex gap-2">
          <select className="rounded-md border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg p-3 ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {stat.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Recent Appointments
          </h3>
          <div className="space-y-4">
            {recentAppointments.length === 0 ? (
              <p className="text-sm text-zinc-500">No recent appointments found.</p>
            ) : (
              recentAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {apt.patientName.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {apt.patientName}
                      </p>
                      <p className="text-xs text-zinc-500">{apt.reason || "Checkup"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-900 dark:text-zinc-100">
                      {apt.date.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {apt.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Upcoming Treatments
          </h3>
          <div className="space-y-4">
            {upcomingTreatments.length === 0 ? (
              <p className="text-sm text-zinc-500">No upcoming treatments found.</p>
            ) : (
              upcomingTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {treatment.treatmentName}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {treatment.dentistName || "Unassigned"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium rounded-full bg-yellow-100 px-2 py-1 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500">
                    {treatment.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
