import { Sidebar } from './_components/sidebar';
import { Navbar } from './_components/navbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className='h-full'>
      <div className='md:hidden h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <Navbar />
      </div>
      <div className='hidden md:flex h-full w-56 z-50 flex-col fixed inset-y-0'>
        <Sidebar />
      </div>
      {/* <main className='md:pl-56 pt-[80px] h-full'></main>  */}
      <main className='md:pl-56 pt-[80px] md:pt-0 h-full my-10'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout;
