import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBookById } from '@/lib/actions/user/book.actions';
import BookForm from '../../../create-book-form';

export const metadata: Metadata = {
  title: 'Update Book',
};

const UpdateBook = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const book = await getBookById(id);

  if (!book) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Gender</h1>
      <BookForm type="Update" book={book.data} id={book.data?.id} />
    </div>
  );
};

export default UpdateBook;
