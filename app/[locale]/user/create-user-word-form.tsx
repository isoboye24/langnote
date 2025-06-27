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
import { Star } from 'lucide-react';
import { upsertUserWordSchema } from '@/lib/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userWordDefaultValues } from '@/lib/constants';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Book, Word } from '@prisma/client';
import { getAllLanguagesToSelect } from '@/lib/actions/admin/language.actions';
import { getAllPopularCategoriesToSelect } from '@/lib/actions/admin/popular-list-category.actions';
import { getAllPartsOfSpeechToSelect } from '@/lib/actions/admin/parts-of-speech.actions';
import { getAllWordCasesToSelect } from '@/lib/actions/admin/cases.actions';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { getAllGendersToSelect } from '@/lib/actions/admin/gender.actions';
import { useSession } from 'next-auth/react';
import { upsertUserWord } from '@/lib/actions/user/word.actions';

const UserWordForm = ({
  type,
  userWord,
  id,
  currentGroupId,
  currentBookId,
  currentBook,
}: {
  type: 'Create' | 'Update';
  userWord?: Word;
  currentBook?: Book;
  id?: string;
  currentGroupId: string;
  currentBookId: string;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const form = useForm<z.infer<typeof upsertUserWordSchema>>({
    resolver: zodResolver(upsertUserWordSchema),
    defaultValues: userWord
      ? {
          word: userWord.word,
          wordCaseId: userWord.wordCaseId,
          known: userWord.known,
          favorite: userWord.favorite,
          partOfSpeechId: userWord.partOfSpeechId,
          synonym: userWord?.synonym ?? '',
          antonym: userWord?.antonym ?? '',
          meaning: userWord?.meaning ?? '',
          genderId: userWord.genderId,
          bookId: currentBookId,
          wordGroupId: currentGroupId,
          userId: currentUserId,
        }
      : {
          ...userWordDefaultValues,
          bookId: currentBookId,
          wordGroupId: currentGroupId,
          userId: currentUserId,
        },
  });

  const [languages, setLanguages] = useState<
    { id: string; languageName: string }[]
  >([]);

  const [wordCases, setWordCases] = useState<
    { id: string; caseName: string; languageId: string }[]
  >([]);

  const [partsOfSpeech, setPartsOfSpeech] = useState<
    { id: string; name: string; languageId: string }[]
  >([]);

  const [genders, setGenders] = useState<
    { id: string; genderName: string; languageId: string }[]
  >([]);

  const [preserveState, setPreserveState] = useState(false);

  // Reset form values when category prop changes
  useEffect(() => {
    if (userWord && type === 'Update') {
      console.log('Form values:', form.getValues());
      form.reset({
        word: userWord.word,
        wordCaseId: userWord.wordCaseId,
        known: userWord.known,
        favorite: userWord.favorite,
        partOfSpeechId: userWord.partOfSpeechId,
        synonym: userWord?.synonym ?? '',
        antonym: userWord?.antonym ?? '',
        meaning: userWord?.meaning ?? '',
        genderId: userWord.genderId,
        bookId: currentBookId,
        wordGroupId: currentGroupId,
        userId: currentUserId,
      });
    }
  }, [userWord, currentBookId, currentGroupId, currentUserId, type, form]);

  useEffect(() => {
    const fetchPopularWord = async () => {
      try {
        const [
          langRes,
          partsOfSpeechRes,
          wordCasesRes,
          categoriesRes,
          genderRes,
        ] = await Promise.all([
          getAllLanguagesToSelect(),
          getAllPartsOfSpeechToSelect(),
          getAllWordCasesToSelect(),
          getAllPopularCategoriesToSelect(),
          getAllGendersToSelect(),
        ]);

        if (
          langRes.success &&
          partsOfSpeechRes.success &&
          wordCasesRes.success &&
          categoriesRes.success &&
          genderRes.success &&
          Array.isArray(langRes.data) &&
          Array.isArray(partsOfSpeechRes.data) &&
          Array.isArray(wordCasesRes.data) &&
          Array.isArray(categoriesRes.data) &&
          Array.isArray(genderRes.data)
        ) {
          setLanguages(langRes.data);
          setPartsOfSpeech(partsOfSpeechRes.data);
          setWordCases(wordCasesRes.data);
          setGenders(genderRes.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        setLanguages([]);
        setPartsOfSpeech([]);
        setWordCases([]);
        setGenders([]);
        toast.error(`Failed to fetch languages or related data, ${error}`);
      }
    };

    fetchPopularWord();
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof upsertUserWordSchema>> = async (
    values
  ) => {
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertUserWord(payload);

    if (!res?.success) {
      toast.error(res?.message);
    } else {
      if (res.success) {
        toast.success(res.message);

        if (type === 'Update') {
          router.push(`/user/books/${currentBookId}/${currentGroupId}`);
        } else {
          if (preserveState) {
            form.reset({
              ...form.getValues(),
              word: '',
              meaning: '',
              synonym: '',
              antonym: '',
            });
          } else {
            form.reset(userWordDefaultValues);
          }
        }
      }
    }
  };

  // Filter other dropdowns when language option is chosen
  const filteredPartsOfSpeech = partsOfSpeech.filter(
    (pos) => pos.languageId === currentBook?.languageId
  );
  const filteredWordCases = wordCases.filter(
    (pos) => pos.languageId === currentBook?.languageId
  );

  const filteredGenders = genders.filter(
    (pos) => pos.languageId === currentBook?.languageId
  );

  // Toggle Gender and also its content depending on parts of speech option.
  const selectedPartOfSpeechId = form.watch('partOfSpeechId');

  const selectedLanguage = languages.find(
    (l) => l.id === currentBook?.languageId
  );
  const selectedPartOfSpeech = partsOfSpeech.find(
    (p) => p.id === selectedPartOfSpeechId
  );

  const toggleGenderAndItsContent =
    (selectedLanguage?.languageName.toLowerCase() === 'english' &&
      selectedPartOfSpeech?.name.toLowerCase() === 'noun') ||
    (selectedLanguage?.languageName.toLowerCase() === 'german' &&
      selectedPartOfSpeech?.name.toLowerCase() === 'nomen') ||
    selectedLanguage?.languageName.toLowerCase() === 'russian';

  useEffect(() => {
    const englishNoun =
      selectedLanguage?.languageName.toLowerCase() === 'english' &&
      selectedPartOfSpeech?.name.toLowerCase() === 'noun';

    const germanNomen =
      selectedLanguage?.languageName.toLowerCase() === 'german' &&
      selectedPartOfSpeech?.name.toLowerCase() === 'nomen';

    if (!toggleGenderAndItsContent) {
      let defaultGenderName = '';
      if (englishNoun) defaultGenderName = 'none';
      if (germanNomen) defaultGenderName = 'kein';

      const defaultGender = filteredGenders.find(
        (g) => g.genderName.toLowerCase() === defaultGenderName
      );

      if (defaultGender) {
        form.setValue('genderId', defaultGender.id);
      }
    }
  }, [
    toggleGenderAndItsContent,
    filteredGenders,
    selectedLanguage,
    selectedPartOfSpeech,
    form,
  ]);

  const word = form.watch('word');

  useEffect(() => {
    const trimmedWord = word?.trim();
    const isGerman = selectedLanguage?.languageName.toLowerCase() === 'german';
    const isNoun = selectedPartOfSpeech?.name.toLowerCase() === 'nomen';

    if (trimmedWord && isGerman && isNoun) {
      const lowerWord = trimmedWord.toLowerCase();
      let targetGenderName = '';

      if (lowerWord.startsWith('der ')) {
        targetGenderName = 'maskulinum';
      } else if (lowerWord.startsWith('die ')) {
        targetGenderName = 'femininum';
      } else if (lowerWord.startsWith('das ')) {
        targetGenderName = 'neutrum';
      }

      if (targetGenderName) {
        const matchingGender = filteredGenders.find(
          (g) => g.genderName.toLowerCase() === targetGenderName
        );
        if (matchingGender) {
          form.setValue('genderId', matchingGender.id);
        }
      }
    }
  }, [
    word,
    selectedLanguage?.languageName,
    selectedPartOfSpeech?.name,
    filteredGenders,
    form,
  ]);

  return (
    <div className="">
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex justify-end">
            <Button
              type="button"
              className={preserveState ? 'bg-green-600' : 'bg-red-700'}
              onClick={() => setPreserveState((prev) => !prev)}
            >
              {preserveState
                ? 'Preserve Form Values: ON'
                : 'Preserve Form Values: OFF'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 mb-10">
            <div className="">
              <FormField
                control={form.control}
                name="partOfSpeechId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Part of Speech</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || ''}
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Select Part of Speech" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {filteredPartsOfSpeech.map((partOfSpeech) => (
                            <SelectItem
                              key={partOfSpeech.id}
                              value={partOfSpeech.id.toString()}
                            >
                              {partOfSpeech.name}
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
                name="word"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Popular Word</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Word" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="meaning"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Meaning</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Word meaning"
                        {...field}
                        className="h-40"
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
                name="synonym"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Synonyms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Synonym"
                        {...field}
                        className="h-40"
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
                name="antonym"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Antonyms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Antonym"
                        {...field}
                        className="h-40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="known"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        className="w-5 h-5"
                        checked={!!field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <FormLabel className="mb-0">Word Known?</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="favorite"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        className="w-5 h-5 hidden"
                        checked={!!field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <div
                      className="cursor-pointer flex"
                      onClick={() => field.onChange(!field.value)}
                    >
                      <Star
                        className={`w-6 h-6 mr-2  transition-colors ${
                          field.value
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                      Favorite
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="wordCaseId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Word Case</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || ''}
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Select Case" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {filteredWordCases.map((wordCase) => (
                            <SelectItem
                              key={wordCase.id}
                              value={wordCase.id.toString()}
                            >
                              {wordCase.caseName}
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

            {/* {toggleGenderAndItsContent && ( */}
            <div className="">
              <FormField
                control={form.control}
                name="genderId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || ''}
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {filteredGenders.map((gender) => {
                            const isNone =
                              gender.genderName.toLowerCase() === 'none';
                            const isKein =
                              gender.genderName.toLowerCase() === 'kein';

                            const isEnglishNoun =
                              selectedLanguage?.languageName.toLowerCase() ===
                                'english' &&
                              selectedPartOfSpeech?.name.toLowerCase() ===
                                'noun';

                            const isGermanNomen =
                              selectedLanguage?.languageName.toLowerCase() ===
                                'german' &&
                              selectedPartOfSpeech?.name.toLowerCase() ===
                                'nomen';

                            const isRussian =
                              selectedLanguage?.languageName.toLowerCase() ===
                              'russian';

                            const shouldDisable =
                              !isRussian &&
                              ((isEnglishNoun && isNone) ||
                                (isGermanNomen && isKein));

                            return (
                              <SelectItem
                                key={gender.id}
                                value={gender.id.toString()}
                                disabled={shouldDisable}
                              >
                                {gender.genderName}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* )} */}
          </div>
          {/* BookId, groupId and userId */}
          <div className="grid grid-col-3 gap-0.1">
            <div className="">
              <FormField
                control={form.control}
                name="bookId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input type="hidden" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="wordGroupId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input type="hidden" {...field} readOnly />
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
                    <FormControl>
                      <Input type="hidden" {...field} readOnly />
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
              {form.formState.isSubmitting ? 'Submitting...' : `${type} Word`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserWordForm;
