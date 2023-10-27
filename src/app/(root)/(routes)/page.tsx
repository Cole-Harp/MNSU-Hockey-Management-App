import Link from 'next/link';


const Home = async () => {
  //const user = await getOrCreateUser()
  //const email = user.email;
  return (
    <div>
      <h1 className = 'h-1/6 flex items-center justify-center'>Hockey Team Management</h1>
      <ul className = 'grid grid-cols-2 gap-4 mx-4 h-3/4'>
        <li className = 'p-4  border-mnsu_gold border-4 bg-mnsu_purple text-mnsu_gold font-bold rounded-md flex items-center justify-center'>
          <Link href="/Admin_Dashboard">
            Organization and User Management
          </Link>
        </li>
        <li className = 'p-4 border-mnsu_gold border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md flex items-center justify-center'>
          <Link href="/Schedule">
            Calendar and Schedule
          </Link>
        </li>
        <li className = 'p-4  border-mnsu_gold border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md flex items-center justify-center'>
          <Link href="/AddUser">
            Add User
          </Link>
        </li>
        <li className = 'p-4  border-yellow-500 border-4 bg-mnsu_purple  text-mnsu_gold font-bold rounded-md flex items-center justify-center'>
          <Link href="/Messaging">
            Messaging Board
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;