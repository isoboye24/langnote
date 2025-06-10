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
  getAllPartsOfSpeech,
  deletePartsOfSpeech,
} from '@/lib/actions/admin/parts-of-speech.actions';
import { Language, PartOfSpeech } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';

const PartsOfSpeechPageContent = () => {
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchPartsOfSpeech = async () => {
      const langRes = await getAllLanguages();
      const response = await getAllPartsOfSpeech(page, pageSize);

      if (response.success && langRes.success) {
        setPartsOfSpeech(response?.data as PartOfSpeech[]);
        setLanguages(langRes?.data as Language[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchPartsOfSpeech();
  }, [page]);

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex gap-3">
          <h2 className="hidden md:block h2-bold text-center">
            List of Parts of Speech
          </h2>
        </div>
        <Link href="/admin/parts-of-speech/create">
          <Button variant="default">Create Part of Speech</Button>
        </Link>
      </div>
      <div className="mt-7 md:mt-15">
        <Table>
          <TableHeader className="text-base md:text-xl">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partsOfSpeech?.map((partOfspeech) => {
              const language = languages?.find(
                (langauge) => langauge.id === partOfspeech.languageId
              );

              return (
                <TableRow key={partOfspeech.id}>
                  <TableCell>{partOfspeech.name}</TableCell>
                  <TableCell>{language?.languageName}</TableCell>
                  <TableCell className="flex gap-5">
                    <Link href={`/admin/parts-of-speech/${partOfspeech.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <DeleteDialog
                      id={partOfspeech.id}
                      action={deletePartsOfSpeech}
                    />
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
        Total Parts of Speech: {totalCount}
      </div>
    </div>
  );
};

export default PartsOfSpeechPageContent;
