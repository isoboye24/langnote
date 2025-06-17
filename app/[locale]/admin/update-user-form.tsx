'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { signUpFormSchema } from '@/lib/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { roles, signUpDefaultValues } from '@/lib/constants';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { User } from '@prisma/client';
import { updateUser } from '@/lib/actions/admin/user.actions';
import { Card, CardContent } from '@/components/ui/card';

const UserUpdateForm = ({
  type,
  user,
  id,
}: {
  type: 'Update';
  user?: User;
  id?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: user
      ? {
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          confirmPassword: user.password,
          role: user.role,
        }
      : signUpDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof signUpFormSchema>> = async (
    values
  ) => {
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    if (payload.id === '' || null || undefined) {
      toast.error('Please select a user.');
    }
    const res = await updateUser(payload.id!, payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push('/admin/users');
    }
  };

  return (
    <div className="mb-25 flex justify-center items-center">
      <Card className="w-full">
        <CardContent>
          <Form {...form}>
            <form
              method="post"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div>
                <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 xl:mb-10">
                  <div>
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Username"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter Email"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter Password"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter First Name"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Last Name"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Role</FormLabel>

                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <FormControl>
                                <SelectValue placeholder="Select a role" />
                              </FormControl>
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role.charAt(0).toUpperCase() + role.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter confirm password"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button w-[50vw] md:w-[20vw] lg:w-[20vw] 2xl:w-[10vw] bg-teal-500 hover:bg-teal-600"
                  >
                    {form.formState.isSubmitting ? 'Submitting...' : `Submit`}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserUpdateForm;
