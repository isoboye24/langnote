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
import { upsertCasesSchema } from '@/lib/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { casesDefaultValues } from '@/lib/constants';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { WordCase } from '@prisma/client';
import { getAllLanguagesToSelect } from '@/lib/actions/admin/language.actions';

import { upsertWordCase } from '@/lib/actions/admin/cases.actions';

const WordCaseForm = ({
  type,
  wordCase,
  id,
}: {
  type: 'Create' | 'Update';
  wordCase?: WordCase;
  id?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof upsertCasesSchema>>({
    resolver: zodResolver(upsertCasesSchema),
    defaultValues: wordCase
      ? {
          caseName: wordCase.caseName,
          languageId: wordCase.languageId,
        }
      : casesDefaultValues,
  });

  const [languages, setLanguages] = useState<
    { id: string; languageName: string }[]
  >([]);

  // Reset form values when parts of speech prop changes
  useEffect(() => {
    if (wordCase && type === 'Update') {
      form.reset({
        caseName: wordCase.caseName,
        languageId: wordCase.languageId,
      });
    }
  }, [wordCase, type, form]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await getAllLanguagesToSelect();
      if (res.success && Array.isArray(res.data)) {
        setLanguages(res.data);
      } else {
        setLanguages([]);
        toast.error('Failed to fetch languages.');
      }
    };

    fetchLanguages();
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof upsertCasesSchema>> = async (
    values
  ) => {
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertWordCase(payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push('/admin/cases');
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
                  name="caseName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Case Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Case Name" {...field} />
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
                      <FormLabel>Language of Case</FormLabel>
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
                {form.formState.isSubmitting ? 'Submitting...' : `${type} Case`}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WordCaseForm;
