import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import type { Task, Column, ColumnId } from "../types";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import "./KanbanBoard.css";

// Initial sample data - Simulating a real development sprint
const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "#00d9ff",
    tasks: [
      {
        id: "1",
        title: "Implementar autenticação com Google",
        description:
          "Adicionar login social usando OAuth 2.0 do Google para facilitar o cadastro de usuários",
        priority: "high",
        tags: ["Backend", "Auth"],
        createdAt: new Date("2024-02-01"),
      },
      {
        id: "2",
        title: "Criar página de perfil do usuário",
        description:
          "Desenvolver interface para edição de dados pessoais, foto e preferências",
        priority: "medium",
        tags: ["Frontend", "UI"],
        createdAt: new Date("2024-02-02"),
      },
    ],
  },
  {
    id: "inProgress",
    title: "Doing",
    color: "#ffd93d",
    tasks: [
      {
        id: "3",
        title: "Refatorar componente de Dashboard",
        description:
          "Melhorar performance com React.memo e lazy loading dos gráficos",
        priority: "high",
        tags: ["Frontend", "Performance"],
        createdAt: new Date("2024-01-28"),
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#6bcb77",
    tasks: [
      {
        id: "4",
        title: "Deploy automático com GitHub Actions",
        description: "CI/CD configurado para deploy automático no Vercel",
        priority: "high",
        tags: ["DevOps"],
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "5",
        title: "Criar sistema de notificações",
        description: "Notificações em tempo real usando WebSocket",
        priority: "medium",
        tags: ["Backend", "Feature"],
        createdAt: new Date("2024-01-22"),
      },
      {
        id: "6",
        title: "Implementar dark mode",
        description: "Tema escuro com toggle e persistência no localStorage",
        priority: "low",
        tags: ["Frontend", "UI"],
        createdAt: new Date("2024-01-25"),
      },
    ],
  },
];

export interface KanbanBoardRef {
  openModal: () => void;
}

interface KanbanBoardProps {
  searchQuery: string;
}

interface DragState {
  taskId: string;
  sourceColumnId: ColumnId;
  element: HTMLElement | null;
  offsetX: number;
  offsetY: number;
}

export const KanbanBoard = forwardRef<KanbanBoardRef, KanbanBoardProps>(
  function KanbanBoard({ searchQuery }, ref) {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [hoveredColumnId, setHoveredColumnId] = useState<ColumnId | null>(
      null,
    );
    const dragCloneRef = useRef<HTMLDivElement | null>(null);

    // Filter tasks based on search query
    const filteredColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }),
    }));

    useImperativeHandle(ref, () => ({
      openModal: () => {
        setEditingTask(null);
        setIsModalOpen(true);
      },
    }));

    // Custom mouse drag handlers
    const handleMouseDown = (
      e: React.MouseEvent,
      taskId: string,
      sourceColumnId: ColumnId,
    ) => {
      e.preventDefault();
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();

      // Create floating clone
      const clone = card.cloneNode(true) as HTMLDivElement;
      clone.style.position = "fixed";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.zIndex = "10000";
      clone.style.pointerEvents = "none";
      clone.style.opacity = "1";
      clone.style.transform = "rotate(3deg) scale(1.02)";
      clone.style.boxShadow =
        "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(102, 126, 234, 0.4)";
      clone.style.border = "2px solid #667eea";
      clone.style.borderRadius = "12px";
      clone.style.transition = "transform 0.1s ease";
      clone.classList.add("drag-clone");
      document.body.appendChild(clone);
      dragCloneRef.current = clone;

      // Mark original as being dragged
      card.classList.add("dragging");

      setDragState({
        taskId,
        sourceColumnId,
        element: card,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      });
    };

    useEffect(() => {
      if (!dragState) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (dragCloneRef.current) {
          dragCloneRef.current.style.left = `${e.clientX - dragState.offsetX}px`;
          dragCloneRef.current.style.top = `${e.clientY - dragState.offsetY}px`;
        }

        // Detect which column we're over
        const columns = document.querySelectorAll(".kanban-column");
        let foundColumn: ColumnId | null = null;
        columns.forEach((col) => {
          const rect = col.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            foundColumn = col.getAttribute("data-column-id") as ColumnId;
          }
        });
        setHoveredColumnId(foundColumn);
      };

      const handleMouseUp = () => {
        // Remove clone
        if (dragCloneRef.current) {
          document.body.removeChild(dragCloneRef.current);
          dragCloneRef.current = null;
        }

        // Remove dragging class from original
        if (dragState.element) {
          dragState.element.classList.remove("dragging");
        }

        // Move task to hovered column if different
        if (hoveredColumnId && hoveredColumnId !== dragState.sourceColumnId) {
          setColumns((prevColumns) => {
            const newColumns = prevColumns.map((col) => ({
              ...col,
              tasks: [...col.tasks],
            }));

            // Find and remove task from source
            let task: Task | undefined;
            for (const col of newColumns) {
              const taskIndex = col.tasks.findIndex(
                (t) => t.id === dragState.taskId,
              );
              if (taskIndex !== -1) {
                task = col.tasks[taskIndex];
                col.tasks.splice(taskIndex, 1);
                break;
              }
            }

            // Add to target column
            if (task) {
              const targetCol = newColumns.find(
                (col) => col.id === hoveredColumnId,
              );
              if (targetCol) {
                targetCol.tasks.push(task);
              }
            }

            return newColumns;
          });
        }

        setDragState(null);
        setHoveredColumnId(null);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [dragState, hoveredColumnId]);

    const handleEditTask = (task: Task) => {
      setEditingTask(task);
      setIsModalOpen(true);
    };

    const handleDeleteTask = (taskId: string) => {
      setColumns((prevColumns) =>
        prevColumns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
        })),
      );
    };

    const handleSaveTask = (
      taskData: Omit<Task, "id" | "createdAt"> & { id?: string },
    ) => {
      if (taskData.id) {
        setColumns((prevColumns) =>
          prevColumns.map((col) => ({
            ...col,
            tasks: col.tasks.map((t) =>
              t.id === taskData.id ? { ...t, ...taskData } : t,
            ),
          })),
        );
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          tags: taskData.tags,
          createdAt: new Date(),
        };

        setColumns((prevColumns) =>
          prevColumns.map((col) =>
            col.id === "todo"
              ? { ...col, tasks: [newTask, ...col.tasks] }
              : col,
          ),
        );
      }

      setEditingTask(null);
    };

    return (
      <>
        <div className="kanban-board">
          {filteredColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={column.tasks}
              isHovered={hoveredColumnId === column.id}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onMouseDown={handleMouseDown}
            />
          ))}
        </div>

        <TaskModal
          isOpen={isModalOpen}
          task={editingTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      </>
    );
  },
);
