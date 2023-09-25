import Calendar from "@/Components/Schedule/ScheduleComponent";
import { userGetEvents } from "@/lib/db_actions/Event";
import {isAdmin } from "@/lib/db_actions/Auth";

export default async function Page() {


  //TODO add options for querying based on user

  return (
    <div>
      <Calendar options={null} />
    </div>
  );
}
