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
      <li>{strength.hasLowercase ? '✓' : '✗'} Lowercase</li>
      <li>{strength.hasUppercase ? '✓' : '✗'} Uppercase</li>
      <li>{strength.hasNumber ? '✓' : '✗'} Number</li>
      <li>{strength.hasSpecial ? '✓' : '✗'} Special character</li>
    </ul>
  );
};