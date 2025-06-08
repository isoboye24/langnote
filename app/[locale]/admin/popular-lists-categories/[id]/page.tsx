import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPopularCategoryById } from '@/lib/actions/admin/popular-list-category.actions';
import PopularListCategoryForm from '../../Popular-lists-category-form';

export const metadata: Metadata = {
  title: 'Update Popular Category',
};

const UpdatePopularCategory = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const category = await getPopularCategoryById(id);

  if (!category) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Category</h1>
      <PopularListCategoryForm
        type="Update"
        category={category.data}
        id={category.data?.id}
      />
    </div>
  );
};

export default UpdatePopularCategory;
