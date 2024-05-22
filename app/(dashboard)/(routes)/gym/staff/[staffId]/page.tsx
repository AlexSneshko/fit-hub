import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { Pencil } from 'lucide-react';
import { format } from 'date-fns';

const StaffIdPage = async ({ params }: { params: { staffId: string } }) => {
  const { userId } = await auth();

  const staff = await db.staff.findUnique({
    where: {
      id: params.staffId,
    },
    include: {
      user: true,
      gym: true,
    },
  });

  if (!staff) {
    return notFound();
  }

  const authorName = staff.gym.username;
  const isOwner = staff.gymId === userId

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <h1 className="text-3xl font-semibold">{staff.fullName}</h1>
        {isOwner && (
          <Link href={`/gym/staff/${staff.id}/edit`} className="ml-4">
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" /> Edit/Delete
            </Button>
          </Link>
        )}
      </div>
      {staff.imageUrl && (
        <Image
          src={staff.imageUrl}
          alt={staff.fullName}
          width={600}
          height={400}
          className="object-cover rounded mb-4 mx-auto"
        />
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="block text-sm text-gray-600">
          Joined on: {format(new Date(staff.firstDate), "PPP")}
            {/* Period: {format(new Date(promotion.firstDate), "PPP")} -{" "}
            {format(new Date(promotion.lastDate), "PPP")} */}
          </span>
        </div>
        <div>
          <Link
            href={`/gym/${authorName}`}
            className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {authorName}
          </Link>
        </div>
      </div>
      <div className="text-gray-700 text-base mb-4">
        {staff.description}
      </div>
    </div>
    // <div className="container mx-auto px-4 py-8">
    //   <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    //     {staff.imageUrl && (
    //       <div className="relative h-64">
    //         <Image
    //           src={staff.imageUrl}
    //           alt={staff.fullName}
    //           layout="fill"
    //           objectFit="cover"
    //         />
    //       </div>
    //     )}
    //     <div className="px-6 py-4">
    //       <h1 className="font-bold text-3xl mb-2">{staff.fullName}</h1>
    //       <h2 className="text-gray-700 text-xl mb-2">{staff.role}</h2>
    //       {staff.description && (
    //         <p className="text-gray-700 text-base mb-4">{staff.description}</p>
    //       )}
    //       <span className="block text-sm text-gray-600">
    //         Joined on: {new Date(staff.createdAt).toLocaleDateString()}
    //       </span>
    //     </div>
    //     <div className="px-6 py-4">
    //       <Link href="/staff">
    //         <Button type="button" variant="ghost">
    //           Back to Staff List
    //         </Button>
    //       </Link>
    //       <Link href={`/staff/edit/${staff.id}`}>
    //         <Button type="button" className="ml-2">
    //           Edit Staff Member
    //         </Button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default StaffIdPage;
