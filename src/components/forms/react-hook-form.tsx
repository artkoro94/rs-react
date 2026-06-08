import { useForm } from 'react-hook-form';
import { COUNTRIES } from '../../constants/countries';

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
</div>

<div>
  <label htmlFor="email">Email</label>

  <input
    id="email"
    type="email"
    {...register('email')}
  />
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
</div>

<div>
  <label>
    <input
      type="checkbox"
      {...register('termsAccepted')}
    />
    Accept Terms
  </label>
</div>

  <button type="submit">
    Submit
  </button>
</form>
  );
};