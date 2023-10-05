import Calendar from "@/Components/Schedule/ScheduleComponent";
import { useUserContext } from "@/lib/userContext";

export default function Page() {

  //TODO add options for querying based on user

  return (
    <div>
      <Calendar options={null} />
    </div>
  );
}
