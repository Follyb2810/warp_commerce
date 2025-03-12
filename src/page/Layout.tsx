import Header from '@/components/ui/shared/Header';
import SubHeader from '@/components/ui/shared/SubHeader';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (


    <div className="flex flex-col min-h-screen w-full">
      <SubHeader/>
      <Header />
      <main className="mt-2">
        <Outlet />
        
      </main>
      {/* <Footer /> */}
    </div>

  );
}
