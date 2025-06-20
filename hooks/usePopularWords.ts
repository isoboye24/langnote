import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePopularWords = (
  categoryId: string,
  page = 1,
  pageSize = 10
) => {
  const { data, error, isLoading } = useSWR(
    categoryId
      ? `/api/popular-words?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`
      : null,
    fetcher
  );

  return {
    words: data?.data || [],
    total: data?.total || 0,
    loading: isLoading,
    error,
  };
};
