import { useForm } from 'react-hook-form';
import { COUNTRIES } from '../../constants/countries';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../schemas/form-schema';

export const ReactHookForm = () => {
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(formSchema),
});

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

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

  <select
    id="country"
    {...register('country')}
  >
    <option value="">
      Select country
    </option>

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

  {errors.password && (
  <p>{String(errors.password.message)}</p>
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

  <button type="submit">
    Submit
  </button>
</form>
  );
};