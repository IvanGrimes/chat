import {isToday, format} from 'date-fns'

export const formatDate = date => {
  const d = new Date(date)

  return format(d, isToday(d) ? 'HH:mm' : 'HH:mm dd/MM/yy')
}
