import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWordCaseById } from '@/lib/actions/admin/cases.actions';
import WordCaseForm from '../../word-case-form';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Update Word Case',
};

const UpdateWordCase = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;
  const wordCase = await getWordCaseById(id);

  if (!wordCase) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Word Case</h1>
      <WordCaseForm
        type="Update"
        wordCase={wordCase.data}
        id={wordCase.data?.id}
      />
    </div>
  );
};

export default UpdateWordCase;
