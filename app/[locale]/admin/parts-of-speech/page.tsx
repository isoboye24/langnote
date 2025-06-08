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
  getAllPopularCategory,
  deletePopularCategory,
  getTotalPopularCategory,
} from '@/lib/actions/admin/popular-list-category.actions';
import { getAllLanguages } from '@/lib/actions/admin/language.actions';

export const metadata: Metadata = {
  title: 'List of Parts of Speech',
};

const PartsOfSpeech = async () => {
  const categories = await getAllPopularCategory();
  const total = await getTotalPopularCategory();
  const allLanguages = await getAllLanguages();

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex gap-3">
          <h2 className="hidden md:block h2-bold text-center">
            List of Popular Categories
          </h2>
        </div>
        <Link href="/admin/popular-lists-categories/create">
          <Button variant="default">Create Category</Button>
        </Link>
      </div>
      <div className="mt-7 md:mt-15">
        <Table>
          <TableHeader className="text-base md:text-xl">
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.data?.map((category) => {
              const language = allLanguages?.data?.find(
                (langauge) => langauge.id === category.languageId
              );

              return (
                <TableRow key={category.id}>
                  <TableCell>{category.popularCategory}</TableCell>
                  <TableCell>{language?.languageName}</TableCell>
                  <TableCell className="flex gap-5">
                    <Link
                      href={`/admin/popular-lists-categories/${category.id}`}
                    >
                      <Button>Edit</Button>
                    </Link>
                    <DeleteDialog
                      id={category.id}
                      action={deletePopularCategory}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Categories: {total.total}
      </div>
    </div>
  );
};

export default PartsOfSpeech;
