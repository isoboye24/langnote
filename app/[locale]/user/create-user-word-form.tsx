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
import { getAllPopularCategories } from '@/lib/actions/admin/popular-list-category.actions';
import {
  PartOfSpeech,
  PopularListCategory,
  PopularListWord,
  WordCase,
} from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import { getAllPartsOfSpeech } from '@/lib/actions/admin/parts-of-speech.actions';
import { getAllWordCases } from '@/lib/actions/admin/cases.actions';
import {
  deletePopularListWord,
  getAllPopularListWords,
} from '@/lib/actions/admin/popular-lists-words';
import SearchInput from '@/components/ui/search-input';

const UserWordPageContent = () => {
  const [words, setWords] = useState<PopularListWord[]>([]);
  const [wordCases, setWordCases] = useState<WordCase[]>([]);
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [Categories, setPartCategories] = useState<PopularListCategory[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWords, setFilteredWords] = useState<PopularListWord[]>([]);

  useEffect(() => {
    const fetchPopularWords = async () => {
      const categoryRes = await getAllPopularCategories();
      const partsOfSpeechRes = await getAllPartsOfSpeech();
      const wordCasesRes = await getAllWordCases();
      const response = await getAllPopularListWords(page, pageSize);

      if (response.success) {
        const allWords = response?.data as PopularListWord[];
        setWords(allWords);
        setFilteredWords(allWords);
        setWordCases(wordCasesRes?.data as WordCase[]);
        setPartsOfSpeech(partsOfSpeechRes?.data as PartOfSpeech[]);
        setPartCategories(categoryRes?.data as PopularListCategory[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchPopularWords();
  }, [page, searchQuery]);

  const onSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredWords(words); // Reset if empty
      return;
    }

    const lower = query.toLowerCase();
    const results = words.filter((word) =>
      word.word.toLowerCase().includes(lower)
    );
    setFilteredWords(results);
  };

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex gap-3">
          <h2 className="hidden md:block h2-bold text-center">
            List of Popular Words
          </h2>
        </div>
        <Link href="/admin/popular-words/create">
          <Button variant="default">Create Popular Word</Button>
        </Link>
      </div>
      <div className="mt-10 justify-items-center">
        <SearchInput onSearch={onSearch} />
      </div>
      <div className="mt-7 md:mt-10">
        <Table>
          <TableHeader className="text-base md:text-xl">
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>P. of Speech</TableHead>
              <TableHead>Case</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWords?.map((word) => {
              const category = Categories?.find(
                (c) => c.id === word.popularCategoryId
              );
              const partOfSpeech = partsOfSpeech?.find(
                (p) => p.id === word.partOfSpeechId
              );
              const wordCase = wordCases?.find((w) => w.id === word.wordCaseId);

              return (
                <TableRow key={word.id}>
                  <TableCell>{word.word}</TableCell>
                  <TableCell>{category?.popularCategory}</TableCell>
                  <TableCell>{partOfSpeech?.name}</TableCell>
                  <TableCell>{wordCase?.caseName}</TableCell>
                  <TableCell className="flex gap-5">
                    <Link href={`/admin/popular-words/${word.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <DeleteDialog id={word.id} action={deletePopularListWord} />
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

export default UserWordPageContent;
