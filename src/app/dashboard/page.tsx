import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/src/lib/auth";
import DashboardStats from "@/src/components/dashboard/dashboardstats";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  let user: any;

  try {
    user = verifyToken(token);
  } catch {
    redirect("/");
  }

  if (user.rol !== "admin") {
    redirect("/");
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Dashboard MediStock
      </h1>

      <p className="text-gray-500">
        Bienvenido, {user.email}
      </p>

      <DashboardStats />
    </div>
  );
}