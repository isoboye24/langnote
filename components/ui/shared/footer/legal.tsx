import React from 'react';
import QuickLink from './quick-link';

const Legal = () => {
  return (
    <>
      <h2 className="text-gray-300 mb-6">Legal</h2>
      <p className="mb-1">
        <QuickLink linkText="Privacy Policy" url="/privacy-policy" />
      </p>
      <p className="mb-1">
        <QuickLink linkText="Terms of Services" url="/terms-of-service" />
      </p>
      <p className="mb-1">
        <QuickLink linkText="Data Protection" url="/data-protection" />
      </p>
    </>
  );
};

export default Legal;
