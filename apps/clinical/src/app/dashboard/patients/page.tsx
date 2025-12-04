import { getAllPatients } from "@dental-prodigy/database";
import { Card } from "@dental-prodigy/ui/card";
import { Button } from "@dental-prodigy/ui/button";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PatientsPage() {
  const patients = await getAllPatients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Patients
        </h1>
        <Button appName="clinical" className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="border-b border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="h-9 w-full rounded-md border border-zinc-200 bg-white pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Last Visit</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No patients found. Add your first patient to get started.
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                      <Link href={`/dashboard/patients/${patient.id}`} className="hover:text-blue-500">
                        {patient.firstName} {patient.lastName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{patient.email || "-"}</td>
                    <td className="px-6 py-4 text-zinc-500">{patient.phone || "-"}</td>
                    <td className="px-6 py-4 text-zinc-500">Oct 24, 2023</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/patients/${patient.id}`}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
