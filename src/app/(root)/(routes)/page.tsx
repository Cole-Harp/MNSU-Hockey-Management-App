import Link from 'next/link';


const Home = async () => {
  //const user = await getUser()
  //const email = user.email;
  return (
    <div>
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
          <Link className = 'text-center' href="/SDK_Test">
            SDK Test
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
          <Link className = 'text-center' href="/Invite_User">
            Invite User
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;