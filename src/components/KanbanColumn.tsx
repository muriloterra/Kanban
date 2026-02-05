import type { Task, ColumnId } from "../types";
import { KanbanCard } from "./KanbanCard";
import "./KanbanColumn.css";

interface KanbanColumnProps {
  id: ColumnId;
  title: string;
  color: string;
  tasks: Task[];
  isHovered?: boolean;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMouseDown: (
    e: React.MouseEvent,
    taskId: string,
    columnId: ColumnId,
  ) => void;
}

const columnIcons: Record<ColumnId, React.ReactNode> = {
  todo: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
  inProgress: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7V12L15 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  done: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function KanbanColumn({
  id,
  title,
  color,
  tasks,
  isHovered = false,
  onEditTask,
  onDeleteTask,
  onMouseDown,
}: KanbanColumnProps) {
  return (
    <div
      className={`kanban-column ${isHovered ? "drag-over" : ""}`}
      style={{ "--column-color": color } as React.CSSProperties}
      data-column-id={id}
    >
      <div className="column-header">
        <div className="column-title-wrapper">
          <span className="column-icon">{columnIcons[id]}</span>
          <h2 className="column-title">{title}</h2>
        </div>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="column-content">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M12 8V16M8 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p>Solte as tarefas aqui</p>
          </div>
        ) : (
          <div className="cards-container">
            {tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                columnId={id}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onMouseDown={onMouseDown}
              />
            ))}
          </div>
        )}
      </div>

      <div className="column-glow"></div>
    </div>
  );
}
