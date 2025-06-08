import { Metadata } from 'next';
import React from 'react';
import PopularListCategoryForm from '../../Popular-lists-category-form';

export const metadata: Metadata = {
  title: 'Create Popular List Category',
};

const CreatePopularCategory = () => {
  return (
    <div className="">
      <h2 className="h2-bold text-center">Create Popular List Category</h2>
      <div className="my-8 justify-items-center">
        <div className="w-full lg:w-[50vw]">
          <PopularListCategoryForm type="Create" />
        </div>
      </div>
    </div>
  );
};

export default CreatePopularCategory;
