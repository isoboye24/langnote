import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export const SmallCirclesWithIcon = ({
  icon: Icon,
  tooltipText,
  className,
}: {
  icon: LucideIcon;
  tooltipText: string;
  className?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'w-10 h-10 md:w-15 md:h-15 flex items-center justify-center rounded-full bg-orange-200 dark:bg-gray-700 hover:bg-orange-300 hover:dark:bg-gray-600 transition-colors cursor-pointer',
              className
            )}
          >
            <Icon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>{tooltipText}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
