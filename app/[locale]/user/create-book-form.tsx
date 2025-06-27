'use client';

import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { bookDefaultValues } from '@/lib/constants';
import { upsertBookSchema } from '../../../lib/validator';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Book } from '@prisma/client';
import { upsertBook } from '@/lib/actions/user/book.actions';
import ColorPicker from '@/components/ui/shared/color-picker';
import { useSession } from 'next-auth/react';
import { getAllLanguages } from '@/lib/actions/admin/language.actions';

const BookForm = ({
  type,
  book,
  id,
  userId,
}: {
  type: 'Create' | 'Update';
  book?: Book;
  id?: string;
  userId?: string;
}) => {
  const router = useRouter();

  const [languages, setLanguages] = useState<
    { id: string; languageName: string }[]
  >([]);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof upsertBookSchema>>({
    resolver: zodResolver(upsertBookSchema),
    defaultValues: book
      ? {
          title: book.title,
          userId: userId,
          languageId: book.languageId,
          color1: book.color1,
          color2: book.color2,
        }
      : bookDefaultValues,
  });

  // Reset form values when book prop changes
  useEffect(() => {
    if (book && type === 'Update') {
      form.reset({
        title: book.title,
        userId: book.userId,
        languageId: book.languageId,
        color1: book.color1,
        color2: book.color2,
      });
    }
  }, [book, type, form]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await getAllLanguages();
      if (res.success && Array.isArray(res.data)) {
        setLanguages(res.data);
      } else {
        setLanguages([]);
        toast.error('Failed to fetch languages.');
      }
    };

    fetchLanguages();
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof upsertBookSchema>> = async (
    values
  ) => {
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertBook(payload);

    if (!res?.success) {
      toast.error(res?.message);
    } else {
      toast.success(res.message);
      router.push('/user/books');
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      form.setValue('userId', session.user.id);
    }
  }, [session, form]);

  return (
    <div>
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div className="">
                <FormField
                  control={form.control}
                  name="languageId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value?.toString() || ''}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            {languages.map((language) => (
                              <SelectItem
                                key={language.id}
                                value={language.id.toString()}
                              >
                                {language.languageName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="color1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Color</FormLabel>
                      <FormControl>
                        <div>
                          <ColorPicker
                            onChange={(color) => field.onChange(color)}
                          />
                          <p className="mt-2 text-sm">Current: {field.value}</p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="color2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Second Color</FormLabel>
                      <FormControl>
                        <div>
                          <ColorPicker
                            onChange={(color) => field.onChange(color)}
                          />
                          <p className="mt-2 text-sm">Current: {field.value}</p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="col-start-1 col-end-3 lg:col-start-2 lg:col-end-3">
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="button col-span-2 w-full"
              >
                {form.formState.isSubmitting ? 'Submitting...' : `${type} Book`}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
