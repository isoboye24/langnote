import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
// import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
// import SignUpForm from './signup-form';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUp = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { callbackUrl } = searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              priority={true}
              src="/images/logo.png"
              width={80}
              height={80}
              alt={`${APP_NAME} logo`}
              className="hidden md:block"
            />
            <Image
              priority={true}
              src="/images/logo.png"
              width={60}
              height={60}
              alt={`${APP_NAME} logo`}
              className="block md:hidden"
            />
          </Link>
          <CardTitle className="text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Enter your information below to register
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{/* <SignUpForm /> */}</CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
