import HeaderBox from '@/components/ui/HeaderBox'
import RecentTransactions from '@/components/ui/RecentTransactions';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams }: { searchParams: Record<string, string | undefined> }) => {
  const {id, page} = await searchParams;


// const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage =  Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  // const userId = ;

  //  console.log("id", id);
  // console.log("page", page); 
  // console.log("userId", loggedIn.userId);
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  // console.log("accounts", accounts);
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  // console.log("finally mil gaya");
  // console.log(appwriteItemId);
  // console.log(accountsData)
  // console.log( "hello jeeeee")

  const account = await getAccount({ appwriteItemId })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home