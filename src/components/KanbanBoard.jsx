import React, { useState, useEffect } from "react";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import { ColumnType } from "../types";
import { loadTasks, saveTasks } from "../utils/storage";

export const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    [ColumnType.NOT_STARTED]: [],
    [ColumnType.IN_PROGRESS]: [],
    [ColumnType.BLOCKED]: [],
    [ColumnType.DONE]: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingColumn, setEditingColumn] = useState("");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const savedTasks = loadTasks();
    if (savedTasks) {
      setColumns(savedTasks);
    } else {
      // Initialize with sample data
      const sampleTasks = {
        [ColumnType.NOT_STARTED]: [
          {
            id: "1",
            title: "Design new landing page",
            description: "Create mockups for the new marketing landing page",
            dueDate: new Date(
              Date.now() + 3 * 24 * 60 * 60 * 1000
            ).toISOString(),
            subtasks: [
              { id: "s1", title: "Research competitors", completed: true },
              { id: "s2", title: "Create wireframes", completed: false },
              { id: "s3", title: "Design mockups", completed: false },
            ],
            createdAt: new Date(),
          },
          {
            id: "2",
            title: "Update documentation",
            description: "Update API documentation with new endpoints",
            dueDate: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
            subtasks: [],
            createdAt: new Date(),
          },
        ],
        [ColumnType.IN_PROGRESS]: [
          {
            id: "3",
            title: "Implement user authentication",
            description: "Add JWT-based authentication system",
            dueDate: new Date(
              Date.now() + 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            subtasks: [
              { id: "s4", title: "Setup auth middleware", completed: true },
              { id: "s5", title: "Create login endpoint", completed: true },
              { id: "s6", title: "Add password reset", completed: false },
            ],
            createdAt: new Date(),
          },
        ],
        [ColumnType.BLOCKED]: [
          {
            id: "4",
            title: "Taxes",
            description: "Complete annual tax filing",
            dueDate: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            subtasks: [
              { id: "s7", title: "Gather receipts", completed: true },
              { id: "s8", title: "Fill out forms", completed: false },
              { id: "s9", title: "Submit to accountant", completed: false },
            ],
            createdAt: new Date(),
          },
        ],
        [ColumnType.DONE]: [
          {
            id: "5",
            title: "Setup CI/CD pipeline",
            description: "Configure GitHub Actions for automated testing",
            subtasks: [
              { id: "s10", title: "Write test scripts", completed: true },
              { id: "s11", title: "Configure workflow", completed: true },
            ],
            createdAt: new Date(),
          },
        ],
      };
      setColumns(sampleTasks);
    }
  }, []);

  useEffect(() => {
    saveTasks(columns);
  }, [columns]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeColumn = findColumn(activeId);
    let overColumn = overId;

    // Check if overId is a column ID
    if (!Object.values(ColumnType).includes(overId)) {
      overColumn = findColumn(overId);
    }

    if (!activeColumn || !overColumn) return;

    if (activeColumn === overColumn) {
      const column = columns[activeColumn];
      const oldIndex = column.findIndex((task) => task.id === activeId);
      const newIndex = column.findIndex((task) => task.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((prev) => ({
          ...prev,
          [activeColumn]: arrayMove(column, oldIndex, newIndex),
        }));
      }
    } else {
      const activeColumnTasks = [...columns[activeColumn]];
      const overColumnTasks = [...columns[overColumn]];

      const activeIndex = activeColumnTasks.findIndex(
        (task) => task.id === activeId
      );
      if (activeIndex === -1) return;

      const [movedTask] = activeColumnTasks.splice(activeIndex, 1);

      const overIndex = overColumnTasks.findIndex((task) => task.id === overId);
      if (overIndex === -1) {
        overColumnTasks.push(movedTask);
      } else {
        overColumnTasks.splice(overIndex, 0, movedTask);
      }

      setColumns((prev) => ({
        ...prev,
        [activeColumn]: activeColumnTasks,
        [overColumn]: overColumnTasks,
      }));
    }
  };

  const findColumn = (taskId) => {
    return Object.values(ColumnType).find((column) =>
      columns[column].some((task) => task.id === taskId)
    );
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      const column = findColumn(editingTask.id);
      if (column) {
        setColumns((prev) => ({
          ...prev,
          [column]: prev[column].map((task) =>
            task.id === editingTask.id ? { ...task, ...taskData } : task
          ),
        }));
      }
    } else {
      const newTask = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setColumns((prev) => ({
        ...prev,
        [editingColumn]: [...prev[editingColumn], newTask],
      }));
    }
    setEditingTask(null);
    setEditingColumn("");
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    const column = findColumn(taskId);
    if (column) {
      setColumns((prev) => ({
        ...prev,
        [column]: prev[column].filter((task) => task.id !== taskId),
      }));
    }
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    const column = findColumn(taskId);
    if (column) {
      setColumns((prev) => ({
        ...prev,
        [column]: prev[column].map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            };
          }
          return task;
        }),
      }));
    }
  };

  const handleAddTask = (column) => {
    setEditingColumn(column);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const activeTask = activeId
    ? Object.values(columns)
        .flat()
        .find((task) => task.id === activeId)
    : null;

  return (
    <>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 justify-start sm:justify-center w-full">
          {Object.keys(ColumnType).map((columnKey) => {
            const columnTitle = ColumnType[columnKey];
            return (
              <div
                key={columnTitle}
                className="flex flex-col w-72 sm:w-80 flex-shrink-0"
              >
                <KanbanColumn
                  title={columnTitle}
                  tasks={columns[columnTitle]}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onToggleSubtask={handleToggleSubtask}
                />
                <button
                  onClick={() => handleAddTask(columnTitle)}
                  className="mt-2 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden xs:inline">Add Task</span>
                  <span className="inline xs:hidden">Add</span>
                </button>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="kanban-card shadow-lg transform scale-105">
              <h3 className="font-semibold text-gray-800">
                {activeTask.title}
              </h3>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
          setEditingColumn("");
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </>
  );
};
