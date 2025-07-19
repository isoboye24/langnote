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
      className={`bg-gray-50 dark:bg-slate-900 py-2 px-5 rounded-sm md:rounded-xl shadow-md grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr]`}
    >
      <div className="flex justify-center items-center ">
        {title == 'Total Favorite Words' ? (
          <div className="p-3 bg-slate-950 rounded-full">
            <Icon
              fill="currentColor"
              className="w-4 h-4 md:w-6 md:h-6 text-orange-600 dark:text-orange-800 "
            />
          </div>
        ) : (
          <div className="p-3 bg-slate-950 rounded-full">
            <Icon className="w-4 h-4 md:w-6 md:h-6 text-orange-600 dark:text-orange-800" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="">
          <div className="text-sm md:text-lg font-medium text-center opacity-90 dark:opacity-80 text-gray-950 dark:text-gray-300">
            {title}
          </div>
          <div className="text-xs opacity-60 text-gray-950 dark:text-gray-300">
            {subtitle}
          </div>
        </div>
        <div className="text-base text-end md:text-3xl font-bold text-gray-600 dark:text-gray-500 ">
          {amount}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
