export {};

declare global {
  interface Window {
    report: any; // Substitua 'any' pelo tipo do relatório se souber o tipo correto
  }
}
