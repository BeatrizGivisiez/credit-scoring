export const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA"); // Formato YYYY/MM/DD
};
