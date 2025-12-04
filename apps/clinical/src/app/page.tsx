import { Button } from "@dental-prodigy/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold">Dental Prodigy Clinical App</h1>
      <p className="text-xl">Welcome to the clinical portal.</p>
      <Link href="/dashboard">
        <Button appName="Clinical" className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
