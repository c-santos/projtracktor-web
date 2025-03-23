export type TaskModel = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    completed: boolean;
    priority?: string | null;
    projectId?: string;
}
