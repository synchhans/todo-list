export interface AddTaskFormProps {
  onSubmit: (title: string) => void;
  onCancel?: () => void;
  initialTitle?: string;
}
