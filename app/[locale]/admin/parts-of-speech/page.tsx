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
  getAllPartsOfSpeech,
  deletePartsOfSpeech,
  getTotalPartsOfSpeech,
} from '@/lib/actions/admin/parts-of-speech.actions';

export const metadata: Metadata = {
  title: 'List of Parts of Speech',
};

const PartsOfSpeech = async () => {
  const partsOfspeech = await getAllPartsOfSpeech();
  const total = await getTotalPartsOfSpeech();
  const allLanguages = await getAllLanguages();

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
            {partsOfspeech?.data?.map((partOfspeech) => {
              const language = allLanguages?.data?.find(
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
      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Parts of Speech: {total.total}
      </div>
    </div>
  );
};

export default PartsOfSpeech;
