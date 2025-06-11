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
import { casesDefaultValues } from '@/lib/constants';
import {
  checkIfGenderExists,
  upsertGender,
} from '../../../lib/actions/admin/gender.actions';
import { upsertGendersSchema } from '../../../lib/validator';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Gender } from '@prisma/client';
import { getAllLanguages } from '@/lib/actions/admin/language.actions';

const GenderForm = ({
  type,
  gender,
  id,
}: {
  type: 'Create' | 'Update';
  gender?: Gender;
  id?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof upsertGendersSchema>>({
    resolver: zodResolver(upsertGendersSchema),
    defaultValues: gender
      ? {
          genderName: gender.genderName,
          languageId: gender.languageId,
        }
      : casesDefaultValues,
  });

  const [languages, setLanguages] = useState<
    { id: string; languageName: string }[]
  >([]);

  // Reset form values when parts of speech prop changes
  useEffect(() => {
    if (gender && type === 'Update') {
      form.reset({
        genderName: gender.genderName,
        languageId: gender.languageId,
      });
    }
  }, [gender, type, form]);

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

  const onSubmit: SubmitHandler<z.infer<typeof upsertGendersSchema>> = async (
    values
  ) => {
    if (type === 'Create') {
      const exists = await checkIfGenderExists(
        values.genderName,
        values.languageId
      );
      if (exists) {
        toast.error('Gender with this name and language already exists.');
        return;
      }
    }
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertGender(payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push('/admin/genders');
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
                  name="genderName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Part of Speech</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Part of Speech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="languageId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Language of Part of Speech</FormLabel>
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
                  : `${type} Part of speech`}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GenderForm;
