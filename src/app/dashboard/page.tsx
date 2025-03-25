import { DashboardTable } from "./table";
import { getSession } from "../../../auth";

export default async function Page() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return <div>Access denied,</div>;
  }

  return <div className="container mx-auto py-10">{<DashboardTable />}</div>;
}
