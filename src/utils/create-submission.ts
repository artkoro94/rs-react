import type { FormData } from '../types/form-data';
import { createSubmissionMeta } from './create-submission-meta';

interface CreateSubmissionParams {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  image: string;
  termsAccepted: boolean;
}

export const createSubmission = (
  data: CreateSubmissionParams
): FormData => {
  const { id, createdAt } = createSubmissionMeta();

  return {
    id,
    createdAt,
    ...data,
  };
};