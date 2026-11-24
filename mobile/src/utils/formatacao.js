export function formatarNota(nota) {
  if (nota === null || nota === undefined || nota === 0) {
    return "Sem nota"
  }
  // Formata com uma casa decimal e troca ponto por vírgula se necessário, adicionando a estrela
  return `★ ${Number(nota).toFixed(1).replace('.', ',')}`
}