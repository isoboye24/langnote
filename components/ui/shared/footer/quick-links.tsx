import React from 'react';
import QuickLink from './quick-link';

const QuickLinks = () => {
  return (
    <>
      <h2 className="text-gray-300 mb-6">Quick Links</h2>
      <div className="">
        <p className="mb-1">
          <QuickLink linkText="About LN" url="/about" />
        </p>
        <p className="mb-1">
          <QuickLink linkText="Contact Us" url="/contact" />
        </p>
        <p className="mb-1">
          <QuickLink linkText="FAQ" url="/faq" />
        </p>
        <p className="mb-1">
          <QuickLink linkText="Get Started" url="/documentation" />
        </p>
      </div>
    </>
  );
};

export default QuickLinks;
