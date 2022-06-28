export const validateName = (name: string) => {
  const pattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return pattern.test(name);
};
