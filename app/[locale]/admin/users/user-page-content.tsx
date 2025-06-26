'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DeleteDialog from '@/components/ui/shared/delete-dialog';
import { User } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import { deleteUser, getAllUsers } from '@/lib/actions/admin/user.actions';
import { Eye, Pen } from 'lucide-react';
import { getTotalUserWordForUser } from '@/lib/actions/user/word.actions';

const UserPageContent = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [userWordCounts, setUserWordCounts] = useState<Record<string, number>>(
    {}
  );

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers(page, pageSize);

      if (response.success) {
        setUsers(response?.data as User[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchUsers();
  }, [page]);

  useEffect(() => {
    const fetchAllCounts = async () => {
      const counts: Record<string, number> = {};
      for (const user of users || []) {
        const res = await getTotalUserWordForUser(user.id);
        if (res.success) {
          counts[user.id] = res.count;
        } else {
          counts[user.id] = 0; // or handle error case
        }
      }
      setUserWordCounts(counts);
    };

    fetchAllCounts();
  }, [users]);

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex gap-3">
          <h2 className="hidden md:block h2-bold text-center">List of Users</h2>
        </div>
        <Link href="/admin/users/create">
          <Button variant="default">Create User</Button>
        </Link>
      </div>
      <div className="mt-7 md:mt-15">
        <Table>
          <TableHeader className="text-base md:text-xl">
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tot. Words</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {userWordCounts[user.id] ?? 'Loading...'}
                  </TableCell>

                  {user.role === 'admin' ? (
                    <TableCell className="text-amber-500">
                      {user.role}
                    </TableCell>
                  ) : (
                    <TableCell>{user.role}</TableCell>
                  )}

                  <TableCell className="flex gap-5">
                    <Link href={`/admin/users/${user.id}`}>
                      <Button>
                        <Pen />{' '}
                      </Button>
                    </Link>
                    <Link href={`/admin/users/${user.id}`}>
                      <Button>
                        <Eye />{' '}
                      </Button>
                    </Link>
                    <DeleteDialog id={user.id} action={deleteUser} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Words: {totalCount}
      </div>
    </div>
  );
};

export default UserPageContent;
