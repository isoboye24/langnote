import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';
import Cards from './cards';
import {
  getAllTotalUserFavoriteWordCount,
  getAllTotalUserKnownWordCount,
  getAllTotalUserWord,
} from '@/lib/actions/user/word.actions';
import { getAllTotalWordGroup } from '@/lib/actions/user/word-group.actions';
import { auth } from '@/auth';
import { getTotalUserBooks } from '@/lib/actions/user/book.actions';
import { getUserById } from '@/lib/actions/admin/user.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UserDashboard = async () => {
  await requireUserAndAdmin();
  const session = await auth();
  const currentUserId = session?.user?.id;
  const user = await getUserById(currentUserId!);

  if (!currentUserId) {
    // Optionally handle missing session (e.g. redirect or return null)
    return <div>User not authenticated</div>;
  }

  const [
    totalUserWords,
    totalUserGroup,
    totalBooks,
    totalFavoriteWords,
    totalKnownWords,
  ] = await Promise.all([
    getAllTotalUserWord(),
    getAllTotalWordGroup(),
    getTotalUserBooks(currentUserId),
    getAllTotalUserFavoriteWordCount(),
    getAllTotalUserKnownWordCount(),
  ]);

  return (
    <div>
      <div className=" ">
        <div className="mb-10 flex justify-between wrapper">
          {currentUserId && (
            <h1 className="text-xl text-center ">
              Welcome{' '}
              <strong className="font-bold text-2xl">
                {user.data?.userName}!
              </strong>
            </h1>
          )}
          {totalBooks > 2 && (
            <div className="">
              <Link href={`http://localhost:3000/en/documentation`}>
                <Button className="bg-black dark:bg-slate-800 text-gray-200 dark:text-gray-300">
                  How to use
                  <strong className="text-green-500  ">LangNote</strong>
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div>
          <Cards
            wordTotal={totalUserWords}
            bookTotal={totalBooks}
            groupTotal={totalUserGroup}
            favoriteWordTotal={totalFavoriteWords}
            KnownWordTotal={totalKnownWords}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
