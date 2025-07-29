export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Genderless = 'Genderless',
  Unknown = 'unknown',
}

export const FILTERABLE_FIELDS_SET = new Set(['status', 'gender']);

export const CHARACTER_FILTER_ENUM: Record<string, string[]> = {
  status: ['Alive', 'Dead', 'unknown'],
  gender: ['Male', 'Female', 'Genderless', 'unknown'],
};
