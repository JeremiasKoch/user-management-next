interface validationFormProps {
  userName: string;
  age: string;
}

interface ValidationError {
  title: string;
  message: string;
}

type ValidationFormResult =
  | { valid: false; error: ValidationError }
  | { valid: true; data: { userName: string; age: number } };

export const validationForm = ({
  userName,
  age,
}: validationFormProps): ValidationFormResult => {
  const parsedAge = Number(age);

  if (!userName && !age) {
    return {
      valid: false,
      error: { title: 'Error', message: 'Complete the form' },
    };
  }
  if (!userName || !age) {
    return {
      valid: false,
      error: {
        title: 'Error Empty Fields',
        message: 'None of the fields can be empty',
      },
    };
  }

  if (isNaN(parsedAge) || parsedAge < 0) {
    return {
      valid: false,
      error: { title: 'Error Age', message: 'Age must be greater than zero' },
    };
  }

  return { valid: true, data: { userName, age: parsedAge } };
};

export default validationForm;
