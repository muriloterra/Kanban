import type { Task, Priority, ColumnId } from "../types";
import "./KanbanCard.css";

interface KanbanCardProps {
  task: Task;
  columnId: ColumnId;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMouseDown: (
    e: React.MouseEvent,
    taskId: string,
    columnId: ColumnId,
  ) => void;
}

const priorityConfig: Record<Priority, { label: string; class: string }> = {
  low: { label: "Baixa", class: "priority-low" },
  medium: { label: "Média", class: "priority-medium" },
  high: { label: "Alta", class: "priority-high" },
};

export function KanbanCard({
  task,
  columnId,
  onEdit,
  onDelete,
  onMouseDown,
}: KanbanCardProps) {
  const priority = priorityConfig[task.priority];

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start drag with left mouse button and not on action buttons
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest(".action-btn")) return;

    onMouseDown(e, task.id, columnId);
  };

  return (
    <div className="kanban-card" onMouseDown={handleMouseDown}>
      <div className="card-header">
        <span className={`priority-badge ${priority.class}`}>
          {priority.label}
        </span>
        <div className="card-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(task)}
            title="Editar tarefa"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(task.id)}
            title="Excluir tarefa"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H5H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="card-title">{task.title}</h3>

      {task.description && (
        <p className="card-description">{task.description}</p>
      )}

      {task.tags.length > 0 && (
        <div className="card-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="card-footer">
        <span className="card-date">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 2V6M8 2V6M3 10H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      </div>

      <div className="card-glow"></div>
    </div>
  );
}
