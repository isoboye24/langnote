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
import { PartOfSpeech, Word, WordCase } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import { getAllPartsOfSpeech } from '@/lib/actions/admin/parts-of-speech.actions';
import { getAllWordCases } from '@/lib/actions/admin/cases.actions';
import SearchInput from '@/components/ui/search-input';
import {
  deleteUserWord,
  getAllUserWords,
} from '@/lib/actions/user/word.actions';
import { Eye, Pen } from 'lucide-react';

const UserWordListContent = ({
  bookId,
  groupId,
}: {
  bookId: string;
  groupId: string;
}) => {
  const [words, setWords] = useState<Word[]>([]);
  const [wordCases, setWordCases] = useState<WordCase[]>([]);
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  useEffect(() => {
    const fetchPopularWords = async () => {
      const partsOfSpeechRes = await getAllPartsOfSpeech();
      const wordCasesRes = await getAllWordCases();
      const response = await getAllUserWords(page, pageSize, bookId, groupId);

      if (response.success) {
        const allWords = response?.data as Word[];
        setWords(allWords);
        setFilteredWords(allWords);
        setWordCases(wordCasesRes?.data as WordCase[]);
        setPartsOfSpeech(partsOfSpeechRes?.data as PartOfSpeech[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchPopularWords();
  }, [page, bookId, groupId, searchQuery]);

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
      <div className="">
        <h2 className="hidden md:block h2-bold text-center">List of Words</h2>
      </div>

      <div className="mt-10 justify-items-center">
        <SearchInput onSearch={onSearch} />
      </div>
      <div className="mt-7 md:mt-10">
        <Table>
          <TableHeader className="text-base md:text-xl">
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>P. of Speech</TableHead>
              <TableHead>Case</TableHead>
              <TableHead className="w-[200px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWords?.map((word) => {
              const partOfSpeech = partsOfSpeech?.find(
                (p) => p.id === word.partOfSpeechId
              );
              const wordCase = wordCases?.find((w) => w.id === word.wordCaseId);

              return (
                <TableRow key={word.id}>
                  <TableCell>{word.word}</TableCell>

                  <TableCell>{partOfSpeech?.name}</TableCell>
                  <TableCell>{wordCase?.caseName}</TableCell>
                  <TableCell className="flex gap-5">
                    <Link
                      href={`/user/books/${bookId}/${groupId}/view/${word.id}`}
                    >
                      <Button>
                        <Eye />
                      </Button>
                    </Link>
                    <Link href={`/user/books/${bookId}/${groupId}/${word.id}`}>
                      <Button>
                        <Pen />
                      </Button>
                    </Link>
                    <DeleteDialog id={word.id} action={deleteUserWord} />
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

export default UserWordListContent;
