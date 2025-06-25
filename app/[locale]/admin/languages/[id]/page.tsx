import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LanguageForm from '../../language-form';
import { getLanguageById } from '@/lib/actions/admin/language.actions';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Update Language',
};

const UpdateLanguage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;
  const language = await getLanguageById(id);

  if (!language) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Language</h1>
      <LanguageForm
        type="Update"
        language={language.data}
        id={language.data?.id}
      />
    </div>
  );
};

export default UpdateLanguage;
