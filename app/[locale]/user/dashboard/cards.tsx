import DashboardCard from '@/components/ui/shared/dashboard-card';
import { BookA, Boxes, Brain, Notebook, Star } from 'lucide-react';

const Cards = ({
  bookTotal,
  groupTotal,
  wordTotal,
  favoriteWordTotal,
  KnownWordTotal,
}: {
  bookTotal: number;
  groupTotal: number;
  wordTotal: number;
  favoriteWordTotal: number;
  KnownWordTotal: number;
}) => {
  const items = [
    { icon: Notebook, amount: bookTotal, title: 'Total Books' },
    { icon: Boxes, amount: groupTotal, title: 'Total Groups' },
    { icon: BookA, amount: wordTotal, title: 'Total Words' },
    { icon: Star, amount: favoriteWordTotal, title: 'Total Favorite Words' },
    { icon: Brain, amount: KnownWordTotal, title: 'Total Known Words' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map(({ icon, amount, title }, i) => (
        <DashboardCard key={i} icon={icon} amount={amount} title={title} />
      ))}
    </div>
  );
};

export default Cards;
