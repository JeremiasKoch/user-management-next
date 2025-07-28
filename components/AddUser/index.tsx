'use client';

import { useErrorStore, useUserStore } from '@/store';
import { validationForm } from '@/utils';
import { FormEvent } from 'react';
import { Button } from '@/components';

export const AddUser = () => {
  const addUser = useUserStore((state) => state.addUser);
  const setError = useErrorStore((state) => state.setError);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get('userName')?.toString().trim() || '';
    const age = formData.get('age')?.toString().trim() || '';

    const validationResult = validationForm({ userName, age });

    if (!validationResult.valid) {
      setError(validationResult.error);
      return;
    }

    addUser(validationResult.data);
    e.currentTarget.reset();
  };

  return (
    <div className="bg-gray-200 p-4 flex flex-col gap-4 rounded-t-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-2">
          <label htmlFor="userName" className="text-left w-20">
            User Name
          </label>
          <input
            className="border border-gray-400 rounded-sm bg-gray-300"
            type="text"
            name="userName"
            id="userName"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="age" className="text-left w-20">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="border border-gray-400 rounded-sm bg-gray-300"
          />
        </div>
        <div className="gap-4 mt-4 flex justify-end">
          <Button type="reset" variant="secondary">
            Clean
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
