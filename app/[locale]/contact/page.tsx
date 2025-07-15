import React from 'react';
import ContactForm from './contact-form';
import ContactTopSection from './contact-top-section';
import InfoSection from './info-section';

const Contact = () => {
  return (
    <div>
      <div className="bg-white dark:bg-slate-950 dark:md:bg-blue-950 md:bg-blue-950">
        <ContactTopSection />
      </div>
      <div className="wrapper mb-20">
        <ContactForm type="Send" />
      </div>
      <div className="">
        <InfoSection />
      </div>
    </div>
  );
};

export default Contact;
