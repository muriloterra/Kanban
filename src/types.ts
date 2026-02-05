export type Priority = "low" | "medium" | "high";

export type ColumnId = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  tags: string[];
  createdAt: Date;
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
  tasks: Task[];
}

export interface BoardState {
  columns: Column[];
}
