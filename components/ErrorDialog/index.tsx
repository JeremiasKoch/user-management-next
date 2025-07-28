'use client';

import { useErrorStore } from '@/store';
import { useEffect, useRef } from 'react';
import { Button } from '@/components';

export const ErrorDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const error = useErrorStore((state) => state.error);
  const clearError = useErrorStore((state) => state.clearError);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (error && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [error, clearError]);

  if (!error) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={clearError}
      className="backdrop:bg-blue-950/80 rounded-lg p-6 w-[300px] flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
 gap-4"
    >
      <header>{error.title}</header>
      <p>{error.message}</p>
      <footer>
        <form method="dialog">
          <Button variant="danger" onClick={clearError} autoFocus>
            Ok
          </Button>
        </form>
      </footer>
    </dialog>
  );
};

export default ErrorDialog;
