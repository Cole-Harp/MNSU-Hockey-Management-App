import InviteUser from "@/Components/Admin/InviteUser";
import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { table } from "console";
import { useRouter } from "next/navigation";
import { components } from "react-select";



export default function Page() {
  return <SignUp/>;
}

// 1. Make new page add path to SignUp Clerk components
// 2. For signup redirect page create query in user table FUNC createUser()
// 3. after createUser function is hit push them to the dashboard router.push("../../../../(root)/(routes)/Dashboard/page.tsx")