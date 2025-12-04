import { getPatientById } from "@dental-prodigy/database";
import { Odontogram } from "@dental-prodigy/ui/odontogram";
import { Card } from "@dental-prodigy/ui/card";
import { Button } from "@dental-prodigy/ui/button";
import { Calendar, FileText, User, AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = await getPatientById(id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            {patient.firstName[0]}
            {patient.lastName[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {patient.firstName} {patient.lastName}
            </h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>ID: {patient.id.slice(0, 8)}</span>
              <span>•</span>
              <span>{patient.gender || "Gender not specified"}</span>
              <span>•</span>
              <span>{patient.dob ? new Date(patient.dob).toLocaleDateString() : "DOB not set"}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button appName="clinical" className="flex items-center gap-2 border border-zinc-200 bg-white px-4 py-2 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Calendar className="h-4 w-4" />
            Schedule
          </Button>
          <Button appName="clinical" className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 rounded-md">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Info & History */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-zinc-500">Email</span>
                <span className="text-zinc-900 dark:text-zinc-100">{patient.email || "N/A"}</span>
              </div>
              <div>
                <span className="block text-zinc-500">Phone</span>
                <span className="text-zinc-900 dark:text-zinc-100">{patient.phone || "N/A"}</span>
              </div>
              <div>
                <span className="block text-zinc-500">Address</span>
                <span className="text-zinc-900 dark:text-zinc-100">{patient.address || "N/A"}</span>
              </div>
            </div>
          </Card>

           <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
              <AlertCircle className="h-4 w-4" />
              Medical Alerts
            </h3>
            <div className="space-y-2">
                {patient.medicalHistory ? (
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{patient.medicalHistory}</p>
                ) : (
                     <p className="text-sm text-zinc-500">No medical alerts recorded.</p>
                )}
            </div>
          </Card>
        </div>

        {/* Right Column: Odontogram & Treatments */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
                <FileText className="h-4 w-4" />
                Dental Chart
              </h3>
              <div className="text-xs text-zinc-500">
                Last updated: Today
              </div>
            </div>
            
            {/* Odontogram Integration */}
            <Odontogram 
              teethStatus={{
                 1: 'missing',
                 3: 'crown',
                 14: 'decay',
                 19: 'root_canal',
                 30: 'filled'
              }}
            />
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">Treatment Plan</h3>
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
               <div className="p-4 text-center text-sm text-zinc-500">
                  No active treatment plans.
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
