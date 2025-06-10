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
  deletePopularCategory,
  getAllPopularCategories,
} from '@/lib/actions/admin/popular-list-category.actions';
import { getAllLanguages } from '@/lib/actions/admin/language.actions';
import { Language, PopularListCategory } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';

const PopularListCategoryPageContent = () => {
  const [categories, setCategories] = useState<PopularListCategory[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchPopularCategoryLists = async () => {
      const langRes = await getAllLanguages();
      const response = await getAllPopularCategories(page, pageSize);

      if (response.success && langRes.success) {
        setCategories(response?.data as PopularListCategory[]);
        setLanguages(langRes?.data as Language[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchPopularCategoryLists();
  }, [page]);

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
            {categories?.map((category) => {
              const language = languages?.find(
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Categories: {totalCount}
      </div>
    </div>
  );
};

export default PopularListCategoryPageContent;
