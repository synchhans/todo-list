export interface TaskItemProps {
  title: string;
  createdAt: string;
  onToggleComplete: () => void;
  onDelete: () => void;
  isCompleted: boolean;
  onEdit: () => void;
}