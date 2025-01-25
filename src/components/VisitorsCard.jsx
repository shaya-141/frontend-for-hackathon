import React from 'react';

function VisitorCard({ numbers, name }) {
  return (
    <div className="w-[300px] h-[250px] flex flex-col items-center justify-center  rounded-lg  p-5">
      <h1 className="text-[48px] font-bold text-blue-500">{numbers}</h1>
      <h2 className="text-[20px] font-semibold text-gray-700">{name}</h2>
    </div>
  );
}

export default VisitorCard;
