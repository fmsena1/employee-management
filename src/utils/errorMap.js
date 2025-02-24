export const parseError = (errorKey) => {
  console.log(errorKey);
  const errorMap = {
    'Employee with this CPF already exists': 'cpfAlreadyExists',
  };

  return errorMap[errorKey] || 'genericError';
};
