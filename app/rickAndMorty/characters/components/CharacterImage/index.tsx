'use client';

import { useState } from 'react';
import Image from 'next/image';

export const CharacterImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-[300px] h-[300px] mx-auto mb-4 rounded-lg overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
};
export default CharacterImage;
