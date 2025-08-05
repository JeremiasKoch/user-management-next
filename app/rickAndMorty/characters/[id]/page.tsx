import { fetchCharacter, fetchCharacters } from '@/api';
import { notFound } from 'next/navigation';
import CharacterImage from '../components/CharacterImage';

type CharacterPageProps = {
  params: Promise<{ id: string }>;
};

export const generateStaticParams = async () => {
  const allResults = [];
  for (let i = 1; i <= 5; i++) {
    const data = await fetchCharacters(i);
    allResults.push(...data.results);
  }
  return allResults.map((char) => ({ id: char.id.toString() }));
};

export default async function CharacterPage({ params }: CharacterPageProps) {
  let character;
  const { id } = await params;

  try {
    character = await fetchCharacter(id);
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="mx-auto my-8 max-w-xl p-6 bg-white rounded-lg shadow-md">
      <CharacterImage
        alt={`Character Image - ${character.name}`}
        src={character.image}
      />
      <h1 className="text-3xl font-bold text-center mb-4">{character.name}</h1>
      <hr className="my-4" />
      <div className="space-y-2 text-lg">
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Last known location: {character.location.name}</p>
      </div>
    </div>
  );
}
