export function formatarNota(nota) {
  if (nota === null || nota === undefined || nota === 0) {
    return "Sem nota"
  }
  return `★ ${Number(nota).toFixed(1).replace('.', ',')}`
}

export function formatarDuracao(minutos) {
  if (!minutos || minutos <= 0) return null
  const horas = Math.floor(minutos / 60)
  const minsRestantes = minutos % 60

  if (horas === 0) return `${minsRestantes}min`
  if (minsRestantes === 0) return `${horas}h`
  return `${horas}h ${minsRestantes}min`
}