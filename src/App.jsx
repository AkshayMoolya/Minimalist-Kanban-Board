import React from "react";
import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Kanban Board
        </h1>
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;
