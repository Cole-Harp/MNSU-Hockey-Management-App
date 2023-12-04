import { getAdmin, getAllUsers, isAdmin } from "@/lib/db_actions/Auth";
import { AdminUserEditor } from "@/Components/Admin/AdminUserEditor";
import AdminCalendarComponent from "@/Components/Admin/AdminCalendarComponent";
import { Link } from "lucide-react";

export default async function Page() {

  const { isAdmin: adminStatus, user } = await getAdmin()
  const fetchedUsers = await getAllUsers();

  return (
    <div>
      <div>
        Welcome, {user?.name || 'Guest'}! You are an {user?.role}
      </div>
      <div>
      </div>
      {adminStatus &&
        <div>
          <AdminUserEditor user_list = {fetchedUsers}/>
          <div className=" border-t-4 my-5">
          <AdminCalendarComponent isAdmin={adminStatus} currUser={user!} user_list={fetchedUsers}/>
          </div>
          
        </div>
      }
    </div>
  );
}
