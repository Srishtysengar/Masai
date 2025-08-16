export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High"
}

export interface Task {
  id: number;
  description: string;
  priority: Priority;
  completed: boolean;
}

export interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
}

export interface TaskFormProps {
  onAddTask: (description: string, priority: Priority) => void;
}
