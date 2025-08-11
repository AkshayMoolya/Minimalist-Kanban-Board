import React from "react";
import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
          Kanban Board
        </h1>
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;
