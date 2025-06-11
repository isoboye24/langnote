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
import { Language, Gender } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import {
  deleteGender,
  getAllGenders,
} from '@/lib/actions/admin/gender.actions';

const GenderPageContent = () => {
  const [genders, setGender] = useState<Gender[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchCases = async () => {
      const langRes = await getAllLanguages();
      const response = await getAllGenders(page, pageSize);

      if (response.success && langRes.success) {
        setGender(response?.data as Gender[]);
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
            List of Genders
          </h2>
        </div>
        <Link href="/admin/genders/create">
          <Button variant="default">Create Gender</Button>
        </Link>
      </div>

      <div className="mt-7 md:mt-15">
        <Table>
          <TableHeader className="text-base md:text-xl">
            <TableRow>
              <TableHead>Gender Name</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {genders.map((gender) => {
              const language = languages.find(
                (lang) => lang.id === gender.languageId
              );

              return (
                <TableRow key={gender.id}>
                  <TableCell>{gender.genderName}</TableCell>
                  <TableCell>{language?.languageName || 'Unknown'}</TableCell>
                  <TableCell className="flex gap-5">
                    <Link href={`/admin/genders/${gender.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <DeleteDialog id={gender.id} action={deleteGender} />
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
        Total Genders: {totalCount}
      </div>
    </div>
  );
};

export default GenderPageContent;
