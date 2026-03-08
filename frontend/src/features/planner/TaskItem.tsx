import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Task } from './types';

interface TaskItemProps {
  task: Task;
  onUpdate: (newText: string) => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onUpdate(trimmed);
    }
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  return (
    <div
      className={`
        task-item
        group bg-background rounded-lg border border-border p-3 transition-all duration-300
        ${isDeleting ? 'task-item-deleting' : 'task-item-entering'}
        hover:shadow-sm hover:border-primary/30
      `}
    >
      {isEditing ? (
        <div className="task-edit-mode flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            className="flex-1 px-2 py-1 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
            autoFocus
            aria-label="Edit task"
          />
          <button
            onClick={handleSave}
            className="task-control-btn p-1 rounded hover:bg-accent active:scale-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Save"
          >
            <Check className="w-4 h-4 text-green-600" />
          </button>
          <button
            onClick={handleCancel}
            className="task-control-btn p-1 rounded hover:bg-accent active:scale-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Cancel"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="flex-1 text-sm text-foreground">{task.text}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="task-control-btn p-1 rounded hover:bg-accent active:scale-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Edit task"
            >
              <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={handleDelete}
              className="task-control-btn p-1 rounded hover:bg-destructive/10 active:scale-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
