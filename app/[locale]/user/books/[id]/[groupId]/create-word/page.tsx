import { requireUserAndAdmin } from '@/lib/auth.guard';
import React from 'react';

const CreateWord = async () => {
  await requireUserAndAdmin();
  return <div>CreateWord</div>;
};

export default CreateWord;
