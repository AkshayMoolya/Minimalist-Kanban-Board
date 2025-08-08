import { format, isPast, isToday, addDays, differenceInDays } from 'date-fns'

export const formatDueDate = (date) => {
  if (!date) return null
  return format(new Date(date), 'MMM dd, yyyy')
}

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return null
  
  const now = new Date()
  const due = new Date(dueDate)
  
  if (isPast(due) && !isToday(due)) {
    return 'overdue'
  }
  
  const daysUntilDue = differenceInDays(due, now)
  if (daysUntilDue <= 2) {
    return 'due-soon'
  }
  
  return 'due-later'
}

export const getDueDateColor = (status) => {
  switch (status) {
    case 'overdue':
      return 'text-red-600 bg-red-100'
    case 'due-soon':
      return 'text-yellow-600 bg-yellow-100'
    case 'due-later':
      return 'text-green-600 bg-green-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}