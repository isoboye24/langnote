'use client';

import InfoCard from './info-card';

export default function InfoSection() {
  return (
    <section className="bg-teal-500 py-16 relative">
      <div className="max-w-6xl mx-auto -mt-40 bg-gray-100 dark:bg-slate-900 shadow-lg rounded-md px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div className="">
          <InfoCard
            url="http://www.w3.org/2000/svg"
            path="M13 10V3L4 14h7v7l9-11h-7z"
            title="About LangNote"
            subtitle1="Online Language Notebook"
            subtitle2="Workout your lingual capacity"
          />
        </div>
        {/* Phone */}
        <div className="">
          <InfoCard
            url="http://www.w3.org/2000/svg"
            path="M3 5a2 2 0 012-2h2l2 6-2 2a16 16 0 006 6l2-2 6 2v2a2 2 0 01-2 2h-1c-9.941 0-18-8.059-18-18V5z"
            title="Phone"
            subtitle1="+49 151 205 68192"
            subtitle2=""
          />
        </div>
        {/* Location */}
        <div className="">
          <InfoCard
            url="http://www.w3.org/2000/svg"
            path="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
            subPath="M12 22s8-4.5 8-10A8 8 0 004 12c0 5.5 8 10 8 10z"
            title="Our Office Location"
            subtitle1="Akazienallee 68, 34255 Baunatal,"
            subtitle2="Hessen, Germany"
          />
        </div>
      </div>
    </section>
  );
}
