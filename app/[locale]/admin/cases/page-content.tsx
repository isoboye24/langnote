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
import { getAllLanguages } from '@/lib/actions/admin/language.actions';
import {
  getAllWordCases,
  deleteWordCase,
} from '@/lib/actions/admin/cases.actions';
import { WordCase, Language } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';

const WordCasePageContent = () => {
  const [cases, setCases] = useState<WordCase[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchCases = async () => {
      const langRes = await getAllLanguages();
      const response = await getAllWordCases(page, pageSize);

      if (response.success && langRes.success) {
        setCases(response?.data as WordCase[]);
        setLanguages(langRes?.data as Language[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchCases();
  }, [page]);

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
            {cases.map((wordCase) => {
              const language = languages.find(
                (lang) => lang.id === wordCase.languageId
              );

              return (
                <TableRow key={wordCase.id}>
                  <TableCell>{wordCase.caseName}</TableCell>
                  <TableCell>{language?.languageName || 'Unknown'}</TableCell>
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

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Word Cases: {totalCount}
      </div>
    </div>
  );
};

export default WordCasePageContent;
