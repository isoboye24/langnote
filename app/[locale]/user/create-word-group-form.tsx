'use client';

import React, { useEffect } from 'react';
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
import { wordGroupDefaultValues } from '@/lib/constants';
import { upsertWordGroupSchema } from '../../../lib/validator';

import { WordGroup } from '@prisma/client';
import { checkIfBookExists } from '@/lib/actions/user/book.actions';
import ColorPicker from '@/components/ui/shared/color-picker';
import { upsertWordGroup } from '@/lib/actions/user/word-group.actions';

const WordGroupForm = ({
  type,
  group,
  id,
  bookId,
}: {
  type: 'Create' | 'Update';
  group?: WordGroup;
  id?: string;
  bookId?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof upsertWordGroupSchema>>({
    resolver: zodResolver(upsertWordGroupSchema),
    defaultValues: group
      ? {
          groupName: group?.groupName ?? '',
          color: group?.color ?? '',
          bookId: group.bookId ?? bookId,
        }
      : {
          ...wordGroupDefaultValues,
          bookId: bookId, // <-- explicitly set bookId here
        },
  });

  // Reset form values when group prop changes
  useEffect(() => {
    if (group && type === 'Update') {
      form.reset({
        groupName: group.groupName,
        color: group.color,
        bookId: group.bookId,
      });
    }
  }, [group, type, form]);

  const onSubmit: SubmitHandler<z.infer<typeof upsertWordGroupSchema>> = async (
    values
  ) => {
    if (type === 'Create') {
      const exists = await checkIfBookExists(
        values.groupName,
        values.color,
        values.bookId
      );
      if (exists) {
        toast.error('Group with this name exists.');
        return;
      }
    }
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertWordGroup(payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push(`/user/books/${bookId}`);
    }
  };

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
                  name="groupName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex">
                        <FormLabel>Group Name</FormLabel>
                        <span className="ml-1 text-orange-700 pt-0.5">*</span>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter Group Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="bookId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Book ID</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex">
                        <FormLabel>Choose Color</FormLabel>
                        <span className="ml-1 text-orange-700 pt-0.5">*</span>
                      </div>
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
            </div>

            <div className="col-start-1 col-end-3 lg:col-start-2 lg:col-end-3">
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="button col-span-2 w-full"
              >
                {form.formState.isSubmitting
                  ? 'Submitting...'
                  : `${type} Group`}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WordGroupForm;
