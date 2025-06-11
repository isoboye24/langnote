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
import { upsertPopularListWordSchema } from '@/lib/validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { popularListWordDefaultValues } from '@/lib/constants';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { PopularListWord } from '@prisma/client';
import { getAllLanguagesToSelect } from '@/lib/actions/admin/language.actions';
import { getAllPopularCategoriesToSelect } from '@/lib/actions/admin/popular-list-category.actions';
import { getAllPartsOfSpeechToSelect } from '@/lib/actions/admin/parts-of-speech.actions';
import { getAllWordCasesToSelect } from '@/lib/actions/admin/cases.actions';
import {
  checkIfPopularListsWordExists,
  upsertPopularListsWord,
} from '@/lib/actions/admin/popular-lists-words';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { getAllGendersToSelect } from '@/lib/actions/admin/gender.actions';

const PopularWordForm = ({
  type,
  popularWord,
  id,
}: {
  type: 'Create' | 'Update';
  popularWord?: PopularListWord;
  id?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof upsertPopularListWordSchema>>({
    resolver: zodResolver(upsertPopularListWordSchema),
    defaultValues: popularWord
      ? {
          word: popularWord.word,
          wordCaseId: popularWord.wordCaseId,
          languageId: popularWord.languageId,
          known: popularWord.known,
          favorite: popularWord.favorite,
          partOfSpeechId: popularWord.partOfSpeechId,
          synonym: popularWord?.synonym ?? '',
          antonym: popularWord?.antonym ?? '',
          meaning: popularWord?.meaning ?? '',
          popularCategoryId: popularWord.popularCategoryId,
          genderId: popularWord.genderId,
        }
      : popularListWordDefaultValues,
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

  const [categories, setCategories] = useState<
    { id: string; popularCategory: string; languageId: string }[]
  >([]);

  const [genders, setGenders] = useState<
    { id: string; genderName: string; languageId: string }[]
  >([]);

  // Reset form values when category prop changes
  useEffect(() => {
    if (popularWord && type === 'Update') {
      console.log('Form values:', form.getValues());
      form.reset({
        word: popularWord.word,
        wordCaseId: popularWord.wordCaseId,
        languageId: popularWord.languageId,
        known: popularWord.known,
        favorite: popularWord.favorite,
        partOfSpeechId: popularWord.partOfSpeechId,
        synonym: popularWord?.synonym ?? '',
        antonym: popularWord?.antonym ?? '',
        meaning: popularWord?.meaning ?? '',
        popularCategoryId: popularWord.popularCategoryId,
        genderId: popularWord.genderId,
      });
    }
  }, [popularWord, type, form]);

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
          setCategories(categoriesRes.data);
          setGenders(genderRes.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        setLanguages([]);
        setPartsOfSpeech([]);
        setWordCases([]);
        setCategories([]);
        setGenders([]);
        toast.error(`Failed to fetch languages or related data, ${error}`);
      }
    };

    fetchPopularWord();
  }, []);

  const onSubmit: SubmitHandler<
    z.infer<typeof upsertPopularListWordSchema>
  > = async (values) => {
    if (type === 'Create') {
      const exists = await checkIfPopularListsWordExists(
        values.word,
        values.languageId
      );
      if (exists) {
        toast.error('Word with this name and language already exists.');
        return;
      }
    }
    const payload = { ...values, id: type === 'Update' && id ? id : undefined };

    const res = await upsertPopularListsWord(payload);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push('/admin/popular-words');
    }
  };

  const selectedLanguageId = form.watch('languageId');

  // Filter other dropdowns when language option is chosen
  const filteredPartsOfSpeech = partsOfSpeech.filter(
    (pos) => pos.languageId === selectedLanguageId
  );
  const filteredWordCases = wordCases.filter(
    (pos) => pos.languageId === selectedLanguageId
  );
  const filteredCategories = categories.filter(
    (pos) => pos.languageId === selectedLanguageId
  );
  const filteredGenders = genders.filter(
    (pos) => pos.languageId === selectedLanguageId
  );

  // Toggle Gender and also its content depending on parts of speech option.
  const selectedPartOfSpeechId = form.watch('partOfSpeechId');

  const selectedLanguage = languages.find((l) => l.id === selectedLanguageId);
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

  return (
    <div className="">
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 mb-10">
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
                name="languageId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || ''}
                        onValueChange={(val) => {
                          field.onChange(val);
                          // Optionally reset partOfSpeechId when language changes
                          form.setValue('partOfSpeechId', '');
                        }}
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

            <div className="">
              <FormField
                control={form.control}
                name="popularCategoryId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || ''}
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {filteredCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.popularCategory}
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
            {toggleGenderAndItsContent && (
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
                                ((isEnglishNoun && !isNone) ||
                                  (isGermanNomen && !isKein));

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
            )}
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

export default PopularWordForm;
