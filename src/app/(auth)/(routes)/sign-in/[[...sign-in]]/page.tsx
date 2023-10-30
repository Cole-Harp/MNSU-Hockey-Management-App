import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn routing = 'path' afterSignInUrl = {'/Welcome'}/>;
}

//TODO Set User Context in db table