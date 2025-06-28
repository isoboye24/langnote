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
              'w-10 h-10 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-zinc-800 transition-colors cursor-pointer',
              className
            )}
          >
            <Icon className="w-5 h-5 text-yellow-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>{tooltipText}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
