import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import DeleteDialog from '@/components/ui/shared/delete-dialog';
import {
  getAllLanguages,
  deleteLanguage,
  getTotalLanguages,
} from '@/lib/actions/admin/language.actions';

export const metadata: Metadata = {
  title: 'List of Languages',
};

const Languages = async () => {
  const languages = await getAllLanguages();
  const total = await getTotalLanguages();

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
            {languages?.data?.map((language) => (
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
      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Languages: {total.total}
      </div>
    </div>
  );
};

export default Languages;
