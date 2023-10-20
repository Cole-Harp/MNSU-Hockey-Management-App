import { getAdmin, isAdmin } from "@/lib/db_actions/Auth";
import { AdminUserEditor } from "@/Components/Admin/AdminUserEditor";
import AdminCalendarComponent from "@/Components/Admin/AdminCalendarComponent";
import { Link } from "lucide-react";

export default async function Page() {

  const { isAdmin: adminStatus, user } = await getAdmin()

  return (
    <div>
      <div>
        Welcome, {user?.name || 'Guest'}! You are an {user?.role}
      </div>
      <div>
      </div>
      {adminStatus &&
        <div>
          <AdminUserEditor/>
          <div className=" border-t-4 my-5">
          <AdminCalendarComponent isAdmin={adminStatus}/>
          </div>
        </div>
      }
    </div>
  );
}
