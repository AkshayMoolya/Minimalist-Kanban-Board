import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { ColumnColors } from "../types";

export const KanbanColumn = ({
  title,
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleSubtask,
  columnColor,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
    data: { type: "column", title },
  });

  return (
    <div className="flex-1 min-w-0">
      <div
        className={`${ColumnColors[title]} kanban-column ${
          isOver ? "ring-2 ring-blue-400" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-800">{title}</h2>
          <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>

        <div ref={setNodeRef} className="space-y-3 min-h-[400px]">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onToggleSubtask={onToggleSubtask}
              />
            ))}
            {tasks.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                Drop tasks here
              </div>
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};
