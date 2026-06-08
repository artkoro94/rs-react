import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { COUNTRIES } from '../../constants/countries';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../schemas/form-schema';
import { useFormStore } from '../../store/form-store';
import type { FormData } from '../../types/form-data';
import { createSubmissionMeta } from '../../utils/create-submission-meta';
import { PasswordStrength } from './password-strength';
import { useState } from 'react';
import { fileToBase64 } from '../../utils/file-to-base64';
import { validateImage } from '../../utils/image-validation';
import { useWatch } from 'react-hook-form';

type FormValues = z.input<typeof formSchema>;

interface ReactHookFormProps {
  onSuccess: () => void;
}

export const ReactHookForm = ({
  onSuccess,
}: ReactHookFormProps) => {
  const [imagePreview, setImagePreview] =
  useState('');
const {
  register,
  handleSubmit,
  control,
  reset,
  formState: { errors, isValid },
} = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  mode: 'onChange',
});

const addSubmission = useFormStore(
  (state) => state.addSubmission
);

const handleImageChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  const isValid = validateImage(file);

  if (!isValid) {
    return;
  }

  const base64 = await fileToBase64(file);

  setImagePreview(base64);
};

const onSubmit = (data: FormValues) => {

  const { id, createdAt } = createSubmissionMeta();

const submission: FormData = {
  id,
  createdAt,

  name: data.name,
    age: Number(data.age),
    email: data.email,
    gender: data.gender,
    country: data.country,
    password: data.password,

    image: imagePreview,
    termsAccepted: data.termsAccepted,
  };

  addSubmission(submission);

  reset();
setImagePreview('');

  onSuccess();
};

const password = useWatch({
  control,
  name: 'password',
  defaultValue: '',
});

  return (
<form onSubmit={handleSubmit(onSubmit)}>
  <div>
    <label htmlFor="name">Name</label>

    <input
      id="name"
      {...register('name')}
    />

    {errors.name && (
      <p>{String(errors.name.message)}</p>
    )}
  </div>

  <div>
  <label htmlFor="age">Age</label>

  <input
    id="age"
    type="number"
    {...register('age')}
  />

  {errors.age && (
  <p>{String(errors.age.message)}</p>
)}
</div>

<div>
  <label htmlFor="email">Email</label>

  <input
    id="email"
    type="email"
    {...register('email')}
  />

  {errors.email && (
  <p>{String(errors.email.message)}</p>
)}
</div>

<div>
  <label htmlFor="gender">Gender</label>

  <select
    id="gender"
    {...register('gender')}
  >
    <option value="">
      Select gender
    </option>

    <option value="male">
      Male
    </option>

    <option value="female">
      Female
    </option>
  </select>

  {errors.gender && (
  <p>{String(errors.gender.message)}</p>
)}
</div>

<div>
  <label htmlFor="country">Country</label>

  <input
    id="country"
    list="countries"
    {...register('country')}
  />

  <datalist id="countries">
    {COUNTRIES.map((country) => (
      <option
        key={country}
        value={country}
      />
    ))}
  </datalist>

  {errors.country && (
    <p>{String(errors.country.message)}</p>
  )}
</div>

<div>
  <label htmlFor="password">
    Password
  </label>

  <input
    id="password"
    type="password"
    {...register('password')}
  />

<PasswordStrength password={password} />
  {errors.password && (
  <p>{String(errors.password.message)}</p>
)}
</div>

<div>
  <label htmlFor="confirmPassword">
    Confirm Password
  </label>

  <input
    id="confirmPassword"
    type="password"
    {...register('confirmPassword')}
  />

  {errors.confirmPassword && (
    <p>
      {String(errors.confirmPassword.message)}
    </p>
  )}
</div>

<div>
  <label htmlFor="image">
    Image
  </label>

  <input
    id="image"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />

  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      width={150}
    />
  )}
</div>

<div>
  <label>
    <input
      type="checkbox"
      {...register('termsAccepted')}
    />
    Accept Terms
  </label>

  {errors.termsAccepted && (
  <p>{String(errors.termsAccepted.message)}</p>
)}
</div>

<button
  type="submit"
  disabled={!isValid}
>
  Submit
</button>
</form>
  );
};