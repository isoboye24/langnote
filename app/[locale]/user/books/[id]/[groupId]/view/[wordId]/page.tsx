import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';

const ViewWord = async () => {
  await requireUserAndAdmin();
  return <div>View Word</div>;
};

export default ViewWord;
