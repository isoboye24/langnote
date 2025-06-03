'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const LocalePage = () => {
  const params = useParams();

  return <div>Locale Page for {params.locale}</div>;
};

export default LocalePage;
