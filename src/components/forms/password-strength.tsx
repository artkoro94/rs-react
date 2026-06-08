import { getPasswordStrength } from '../../utils/password-strength';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({
  password,
}: PasswordStrengthProps) => {
  const strength = getPasswordStrength(password);

  return (
    <ul>
      <li>{strength.hasLowercase ? 'Good' : 'Bad'} Lowercase</li>
      <li>{strength.hasUppercase ? 'Good' : 'Bad'} Uppercase</li>
      <li>{strength.hasNumber ? 'Good' : 'Bad'} Number</li>
      <li>{strength.hasSpecial ? 'Good' : 'Bad'} Special character</li>
    </ul>
  );
};