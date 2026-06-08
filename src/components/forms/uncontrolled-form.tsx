import { useState } from 'react';
export const UncontrolledForm = () => {
  const [imagePreview] = useState('');

  return (
    <form
  onSubmit={(event) => {
    event.preventDefault();
  }}
>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
        />
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
      </div>

      <div>
        <label htmlFor="country">Country</label>

        <select
          id="country"
          name="country"
        >
          <option value="">Select country</option>
        </select>
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
        />
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
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  );
};