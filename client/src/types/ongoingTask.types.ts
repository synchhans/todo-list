export interface OngoingTasksProps {
  tasks: any[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, currentTitle: string) => void;
}
