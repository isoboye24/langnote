import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGenderById } from '@/lib/actions/admin/gender.actions';
import GenderForm from '../../gender-form';

export const metadata: Metadata = {
  title: 'Update Gender',
};

const UpdateWordCase = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const gender = await getGenderById(id);

  if (!gender) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Gender</h1>
      <GenderForm type="Update" gender={gender.data} id={gender.data?.id} />
    </div>
  );
};

export default UpdateWordCase;
