import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn afterSignInUrl="/Welcome" />
    </div>
  );
}

//TODO Set User Context in db table