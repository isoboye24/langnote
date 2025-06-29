import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';
import Cards from './cards';
import SmallCircles from './small-circles';
import { getAllTotalUserWord } from '@/lib/actions/user/word.actions';
import { getAllTotalWordGroup } from '@/lib/actions/user/word-group.actions';
import { auth } from '@/auth';
import { getTotalUserBooks } from '@/lib/actions/user/book.actions';

const UserDashboard = async () => {
  await requireUserAndAdmin();
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    // Optionally handle missing session (e.g. redirect or return null)
    return <div>User not authenticated</div>;
  }

  const [totalUserWords, totalUserGroup, totalBooks] = await Promise.all([
    getAllTotalUserWord(),
    getAllTotalWordGroup(),
    getTotalUserBooks(currentUserId),
  ]);

  return (
    <div>
      <div className="wrapper">
        <h1 className="font-bold text-2xl text-center mb-10">User Dashboard</h1>
        <div>
          <Cards
            wordTotal={totalUserWords}
            bookTotal={totalBooks}
            groupTotal={totalUserGroup}
          />
        </div>
        <div className="mt-10 justify-items-center">
          <SmallCircles />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
