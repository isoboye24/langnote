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
import { upsertPopularListCategorySchema } from '@/lib/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { popularCategoryDefaultValues } from '@/lib/constants';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/lib/uploadthing';
import { PopularListCategory } from '@prisma/client';
import { getAllLanguages } from '@/lib/actions/admin/language.actions';
import { upsertPopularCategory } from '@/lib/actions/admin/popular-list-category.actions';

const PopularListsCategoryForm = ({
  type,
  category,
  id,
}: {
  type: 'Create' | 'Update';
  category?: PopularListCategory;
  id?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof upsertPopularListCategorySchema>>({
    resolver: zodResolver(upsertPopularListCategorySchema),
    defaultValues: category
      ? {
          popularCategory: category.popularCategory,
          lightImageIcon: category.lightImageIcon,
          darkImageIcon: category.darkImageIcon,
          languageId: category.languageId,
        }
      : popularCategoryDefaultValues,
  });

  const [languages, setLanguages] = useState<
    { id: string; languageName: string }[]
  >([]);

  // Reset form values when category prop changes
  useEffect(() => {
    if (category && type === 'Update') {
      console.log('Form values:', form.getValues());
      form.reset({
        popularCategory: category.popularCategory,
        lightImageIcon: category.lightImageIcon,
        darkImageIcon: category.darkImageIcon,
        languageId: category.languageId,
      });
    }
  }, [category, type, form]);

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

  const onSubmit: SubmitHandler<
    z.infer<typeof upsertPopularListCategorySchema>
  > = async (values) => {
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertPopularCategory(payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push('/admin/popular-lists-categories');
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-5 mb-6">
            <div className="">
              <FormField
                control={form.control}
                name="popularCategory"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Category Name" {...field} />
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
                    <FormLabel>Category language</FormLabel>
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
              <div className="upload-field flex flex-col gap-5 md:flex-row md:items-start">
                <FormField
                  control={form.control}
                  name="lightImageIcon"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Light Mode Image Icon</FormLabel>
                      <Card>
                        <CardContent className="space-y-2 mt-2 min-h-[120px]">
                          <div className="flex flex-wrap gap-2">
                            {field.value && (
                              <Image
                                key={field.value}
                                src={field.value}
                                alt="uploaded image"
                                className="w-20 h-20 object-cover object-center rounded-sm"
                                width={100}
                                height={100}
                              />
                            )}

                            <FormControl>
                              <UploadButton<OurFileRouter, 'imageUploader'>
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  const uploadedUrl = res?.[0]?.ufsUrl;
                                  if (uploadedUrl) {
                                    field.onChange(uploadedUrl);
                                  }
                                }}
                                onUploadError={(error: Error) => {
                                  console.error('Upload failed:', error);
                                }}
                              />
                            </FormControl>
                          </div>
                        </CardContent>
                      </Card>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="">
              <div className="upload-field flex flex-col gap-5 md:flex-row">
                {/* Light Mode Image Icon */}
                <FormField
                  control={form.control}
                  name="darkImageIcon"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Dark Mode Image Icon</FormLabel>
                      <Card>
                        <CardContent className="space-y-2 mt-2 min-h-[120px]">
                          <div className="flex flex-wrap gap-2">
                            {field.value && (
                              <Image
                                key={field.value}
                                src={field.value}
                                alt="uploaded image"
                                className="w-20 h-20 object-cover object-center rounded-sm"
                                width={100}
                                height={100}
                              />
                            )}

                            <FormControl>
                              <UploadButton<OurFileRouter, 'imageUploader'>
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  const uploadedUrl = res?.[0]?.ufsUrl;
                                  if (uploadedUrl) {
                                    field.onChange(uploadedUrl);
                                  }
                                }}
                                onUploadError={(error: Error) => {
                                  console.error('Upload failed:', error);
                                }}
                              />
                            </FormControl>
                          </div>
                        </CardContent>
                      </Card>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                : `${type} Category`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PopularListsCategoryForm;
