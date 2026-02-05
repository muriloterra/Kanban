import { useRef, useState } from "react";
import { Header } from "./components/Header";
import { KanbanBoard, type KanbanBoardRef } from "./components/KanbanBoard";
import "./index.css";
import "./App.css";

function App() {
  const boardRef = useRef<KanbanBoardRef>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTask = () => {
    boardRef.current?.openModal();
  };

  return (
    <div className="app">
      <Header
        onAddTask={handleAddTask}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="main-content">
        <KanbanBoard ref={boardRef} searchQuery={searchQuery} />
      </main>
    </div>
  );
}

export default App;
