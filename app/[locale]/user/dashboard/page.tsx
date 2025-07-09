import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';
import Cards from './cards';
import { getAllTotalUserWord } from '@/lib/actions/user/word.actions';
import { getAllTotalWordGroup } from '@/lib/actions/user/word-group.actions';
import { auth } from '@/auth';
import { getTotalUserBooks } from '@/lib/actions/user/book.actions';
import { getUserById } from '@/lib/actions/admin/user.actions';

const UserDashboard = async () => {
  await requireUserAndAdmin();
  const session = await auth();
  const currentUserId = session?.user?.id;
  const user = await getUserById(currentUserId!);

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
        {currentUserId && (
          <h1 className="text-xl text-center mb-10">
            Welcome{' '}
            <strong className="font-bold text-2xl">
              {user.data?.userName}!
            </strong>
          </h1>
        )}
        <div>
          <Cards
            wordTotal={totalUserWords}
            bookTotal={totalBooks}
            groupTotal={totalUserGroup}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
