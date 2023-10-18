import Calendar from "@/Components/Schedule/ScheduleComponent";
import { useUserContext } from "@/lib/userContext";

export default function Page() {



  return (
    <div className="m-2 flex justify-center align-middle">
      <Calendar options={null} />
    </div>
  );
}
