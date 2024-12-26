export function formatDateTime(isoDate: string): string {
  if (!isoDate) return "Data Indisponível"; // Se a data for nula ou indefinida

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return "Data Indisponível"; // Verifica se a data é válida
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses vão de 0 a 11
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`; // Formato YYYY-MM-DD HH:MM
}
