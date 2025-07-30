import React from 'react';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/admin/user.actions';
import Profile from './profile';

const ProfilePage = async () => {
  await requireUserAndAdmin();
  const session = await auth();
  const currentUserId = session?.user?.id;
  const user = await getUserById(currentUserId!);

  return (
    <div>
      <Profile user={user?.data} />
    </div>
  );
};

export default ProfilePage;
