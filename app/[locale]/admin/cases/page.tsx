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
import { getAllLanguages } from '@/lib/actions/admin/language.actions';
import {
  getAllWordCases,
  getTotalWordCase,
  deleteWordCase,
} from '@/lib/actions/admin/cases.actions';

export const metadata: Metadata = {
  title: 'List of Word Cases',
};

const WordCase = async () => {
  const wordCases = await getAllWordCases();
  const total = await getTotalWordCase();
  const allLanguages = await getAllLanguages();

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex gap-3">
          <h2 className="hidden md:block h2-bold text-center">
            List of Word Cases
          </h2>
        </div>
        <Link href="/admin/cases/create">
          <Button variant="default">Create word case</Button>
        </Link>
      </div>
      <div className="mt-7 md:mt-15">
        <Table>
          <TableHeader className="text-base md:text-xl">
            <TableRow>
              <TableHead>Case Name</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wordCases?.data?.map((wordCase) => {
              const language = allLanguages?.data?.find(
                (langauge) => langauge.id === wordCase.languageId
              );

              return (
                <TableRow key={wordCase.id}>
                  <TableCell>{wordCase.caseName}</TableCell>
                  <TableCell>{language?.languageName}</TableCell>
                  <TableCell className="flex gap-5">
                    <Link href={`/admin/cases/${wordCase.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <DeleteDialog id={wordCase.id} action={deleteWordCase} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Word Cases: {total.total}
      </div>
    </div>
  );
};

export default WordCase;
