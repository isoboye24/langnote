import { User } from '@prisma/client';
import React from 'react';

type Props = {
  user?: User;
};

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <div className="wrapper ">
      <h1 className="mb-10 md:mb-20 text-center text-2xl font-bold">
        My Profile
      </h1>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="">
          <span>Username: </span>
          <span className="font-semibold"> {user?.userName}</span>
        </div>
        <hr className="block md:hidden border-orange-800 ml-[-15px] mt-2 mb-5" />
        <div className="">
          <span>Name: </span>
          <span className="font-semibold"> {user?.firstName}</span>
        </div>
        <hr className="block md:hidden border-orange-800 ml-[-15px] mt-2 mb-5" />
        <div className="">
          <span>Surname: </span>
          <span className="font-semibold"> {user?.lastName}</span>
        </div>
        <hr className="block md:hidden border-orange-800 ml-[-15px] mt-2 mb-5" />
        <div className="">
          <span>Email: </span>
          <span className="font-semibold"> {user?.email}</span>
        </div>
        <hr className="block md:hidden border-orange-800 ml-[-15px] mt-2 mb-5" />
      </div>
    </div>
  );
};

export default Profile;
