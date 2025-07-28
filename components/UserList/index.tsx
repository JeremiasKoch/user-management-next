'use client';

import { useUserStore } from '@/store';
import { Button } from '@/components';

export const UserList = () => {
  const users = useUserStore((state) => state.users);
  const clearList = useUserStore((state) => state.clearUsers);

  return (
    <div className="bg-white w-full rounded-b-lg flex flex-col q">
      <ul className="flex flex-col gap-1 items-start ">
        {users.map((user, index) => (
          <li
            key={`${user.userName}-${index}`}
            className={`w-full px-2 ${
              index === users.length - 1
                ? undefined
                : 'border-b border-gray-300'
            }`}
          >
            {user.userName} ({user.age} years old)
          </li>
        ))}
      </ul>
      {users.length > 0 && (
        <div className="flex justify-center">
          <Button onClick={clearList} className="m-2  bg-red-300 w-fit">
            Clear list
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserList;
