export const dateToIso = (date: Date) => {
  return new Date(date).toISOString()
} 

export const dateToString = (date: Date) => {
  return new Date(date).toISOString().substring(0, 10)
}