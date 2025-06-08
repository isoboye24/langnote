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
import { upsertLanguageSchema } from '@/lib/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { languageDefaultValues } from '@/lib/constants';
import { Language } from '@prisma/client';
import {
  upsertLanguage,
  checkIfLanguageExists,
} from '@/lib/actions/admin/language.actions';

const LanguageForm = ({
  type,
  language,
  id,
}: {
  type: 'Create' | 'Update';
  language?: Language;
  id?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof upsertLanguageSchema>>({
    resolver: zodResolver(upsertLanguageSchema),
    defaultValues: language
      ? { languageName: language.languageName }
      : languageDefaultValues,
  });

  // Reset form values when language prop changes
  useEffect(() => {
    if (language && type === 'Update') {
      console.log('Form values:', form.getValues());
      form.reset({ languageName: language.languageName });
    }
  }, [language, type, form]);

  const onSubmit: SubmitHandler<z.infer<typeof upsertLanguageSchema>> = async (
    values
  ) => {
    if (type === 'Create') {
      const exists = await checkIfLanguageExists(values.languageName);
      if (exists) {
        toast.error('Language with this name already exists.');
        return;
      }
    }
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertLanguage(payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push('/admin/languages');
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
            <div className="mb-6">
              <FormField
                control={form.control}
                name="languageName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Language" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  : `${type} Language`}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LanguageForm;
