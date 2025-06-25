import { requireAdmin } from '@/lib/auth.guard';
import React from 'react';

const ViewUser = async () => {
  await requireAdmin();
  return <div>View User</div>;
};

export default ViewUser;
