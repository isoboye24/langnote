import React from 'react';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/admin/user.actions';
import Profile from './profile';
import {
  getBookWithMostWords,
  getTotalUserBooks,
} from '@/lib/actions/user/book.actions';
import {
  getAllTotalUserFavoriteWordCount,
  getAllTotalUserKnownWordCount,
  getAllTotalUserWord,
} from '@/lib/actions/user/word.actions';
import {
  getAllTotalWordGroup,
  getMostUsedGroup,
} from '@/lib/actions/user/word-group.actions';

const ProfilePage = async () => {
  await requireUserAndAdmin();
  const session = await auth();
  const currentUserId = session?.user?.id;
  const user = await getUserById(currentUserId!);

  if (!currentUserId) {
    return <div>You&apos;re not authenticated</div>;
  }

  const [
    totalUserWords,
    totalUserGroup,
    totalBooks,
    totalFavoriteWords,
    totalKnownWords,
    mostUsedBook,
  ] = await Promise.all([
    getAllTotalUserWord(),
    getAllTotalWordGroup(),
    getTotalUserBooks(currentUserId),
    getAllTotalUserFavoriteWordCount(),
    getAllTotalUserKnownWordCount(),
    getBookWithMostWords(),
  ]);

  let mostUsedGroup = null;

  if (mostUsedBook?.id) {
    mostUsedGroup = await getMostUsedGroup(mostUsedBook.id);
  } else {
    console.warn('No book found with words');
  }

  return (
    <div>
      <Profile
        user={user?.data}
        totalUserWords={totalUserWords}
        totalUserGroup={totalUserGroup}
        totalBooks={totalBooks}
        totalFavoriteWords={totalFavoriteWords}
        totalKnownWords={totalKnownWords}
        mostUsedBook={mostUsedBook?.title}
        getMostUsedGroup={mostUsedGroup?.data?.groupName}
        getMostUsedGroupWordCount={mostUsedGroup?.data?.wordCount}
      />
    </div>
  );
};

export default ProfilePage;
