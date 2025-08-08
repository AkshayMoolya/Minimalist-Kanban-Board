export const ColumnType = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  DONE: "Done",
};

export const ColumnColors = {
  [ColumnType.NOT_STARTED]: "bg-gray-100 border-gray-300",
  [ColumnType.IN_PROGRESS]: "bg-blue-100 border-blue-300",
  [ColumnType.BLOCKED]: "bg-red-100 border-red-300",
  [ColumnType.DONE]: "bg-green-100 border-green-300",
};

export const createTask = (
  id,
  title,
  description = "",
  dueDate = null,
  subtasks = []
) => ({
  id,
  title,
  description,
  dueDate,
  subtasks,
  createdAt: new Date(),
});

export const createSubtask = (id, title, completed = false) => ({
  id,
  title,
  completed,
});
