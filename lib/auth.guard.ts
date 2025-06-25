import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getAllUsers } from './actions/admin/user.actions';

export async function requireAdmin() {
  const session = await auth();

  const user = await getAllUsers();

  if (user.success) {
    const currentUser = user.data?.find(
      (userNow) => userNow.email === session?.user?.email
    );

    if (currentUser?.role !== 'admin') {
      redirect('/unauthorized');
    }
  }
  return session;
}
