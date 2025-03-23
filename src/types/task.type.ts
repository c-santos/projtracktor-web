import { TaskPriority } from "../ui/components/PriorityChip";

export type TaskModel = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    completed: boolean;
    priority: TaskPriority;
    projectId?: string;
}
