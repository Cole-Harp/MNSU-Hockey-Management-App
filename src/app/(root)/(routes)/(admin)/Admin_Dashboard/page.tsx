import { isAdmin } from "@/lib/db_actions/Auth";
import Calendar from "@/Components/Schedule/ScheduleComponent";
import { useUserContext } from "@/lib/userContext";

export default async function Page() {

  // Chec
  const { isAdmin: adminStatus } = await isAdmin()
  const { user } = useUserContext()



  //TODO add options for querying based on user

  return (
    <div>
      <div>
        <h1>Welcome, {user?.name || 'Guest'}! You are an {user?.role}</h1>
      </div>
      <div>
        <Calendar options={null} />
      </div>
      {adminStatus &&
        <div>

          <h1>Admin Tools</h1>
          - Add Filtering
          - Role
          - Specific User
          - All of the same Role
          <button className="bg-primary">this should be a link route to AdminCalendar</button>

        </div>
      }
    </div>
  );
}
