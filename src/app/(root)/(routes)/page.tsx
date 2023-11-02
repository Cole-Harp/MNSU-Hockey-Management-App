import HomePageButton from '@/Components/ui/LandingPageButton';


const Home = async () => {
  


  return (
    <div>
      <h1 className = 'h-14 flex items-center justify-center'>Hockey Team Management</h1>
      <div className = 'grid grid-rows-3 grid-cols-2 gap-4 px-4 h-3/4'>
          <HomePageButton buttonText = 'Organizations' url = '/Organization'></HomePageButton>
          <HomePageButton buttonText = 'Calendar' url = '/Schedule'></HomePageButton>
          <HomePageButton buttonText = 'Empty' url = '/'></HomePageButton>
          <HomePageButton buttonText = 'Messaging' url = '/Messaging'></HomePageButton>
          <HomePageButton buttonText = 'Profile' url = '/Profile'></HomePageButton>
          <HomePageButton buttonText = 'Invite User' url = '/Invite_User'></HomePageButton>
      </div>
    </div>
  );
};

export default Home;