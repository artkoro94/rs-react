import { create } from 'zustand';
import { COUNTRIES } from '../constants/countries';
import type { FormData } from '../types/form-data';

interface FormStore {
  submissions: FormData[];
  countries: string[];
  addSubmission: (submission: FormData) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  countries: COUNTRIES,
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [submission, ...state.submissions],
    })),
}));