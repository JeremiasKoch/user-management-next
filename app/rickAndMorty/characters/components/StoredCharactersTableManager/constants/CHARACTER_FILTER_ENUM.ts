import { Gender, Status } from '@/api';

export const FILTERABLE_FIELDS_SET = new Set(['status', 'gender']);

export const CHARACTER_FILTER_ENUM: Record<string, string[]> = {
  status: Object.values(Status),
  gender: Object.values(Gender),
};
