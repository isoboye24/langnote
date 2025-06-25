'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getAllUsers, SignOutUser } from '@/lib/actions/admin/user.actions';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';

const UserButtonClient = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';
  const { data: session } = useSession();
  const [role, setRole] = useState<User[]>([]);

  const name = session?.user?.name;
  const email = session?.user?.email;

  useEffect(() => {
    const fetchEmail = async () => {
      const response = await getAllUsers();
      if (response.success) {
        setRole(response.data as User[]);
      }
    };

    fetchEmail();
  }, []);

  if (!session) {
    return (
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    );
  }

  const currentUser = role.find(
    (userNow) => userNow.email === session?.user?.email
  );

  const firstInitial = currentUser?.userName.charAt(0).toUpperCase() ?? '';

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-300 dark:bg-gray-800 dark:text-gray-400"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 mr-2" align="center" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link className="w-full" href={`/${locale}/user/dashboard`}>
              My Account
            </Link>
          </DropdownMenuItem>

          {currentUser?.role.toLowerCase() === 'admin' && (
            <DropdownMenuItem asChild>
              <Link className="w-full" href={`/${locale}/admin/dashboard`}>
                Admin
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="p-0 mb-1">
            <Button
              className="w-full py-4 px-2 h-4 justify-start"
              variant="ghost"
              onClick={() => SignOutUser()}
            >
              Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButtonClient;
