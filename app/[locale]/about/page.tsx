import React from 'react';
import AboutTopSection from './about-top-section';
import InfoSection from '../contact/info-section';
import AboutTextSection from './about-text-section';

const About = () => {
  return (
    <div className="">
      <div className="bg-white dark:bg-slate-950 dark:md:bg-blue-950 md:bg-blue-950">
        <AboutTopSection />
      </div>
      <div className="mb-20 mt-10 md:mt-20 bg-gray-100 md:bg-white dark:bg-slate-950 ">
        <AboutTextSection />
      </div>
      <div className="mt-40 lg:mt-60">
        <InfoSection />
      </div>
    </div>
  );
};

export default About;
