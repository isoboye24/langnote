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
import { upsertContactSchema } from '@/lib/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { contactDefaultValues } from '@/lib/constants';

import { notify } from '@/utility/notify';
import { Contact } from '@prisma/client';
import { upsertContactMessage } from '@/lib/actions/admin/message.actions';

const ContactForm = ({
  type,
  contactMessage,
  id,
}: {
  type: 'Send' | 'Update';
  contactMessage?: Contact;
  id?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof upsertContactSchema>>({
    resolver: zodResolver(upsertContactSchema),
    defaultValues: contactMessage
      ? {
          senderName: contactMessage.senderName,
          senderEmail: contactMessage.senderEmail,
          subject: contactMessage.subject,
          messageText: contactMessage.messageText,
        }
      : contactDefaultValues,
  });

  // Reset form values when contact prop changes
  useEffect(() => {
    if (contactMessage && type === 'Update') {
      form.reset({
        senderName: contactMessage.senderName,
        senderEmail: contactMessage.senderEmail,
        subject: contactMessage.subject,
        messageText: contactMessage.messageText,
      });
    }
  }, [contactMessage, type, form]);

  const onSubmit: SubmitHandler<z.infer<typeof upsertContactSchema>> = async (
    values
  ) => {
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertContactMessage(payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      if (type === 'Send') {
        form.reset();
        notify('contact');
        router.push('/contact');
      } else {
        router.push('/admin/messages');
      }
    }
  };

  return (
    <div className="mb-25 mt-5 md:mt-20">
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex flex-col gap-3 px-0 lg:px-20 xxl:px-0">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 xl:mb-10">
                <div className="">
                  <FormField
                    control={form.control}
                    name="senderName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-2xl"
                            placeholder="Enter Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="senderEmail"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-2xl"
                            placeholder="Enter Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-2xl"
                          placeholder="Enter Subject"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="messageText"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="rounded-md h-40"
                        placeholder="Enter Message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center items-center mt-5">
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="button w-[50vw] md:w-[20vw] lg:w-[20vw] 2xl:w-[10vw] bg-teal-500 hover:bg-teal-600"
              >
                {form.formState.isSubmitting
                  ? 'Submitting...'
                  : `${type} Message`}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
