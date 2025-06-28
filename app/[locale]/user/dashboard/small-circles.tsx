import { SmallCirclesWithIcon } from '@/components/ui/shared/small-circle-with-icon-center';
import { BookType, Calendar1, RotateCcw } from 'lucide-react';
import React from 'react';

const SmallCircles = () => {
  return (
    <div className="flex gap-5 md:gap-10 lg:gap-20">
      <SmallCirclesWithIcon icon={RotateCcw} tooltipText="History" />
      <SmallCirclesWithIcon icon={BookType} tooltipText="Last 2 weeks" />
      <SmallCirclesWithIcon icon={Calendar1} tooltipText="Last Month" />
      <SmallCirclesWithIcon icon={Calendar1} tooltipText="Last 3 Month" />
    </div>
  );
};

export default SmallCircles;
