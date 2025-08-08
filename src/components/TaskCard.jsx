import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, CheckSquare, Square, GripVertical } from "lucide-react";
import {
  formatDueDate,
  getDueDateStatus,
  getDueDateColor,
} from "../utils/dateUtils";

export const TaskCard = ({ task, onEdit, onDelete, onToggleSubtask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const dueDateColor = getDueDateColor(dueDateStatus);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`kanban-card ${dueDateStatus || ""} ${
        isDragging ? "dragging" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-2 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      {task.dueDate && (
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${dueDateColor}`}
        >
          <Calendar className="w-3 h-3" />
          <span>{formatDueDate(task.dueDate)}</span>
        </div>
      )}

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-3 space-y-1">
          <div className="text-xs font-medium text-gray-500 mb-1">
            Subtasks ({task.subtasks.filter((st) => st.completed).length}/
            {task.subtasks.length})
          </div>
          {task.subtasks.slice(0, 2).map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSubtask(task.id, subtask.id);
                }}
                className="cursor-pointer hover:opacity-80"
              >
                {subtask.completed ? (
                  <CheckSquare className="w-3 h-3 text-green-600" />
                ) : (
                  <Square className="w-3 h-3 text-gray-400" />
                )}
              </button>
              <span
                className={
                  subtask.completed ? "line-through text-gray-400" : ""
                }
              >
                {subtask.title}
              </span>
            </div>
          ))}
          {task.subtasks.length > 2 && (
            <div className="text-xs text-gray-400">
              +{task.subtasks.length - 2} more
            </div>
          )}
        </div>
      )}
    </div>
  );
};
