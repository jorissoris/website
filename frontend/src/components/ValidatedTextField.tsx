import { TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface ValidatedTextFieldProps {
  label: string;
  validator: (value: string) => string | false;
  onChange: (isValid: boolean) => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function ValidatedTextField({
  label,
  validator,
  onChange,
  value,
  setValue
}: ValidatedTextFieldProps) {
  const [error, setError] = useState<string | false>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    const errorMessage = validator(newValue);
    setError(errorMessage);
    onChange(!errorMessage);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error || ''}
      fullWidth
    />
  );
}
