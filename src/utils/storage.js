const STORAGE_KEY = 'kanban-board-tasks'

export const loadTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Convert string dates back to Date objects
      Object.keys(parsed).forEach(column => {
        parsed[column] = parsed[column].map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : null
        }))
      })
      return parsed
    }
  } catch (error) {
    console.error('Error loading tasks from storage:', error)
  }
  return null
}

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Error saving tasks to storage:', error)
  }
}