import { parse, formatISO, parseISO, format } from 'date-fns'
import es from 'date-fns/locale/es'

export function convertToISO(strDate) {
  const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
  return formatISO(newDate)
}

export function displayDate(date) {
  const newDate = parseISO(date)
  let formatedDate = format(newDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })

  // Ajuste para capitalizar solo la primera letra del día y del mes, dejando "de" en minúsculas
  return formatedDate.replace(/\b\w+/g, (word, index) => {
    if (word.toLowerCase() === "de") return word.toLowerCase()
    return index === 0 || formatedDate[index - 1] === ' ' ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word
  })
}

export function convertToDDMMYYYY(isoDate) {
  const newDate = new Date(isoDate)
  const formatedDate = format(newDate, 'dd/MM/yyyy')
  return formatedDate
}