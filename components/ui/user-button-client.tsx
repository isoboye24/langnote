'use client';

import Image from 'next/image';
import Link from 'next/link';
import Picture from '@/public/images/vincent.jpg';
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
import { SignOutUser } from '@/lib/actions/admin/user.actions';

const UserButtonClient = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] ?? 'en';
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    );
  }

  const name = session.user?.name || 'Name';
  const email = session.user?.email || 'Email';
  // const role = session.user?.role || '';

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer">
            <Image
              src={Picture}
              alt="User Icon"
              className="w-6 h-6 rounded-full object-cover"
              width={24}
              height={24}
            />
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

          {/* {role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link className="w-full" href={`/${locale}/admin/dashboard`}>
                Admin
              </Link>
            </DropdownMenuItem>
          )} */}

          {/* Temporary always show admin link */}
          <DropdownMenuItem asChild>
            <Link className="w-full" href={`/${locale}/admin/dashboard`}>
              Admin
            </Link>
          </DropdownMenuItem>

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
