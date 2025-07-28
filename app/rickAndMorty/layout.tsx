import { PropsWithChildren } from 'react';
import { RickAndMortyShell } from '@/components';

const RickAndMortyLayout = ({ children }: PropsWithChildren) => {
  return <RickAndMortyShell>{children}</RickAndMortyShell>;
};

export default RickAndMortyLayout;
