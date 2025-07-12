// components/SpendingCard.tsx
import { LucideIcon, Star } from 'lucide-react';

const DashboardCard = ({
  title = 'Title',
  subtitle,
  icon: Icon = Star,
  amount = 0,
}: {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  amount: number;
}) => {
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800 p-2 md:p-6 rounded-sm md:rounded-xl shadow-md w-full max-w-xs`}
    >
      <div className="text-sm md:text-lg font-medium text-center opacity-90 dark:opacity-80 text-gray-950 dark:text-gray-300">
        {title}
      </div>
      <div className="text-xs mb-4 opacity-60 text-gray-950 dark:text-gray-300">
        {subtitle}
      </div>
      <div className="flex items-baseline justify-between">
        {title == 'Total Favorite Words' ? (
          <Icon
            fill="currentColor"
            className="w-6 h-6 md:w-10 md:h-10 text-orange-600 dark:text-orange-500 "
          />
        ) : (
          <Icon className="w-6 h-6 md:w-10 md:h-10 text-gray-600 dark:text-gray-500 " />
        )}

        <div className="text-base md:text-3xl font-bold text-gray-600 dark:text-gray-500 ">
          {amount}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
