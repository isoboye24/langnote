import React from 'react';
import GetStarted from '@/components/ui/shared/get-started';
import { requireUserAndAdmin } from '@/lib/auth.guard';
import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/admin/user.actions';

const Documentation = async () => {
  await requireUserAndAdmin();
  const session = await auth();
  const currentUserId = session?.user?.id;
  const userData = await getUserById(currentUserId!);

  return (
    <div className="wrapper">
      <GetStarted user={userData?.data} />
    </div>
  );
};

export default Documentation;
