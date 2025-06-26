import React from 'react';

const UpdateGroup = async (props: {
  params: Promise<{
    id: string;
    groupId: string;
  }>;
}) => {
  const { id, groupId } = await props.params;
  return (
    <div>
      <div className="">BookID: {id}</div>
      <div className="">group Id {groupId}</div>
    </div>
  );
};

export default UpdateGroup;
