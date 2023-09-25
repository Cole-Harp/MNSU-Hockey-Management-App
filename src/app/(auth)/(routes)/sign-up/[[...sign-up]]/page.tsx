import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Page() {
  return <SignUp />;
}

//TODO Create User in db table