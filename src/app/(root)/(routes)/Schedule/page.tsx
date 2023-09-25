import Calendar from "@/Components/Schedule/ScheduleComponent";
import { userGetEvents } from "@/lib/db_actions/Event";
import {isAdmin } from "@/lib/db_actions/Auth";

export default async function Page() {

  // Chec
  const { isAdmin: adminStatus, user } = await isAdmin()

  //TODO add options for querying based on user

  return (
    <div>
      <div>
        <Calendar options={null} />
      </div>
      {adminStatus &&
        <div className = "m-2">

          <h1>Admin Tools</h1>
          - Add Filtering
          - Role
          - Specific User
          - All of the same Role
          <button className="bg-primary">this should be a component that updates options variable that will change the settings in the calendar</button>

        </div>
      }
    </div>
  );
}
