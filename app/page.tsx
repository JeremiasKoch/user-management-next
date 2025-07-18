import { AddUser, ErrorDialog, UserList } from '@/components';

export default function Home() {
  return (
    <>
      <ErrorDialog />
      <div className="min-h-screen  flex flex-col flex-grow items-center justify-center">
        <div className="w-fit">
          <AddUser />
          <UserList />
        </div>
      </div>
    </>
  );
}
