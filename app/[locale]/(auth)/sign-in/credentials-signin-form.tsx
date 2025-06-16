'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithCredentials } from '@/lib/actions/admin/user.actions';
import { signInDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/auth';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    message: '',
    success: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Redirect after successful sign in
  useEffect(() => {
    if (data.success) {
      router.push(callbackUrl);
    }
  }, [data.success, router, callbackUrl]);

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        onClick={() => signIn()}
        disabled={pending}
        className="w-full"
        variant="default"
      >
        {pending ? 'Signing In...' : 'Sign In with credentials'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
            autoComplete="email"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signInDefaultValues.password}
            autoComplete="current-password"
            className="mt-1"
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link target="_self" className="link" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
