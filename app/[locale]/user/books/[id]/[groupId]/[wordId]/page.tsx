import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';

const UpdateWord = async () => {
  await requireUserAndAdmin();
  return <div>Update Word</div>;
};

export default UpdateWord;
