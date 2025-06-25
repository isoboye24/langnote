import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPopularListWordById } from '@/lib/actions/admin/popular-lists-words';
import PopularWordForm from '../../popular-words-form';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Update Popular Word',
};

const UpdatePopularWord = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;
  const word = await getPopularListWordById(id);

  if (!word) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Popular Word</h1>
      <PopularWordForm
        type="Update"
        popularWord={word.data}
        id={word.data?.id}
      />
    </div>
  );
};

export default UpdatePopularWord;
