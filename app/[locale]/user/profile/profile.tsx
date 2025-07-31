import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import PictureLight from '@/public/images/avatar.jpg';
import PictureDark from '@/public/images/avatarDark.png';
import { Button } from '@/components/ui/button';

type Props = {
  user?: User;
};

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <div className="wrapper">
      <h1 className="mb-20 text-center text-2xl font-bold">My Profile</h1>
      <div className="">
        <div className="w-full flex flex-col md:flex-row gap-5 rounded-2xl  dark:bg-slate-800 bg-orange-200">
          <div className="flex-1 p-5 rounded-tl-2xl rounded-bl-[0px] md:rounded-bl-2xl rounded-tr-2xl md:rounded-tr-[0px] dark:bg-slate-700 bg-orange-300">
            <div className="mt-[-60px] md:mt-[-70px] justify-items-center mb-3 md:mb-5">
              <div className="dark:bg-slate-700 bg-orange-300 p-3 rounded-full justify-items-center">
                <Image
                  src={PictureLight}
                  alt="user Image"
                  className="w-15 h-15 md:w-30 md:h-30 rounded-full block dark:hidden"
                />
                <Image
                  src={PictureDark}
                  alt="user Image"
                  className="w-15 h-15 md:w-30 md:h-30 rounded-full hidden dark:block"
                />
              </div>
            </div>
            <div className="text-center mb-5">
              <div className="text-lg lg:text-2xl font-bold mb-1 lg:mb-4 text-slate-950 dark:text-slate-300">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-sm text-orange-900 dark:text-slate-500">
                {user?.email}
              </div>
              <div className="text-sm text-slate-800 dark:text-slate-400">
                Username:{' '}
                <strong className="text-md font-bold">{user?.userName}</strong>
              </div>
            </div>
          </div>
          <div className="flex-1 px-5 py-7 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 dark:text-slate-400 text-slate-800">
              <div className="flex flex-col text-center">
                <span className="">Books</span>
                <span className="font-semibold text-4xl md:text-5xl">0</span>
              </div>
              <div className="flex flex-col text-center">
                <span className="">Groups</span>
                <span className="font-semibold text-4xl md:text-5xl">0</span>
              </div>
              <div className="flex flex-col text-center">
                <span className="">Words</span>
                <span className="font-semibold text-4xl md:text-5xl">0</span>
              </div>
              <div className="flex flex-col text-center">
                <span className="">Favorite</span>
                <span className="font-semibold text-4xl md:text-5xl">0</span>
              </div>
              <div className="flex flex-col text-center">
                <span className="">Known</span>
                <span className="font-semibold text-4xl md:text-5xl">0</span>
              </div>
            </div>
            <div className="">
              <hr className="w-full border-0.5 border-orange-800 dark:border-slate-400 my-10" />
            </div>
            <div className="grid grid-cols-1 lg:flex gap-1 lg:justify-between">
              <div className="text-slate-800 dark:text-slate-400">
                <span>Most used book:</span>{' '}
                <strong className="">Book name</strong>
              </div>
              <div className="text-slate-800 dark:text-slate-400">
                <span>Most used group:</span>{' '}
                <strong className="">Group name</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button className="text-sm lg:text-lg px-10 lg:px-20 py-3 lg:py-5 text-slate-200 rounded-full bg-orange-900 hover:bg-orange-800 dark:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
