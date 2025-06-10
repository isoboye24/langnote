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
import {
  getAllLanguages,
  deleteLanguage,
} from '@/lib/actions/admin/language.actions';
import { Language } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';

const LanguagePageContent = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await getAllLanguages(page, pageSize);

      if (response.success) {
        setLanguages(response?.data as Language[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchLanguages();
  }, [page]);

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex gap-3">
          <h2 className="hidden md:block h2-bold text-center">
            List of Languages
          </h2>
        </div>
        <Link href="/admin/languages/create">
          <Button variant="default">Create Language</Button>
        </Link>
      </div>
      <div className="mt-7 md:mt-15">
        <Table>
          <TableHeader className="text-xl">
            <TableRow>
              <TableHead>Language</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {languages?.map((language) => (
              <TableRow key={language.id}>
                <TableCell>{language.languageName}</TableCell>
                <TableCell className="flex gap-5">
                  <Link href={`/admin/languages/${language.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <DeleteDialog id={language.id} action={deleteLanguage} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Languages: {totalCount}
      </div>
    </div>
  );
};

export default LanguagePageContent;
