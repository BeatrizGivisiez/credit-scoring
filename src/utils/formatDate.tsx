export function formatDate(isoDate: string): string {
  if (!isoDate) return "Data Indisponível"; // Se a data for nula ou indefinida

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return "Data Indisponível"; // Verifica se a data é válida
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses vão de 0 a 11
  const year = date.getFullYear();

  return `${year}-${month}-${day}`; // Formato YYYY-MM-AA
}
