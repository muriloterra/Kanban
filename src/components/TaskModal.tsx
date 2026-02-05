import { useState, useEffect } from "react";
import type { Task, Priority } from "../types";
import "./TaskModal.css";

interface TaskModalProps {
  isOpen: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Omit<Task, "id" | "createdAt"> & { id?: string }) => void;
}

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Baixa", color: "#6bcb77" },
  { value: "medium", label: "Média", color: "#ffd93d" },
  { value: "high", label: "Alta", color: "#ef4444" },
];

const tagSuggestions = [
  "Frontend",
  "Backend",
  "Design",
  "Bug",
  "Feature",
  "Urgent",
  "Review",
];

export function TaskModal({ isOpen, task, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority);
      setTags(task.tags);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setTags([]);
    }
    setTagInput("");
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: task?.id,
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      tags,
    });

    onClose();
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(tagInput.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? "Editar Tarefa" : "Nova Tarefa"}</h2>
          <button className="close-btn" onClick={onClose}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título..."
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição (opcional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione detalhes..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Prioridade</label>
            <div className="priority-options">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`priority-option ${priority === option.value ? "active" : ""}`}
                  style={
                    { "--priority-color": option.color } as React.CSSProperties
                  }
                  onClick={() => setPriority(option.value)}
                >
                  <span className="priority-indicator"></span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="tags-input-container">
              <div className="selected-tags">
                {tags.map((tag) => (
                  <span key={tag} className="selected-tag">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Adicionar tag..."
              />
            </div>
            <div className="tag-suggestions">
              {tagSuggestions
                .filter((t) => !tags.includes(t))
                .map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="tag-suggestion"
                    onClick={() => handleAddTag(tag)}
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {task ? "Salvar" : "Criar Tarefa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
