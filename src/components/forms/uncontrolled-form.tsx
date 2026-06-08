import { useState } from 'react';
import { COUNTRIES } from '../../constants/countries';
import { PasswordStrength } from './password-strength';
import { fileToBase64 } from '../../utils/file-to-base64';
import { validateImage } from '../../utils/image-validation';
import { useFormStore } from '../../store/form-store';
import type { FormData } from '../../types/form-data';
import { formSchema } from '../../schemas/form-schema';

export const UncontrolledForm = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<
  Record<string, string>
>({});

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

  return (
<form
  onSubmit={(event) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const validationResult = formSchema.safeParse({
  name: String(formData.get('name')),
  age: Number(formData.get('age')),
  email: String(formData.get('email')),
  gender: String(formData.get('gender')),
  country: String(formData.get('country')),
  password: String(formData.get('password')),
  image: imagePreview,
  termsAccepted: Boolean(
    formData.get('termsAccepted')
  ),
});

if (!validationResult.success) {
  const fieldErrors: Record<string, string> = {};

  validationResult.error.issues.forEach(
    (issue) => {
      const field = issue.path[0];

      if (typeof field === 'string') {
        fieldErrors[field] = issue.message;
      }
    }
  );

  setErrors(fieldErrors);

  return;
}

    const submission: FormData = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),

      name: String(formData.get('name')),
      age: Number(formData.get('age')),
      email: String(formData.get('email')),
      gender: String(formData.get('gender')),
      country: String(formData.get('country')),
      password: String(formData.get('password')),
      image: imagePreview,
      termsAccepted: Boolean(
        formData.get('termsAccepted')
      ),
    };

    setErrors({});

    addSubmission(submission);
  }}
>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />

        {errors.name && (
  <p>{errors.name}</p>
)}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
        />

        {errors.age && (
  <p>{errors.age}</p>
)}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
        />

        {errors.email && (
  <p>{errors.email}</p>
)}
      </div>

      <div>
        <label htmlFor="gender">Gender</label>

        <select
          id="gender"
          name="gender"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {errors.gender && (
  <p>{errors.gender}</p>
)}
      </div>

      <div>
        <label htmlFor="country">Country</label>

<select
  id="country"
  name="country"
>
  <option value="">Select country</option>

  {COUNTRIES.map((country) => (
    <option
      key={country}
      value={country}
    >
      {country}
    </option>
  ))}
</select>

{errors.country && (
  <p>{errors.country}</p>
)}
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <PasswordStrength password={password} />

        {errors.password && (
  <p>{errors.password}</p>
)}
      </div>

      <div>
        <label htmlFor="confirmPassword">
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
        />
      </div>

      <div>
        <label htmlFor="image">Image</label>

        <input
          id="image"
          name="image"
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
            name="termsAccepted"
          />
          Accept Terms
        </label>

        {errors.termsAccepted && (
  <p>{errors.termsAccepted}</p>
)}
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  );
};