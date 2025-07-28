'use client';

export const Error = ({ error }: { error: Error }) => {
  return (
    <div className="text-center text-red-600 mt-10">
      <h1 className="text-2xl font-bold">
        Something went wrong with the characters
      </h1>
      <p className="mt-4">{error.message}</p>
    </div>
  );
};

export default Error;
