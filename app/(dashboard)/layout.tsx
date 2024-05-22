import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (userId) {
      const user = await db.user.findUnique({
        where: {
          id: userId
        }
      })
    
      const gym = await db.gym.findUnique({
        where: {
          id: userId
        }
      })

      if (!user && !gym) {
        redirect("/select-type")
      }
  }


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
