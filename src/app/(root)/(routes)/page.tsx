import Link from 'next/link';

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";


const Home = () => {

  return (
    
    <div>
      <SignedOut>
        <RedirectToSignIn /> // Could be turned into a sign in page button
      </SignedOut>
      <SignedIn>
      <h1 className = 'h-14 flex items-center justify-center'>Hockey Team Management</h1>
      <ul className = 'grid grid-cols-2 gap-4 px-4 h-3/4 overflow-y-visible'>
        <li className = 'grid p-4 border-mnsu_gold border-4 bg-mnsu_purple text-mnsu_gold font-bold rounded-md items-center justify-center'>
          <Link className = 'text-center' href="/Admin_Dashboard">
            Organization
          </Link>
        </li>
        <li className = 'grid p-4 border-mnsu_gold border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md items-center justify-center'>
          <Link className = 'text-center' href="/Schedule">
            Calendar
          </Link>
        </li>
        <li className = 'grid p-4 border-mnsu_gold border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md items-center justify-center'>
          <Link className = 'text-center' href="/Drills">
            Drills
          </Link>
        </li>
        <li className = 'grid p-4 h-full overflow-y-hidden border-mnsu_gold border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md items-center justify-center'>
          <Link className = 'text-center' href="/Messaging">
            Messaging
          </Link>
        </li>
        <li className = 'grid p-4 border-mnsu_gold border-4 bg-mnsu_purple text-mnsu_gold font-bold rounded-md items-center justify-center'>
          <Link className = 'text-center' href="/Profile">
            Profile
          </Link>
        </li>
        <li className = 'grid p-4 border-mnsu_gold border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md items-center justify-center'>
          <Link className = 'text-center' href="/">
            Example 2
          </Link>
        </li>
      </ul>
      </SignedIn>
    </div>
  );
};

export default Home;