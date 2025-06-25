import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPartsOfSpeechById } from '@/lib/actions/admin/parts-of-speech.actions';
import PartsOfSpeechForm from '../../parts-of-speech-form';
import { requireAdmin } from '@/lib/auth.guard';

export const metadata: Metadata = {
  title: 'Update Parts of Speech',
};

const UpdatePartsOfSpeech = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;
  const partOfSpeech = await getPartsOfSpeechById(id);

  if (!partOfSpeech) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Part of Speech</h1>
      <PartsOfSpeechForm
        type="Update"
        partsOfSpeech={partOfSpeech.data}
        id={partOfSpeech.data?.id}
      />
    </div>
  );
};

export default UpdatePartsOfSpeech;
