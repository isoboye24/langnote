'use client';

import React, { useEffect, useState } from 'react';
import { WordGroup } from '@prisma/client';
import Pagination from '@/components/ui/shared/pagination';
import { getAllWordGroups } from '@/lib/actions/user/word-group.actions';
import SingleWordGroup from '@/components/ui/shared/single-word-group';
import {} from '@/lib/actions/user/book.actions';

const GroupList = ({ bookId }: { bookId: string }) => {
  const [groups, setGroups] = useState<WordGroup[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchCases = async () => {
      const response = await getAllWordGroups(page, pageSize, bookId);

      if (response.success) {
        setGroups(response?.data as WordGroup[]);
        setTotalCount(Number(response.total));
        setTotalPages(Math.ceil(Number(response.total) / pageSize));
      }
    };

    fetchCases();
  }, [bookId, page]);
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 mb-30">
        {groups.map((group) => {
          return (
            <div key={group.id}>
              <SingleWordGroup
                groupName={group.groupName}
                color={group.color}
              />
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <div className="mt-10 text-end pr-4 md:pr-8 text-green-500">
        Total Books: {totalCount}
      </div>
    </div>
  );
};

export default GroupList;
