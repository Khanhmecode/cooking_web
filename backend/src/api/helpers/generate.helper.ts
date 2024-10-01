export const generateToken = (): string => {
  const rand = (): string => {
    return Math.random().toString(36).substr(2); // remove `0.`
  };

  return rand() + rand(); // to make it longer
};